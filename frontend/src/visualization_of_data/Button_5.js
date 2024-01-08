import React from 'react';
import './css/Button.css'; 
import PieChart from '../../chart/PieChart'; 

const Button_5 = ({ consumptionTrendData, pieChartLabels }) => {
    // 선택상권과 관련된 소비 트렌드 데이터와 파이 차트 라벨들을 props로 전달받는다고 가정합니다.

    return (
        <div className="button-container">
            <h1>소비트렌드</h1>
            <p>선택상권은 'db에서가져오기' 비율이 가장 많습니다.</p>
            <div className="highlight-box">
                <p>선택상권 'db에서가져오기' 소비가 가장 높은 지역입니다. 'db에서가져오기'에 대 경쟁업소를 파악하시기 바랍니다.</p>
            </div>
            <PieChart data={consumptionTrendData} />
            {/* 여기에 라벨 표시 */}
            <table>
                {/* 테이블 데이터를 여기에 표시 */}
            </table>
        </div>
    );
};

export default Button_5;