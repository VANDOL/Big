import React, { useState, useEffect } from 'react';
import './css/Button.css'; 
import BarChart from '../../chart/BarChart'; 
import PieChart from '../../chart/PieChart'; 

const Button_2 = ({ barChartData, pieChartData, openingData, closingData }) => {
    return (
        <div className="statistics-container">
            <h1>점포수</h1>
            {/* 여기에 표 컴포넌트 삽입 위치 */}
            <div className="status-row">
                <div className="status-column">
                    <h2>개업현황</h2>
                    <p>개업수는 {openingData}입니다.</p>
                </div>
                <div className="status-column">
                    <h2>폐업현황</h2>
                    <p>폐업수는 {closingData}입니다.</p>
                </div>
            </div>
            <div className="chart-row">
                <div className="chart-column">
                    <h3>상가 임대 시세</h3>
                    <BarChart data={barChartData} /> {/* 바 차트 데이터 */}
                </div>
                <div className="chart-column">
                    <h3>프렌차이즈 일반 점포 비교</h3>
                    <PieChart data={pieChartData} /> {/* 파이 차트 데이터 */}
                    {/* 여기에 파이 차트 레이블을 추가할 수 있습니다. */}
                </div>
            </div>
        </div>
    );
};

export default Button_2;