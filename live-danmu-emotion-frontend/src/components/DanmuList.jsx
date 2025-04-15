import React from "react";
import "../styles/App.css";

const DanmuList = ({ messages }) => {
    console.log(messages, '===messages')
    return (
        <div className="danmu-list">
            <h2>实时弹幕及情绪反馈</h2>
            {messages.length === 0 && <p>暂无消息...</p>}
            {messages.map((msg, index) => (
                <div key={index} className="danmu-item">
                    <p>
                        <strong>弹幕：</strong>{msg.text}
                    </p>
                    <p>
                        <strong>情绪：</strong>
                        {msg.sentiment && msg.sentiment[0]
                            ? `${msg.sentiment[0].label} (置信度：${msg.sentiment[0].score.toFixed(2)})`
                            : "分析失败"}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DanmuList;
