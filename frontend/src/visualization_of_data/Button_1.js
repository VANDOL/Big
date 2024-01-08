import React, { useState, useEffect } from 'react';
// import './chart/Button.css'; 

import BarChart from './../chart/Barchart';

const Button_1 = ({ regionData }) => {
    // 데이터베이스로부터 가져온 데이터를 state에 저장합니다.
    const [data, setData] = useState(null);

    // 데이터베이스에서 데이터를 가져오는 예시 함수
    useEffect(() => {
        // 데이터베이스에서 데이터를 가져오는 로직 구현
    }, [regionData]);

    return (
        <div className="popup-container">
            <div className="popup-header">
                <h2>책임의 한계 안내</h2>
                <p>
                본 보고서는 서울특별시에서 선택상권분석을 돕기 위해 제공하는 정보입니다.
                서울특별시에서 보유하거나 외부기관으로부터 수집된 신뢰할만한 자료 및 정보로부터 얻어진 것이나 통계적으로 추정된 정보를 이용하여 작성되었기에 리포트 내용에 대한 정확성이나 완전성을 보장할 수 없습니다.
                따라서 자신의 판단과 책임하에 보고서를 활용하시기 바랍니다.
                또한 서울시는 본 보고서를 활용하여 결과에 대한 어떠한 법적 책임도 없으며 전적으로 사용자 자신에게 있음을 알려드립니다.
                </p>
                <h1>{regionData}</h1> 
            </div>
            <div className="popup-body">
              {/* 데이터베이스에서 가져온 값으로 통계를 표시합니다. */}
              <div className="stat">
                    <span className="stat-title">거주민 연령대</span>
                    <div className="stat-value">{data?.ageGroup}</div>
                </div>
                <div className="stat">
                    <span className="stat-title">가장 많은 시간대</span>
                    <div className="stat-value">{data?.peakTime}</div>
                </div>
                <div className="stat">
                    <span className="stat-title">인구유형</span>
                    <div className="stat-value">{data?.populationType}</div>
                </div>
                <div className="stat">
                    <span className="stat-title">인구별 연령대</span>
                    <div className="stat-value">{data?.populationByAge}</div>
                </div>
                <p>업종별 평균 매출액</p>
                {data && <BarChart data={data.salesData} />} 
                <p>매출액은 카드사 데이터로 도출한 매출추정액입니다.</p>
            </div>
        </div>
    );
};

export default Button_1;