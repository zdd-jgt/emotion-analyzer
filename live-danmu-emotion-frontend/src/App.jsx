import React, { useState, useEffect, useRef } from "react";
import DanmuInput from "./components/DanmuInput";
import DanmuList from "./components/DanmuList";
import "./styles/App.css";

function App() {
    const [messages, setMessages] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        // 建立 WebSocket 连接到后端（根据实际地址调整）
        ws.current = new WebSocket("ws://localhost:3001");

        ws.current.onopen = () => {
            console.log("WebSocket 已连接");
        };

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prev) => [data, ...prev]);  // 最新消息放在最前面
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket 错误:", error);
        };

        ws.current.onclose = () => {
            console.log("WebSocket 已断开连接");
        };

        return () => {
            if (ws.current) ws.current.close();
        };
    }, []);

    // 向后端发送弹幕消息
    const sendMessage = (text) => {
        if (text && ws.current && ws.current.readyState === WebSocket.OPEN) {
            console.log(text, '===text')
            ws.current.send(text);
        }
    };

    return (
        <div className="app-container">
            <h1>直播弹幕情绪分析系统</h1>
            <DanmuInput onSend={sendMessage} />
            <DanmuList messages={messages} />
        </div>
    );
}

export default App;
