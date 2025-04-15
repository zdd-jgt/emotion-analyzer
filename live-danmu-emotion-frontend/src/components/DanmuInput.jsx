import React, { useState } from "react";
import "../styles/App.css";

const DanmuInput = ({ onSend }) => {
    const [inputValue, setInputValue] = useState("");

    const handleSend = () => {
        if (inputValue.trim()) {
            onSend(inputValue.trim());
            setInputValue("");
        }
    };

    return (
        <div className="danmu-input">
            <input
                type="text"
                placeholder="请输入弹幕内容"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSend}>发送</button>
        </div>
    );
};

export default DanmuInput;
