// backend/wsServer.js
const WebSocket = require("ws");
const { spawn } = require("child_process");

function startWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("WebSocket client connected.");

        ws.on("message", (message) => {
            console.log("Received message:", message);

            // 调用 Python 脚本进行情绪分析
            const pyProcess = spawn("python", ["../python/emotionService.py", message.toString()]);

            let result = "";
            pyProcess.stdout.on("data", (data) => {
                result += data.toString();
            });

            pyProcess.on("close", () => {
                try {
                    const sentimentResult = JSON.parse(result);
                    if (sentimentResult.error) {
                        ws.send(JSON.stringify({ error: sentimentResult.error }));
                    } else {
                        const response = {
                            text: message.toString(),
                            sentiment: sentimentResult
                        };
                        ws.send(JSON.stringify(response));
                    }
                } catch (err) {
                    ws.send(JSON.stringify({ error: "Emotion analysis failed: " + err.message }));
                }
            });
        });

        ws.on("close", () => {
            console.log("WebSocket client disconnected.");
        });
    });
}

module.exports = { startWebSocketServer };
