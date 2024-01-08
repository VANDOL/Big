import React from 'react';
import './css/Button.css';
import PieChart from '../../chart/PieChart'; 
import BarChart from '../../chart/BarChart'; 

const Button_3 = ({ pieChartData, barChartData }) => {
// PieChartData 및 barChartData가 상위 구성 요소의 소품으로 제공된다고 가정합니다.
    // 차트에서 사용할 '데이터'와 '옵션'에 대한 속성을 포함하는 객체여야 합니다.

    return (
        <div className="button-container">
            <h1>성별 매출</h1>
            <div className="charts-row">
                {pieChartData.map((chartData, index) => (
                    <div key={index} className="pie-chart-container">
                        <PieChart data={chartData.data} options={chartData.options} />
                    </div>
                ))}
            </div>
            <div className="charts-row">
                {pieChartData.map((chartData, index) => (
                    <div key={index + 5} className="pie-chart-container"> 
                        <PieChart data={chartData.data} options={chartData.options} />
                    </div>
                ))}
            </div>
            <h1>요일별 매출</h1>
            <BarChart data={barChartData.data} options={barChartData.options} />
        </div>
    );
};

export default Button_3;