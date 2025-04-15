// backend/server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const analyzeRouter = require("./routes/analyze");
const { startWebSocketServer } = require("./wsServer");

const app = express();
const server = http.createServer(app);

// 允许跨域请求
app.use(cors());
app.use(express.json());

// 注册 REST 接口路由
app.use("/api", analyzeRouter);

// 启动 WebSocket 服务
startWebSocketServer(server);

// 启动服务器（例如端口3000）
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
