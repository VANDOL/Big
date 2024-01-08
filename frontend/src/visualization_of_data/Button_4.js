import React from 'react';
import './css/Button.css';
import BarChart from '../../chart/BarChart'; 
import LineChart from '../../chart/LineChart'; 
const Button_4 = ({ trafficData, residentialData, workingData }) => {
    // 각 데이터는 부모 컴포넌트로부터 전달받은 props라고 가정합니다.

    return (
        <div className="button-container">
            <h1>시간대 유동인구</h1>
            <p>'db에서가져오기' 유동인구가 가장 높아요.</p>
            <LineChart data={trafficData.data} options={trafficData.options} />

            <h2>성별, 연령 주거인구</h2>
            <p>'db에서가져오기' 주거인구가 가장 많아요.</p>
            <BarChart data={residentialData.data} options={residentialData.options} />

            <h2>직장인구</h2>
            <p>'db에서가져오기' 직인구가 가장 많아요.</p>
            <BarChart data={workingData.data} options={workingData.options} />
        </div>
    );
};

export default Button_4;