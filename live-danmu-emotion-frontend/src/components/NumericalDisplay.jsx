import React from "react";
import "../styles/App.css";
import Bg from '../image/bg.png'
const NumericalDisplay = ({ messages }) => {
    console.log(messages, '===messages111')
    const total = messages.length
    return (
        <div className="numericalDisplay">
            <div>
                <img src={Bg} alt=""/>
            </div>
            <div className="text-box">
                <div className="total">
                    {total}
                    <div className="total-text">直播弹幕累计</div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default NumericalDisplay;
