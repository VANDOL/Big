import React, { useState, useEffect } from "react";
import "./css/Button.css";
import "./css/Button1.css";

const Button_1 = ({ code, name, data1, data2 }) => {
    const [mostCommonAgeGroup, setMostCommonAgeGroup] = useState("");
    const [populationType, setPopulationType] = useState("");
    const [peakTime, setPeakTime] = useState("");

    useEffect(() => {
        if (data2 && data2.length > 0) {
            const data = data2[0];

            const ageGroups = {
                10: data.resident_population_age_10,
                20: data.resident_population_age_20,
                30: data.resident_population_age_30,
                40: data.resident_population_age_40,
                50: data.resident_population_age_50,
                60: data.resident_population_age_60_above,
            };
            const mostCommonAge = Object.keys(ageGroups).reduce((a, b) =>
                ageGroups[a] > ageGroups[b] ? a : b
            );
            setMostCommonAgeGroup(`${mostCommonAge}대`);

            const malePopulation = data.male_resident_population;
            const femalePopulation = data.female_resident_population;
            if (malePopulation > femalePopulation) {
                setPopulationType("남성 > 여성");
            } else if (femalePopulation > malePopulation) {
                setPopulationType("남성 < 여성");
            } else {
                setPopulationType("남성 = 여성");
            }

            const timeDistributions = {
                "00-06": data.float_population_time_00_06,
                "06-11": data.float_population_time_06_11,
                "11-14": data.float_population_time_11_14,
                "14-17": data.float_population_time_14_17,
                "17-21": data.float_population_time_17_21,
                "21-24": data.float_population_time_21_24,
            };
            const peakTimeSlot = Object.keys(timeDistributions).reduce((a, b) =>
                timeDistributions[a] > timeDistributions[b] ? a : b
            );
            setPeakTime(peakTimeSlot + "시");
        }
    }, [data2]);

    return (
        <div className="container">
            <div className="header">
                <div className="s_title">{name}</div>
                <div className="code">
                    상권코드:
                    <span className="code_hi">{code}</span>
                </div>
            </div>
            <div className="popup-header">
                <h2>책임의 한계 안내</h2>
                <p>
                    본 보고서는 서울특별시에서 선택상권분석을 돕기 위해 제공하는
                    정보입니다. 서울특별시에서 보유하거나 외부기관으로부터
                    수집된 신뢰할만한 자료 및 정보로부터 얻어진 것이나
                    통계적으로 추정된 정보를 이용하여 작성되었기에 리포트 내용에
                    대한 정확성이나 완전성을 보장할 수 없습니다. 따라서 자신의
                    판단과 책임하에 보고서를 활용하시기 바랍니다. 또한 서울시는
                    본 보고서를 활용하여 결과에 대한 어떠한 법적 책임도 없으며
                    전적으로 사용자 자신에게 있음을 알려드립니다.
                </p>
            </div>
            <div className="popup-body">
                <div className="box">
                    <div className="info" >
                        <p className="text">가장 많은 연령대</p>
                        <span className="icon">&#128100;</span>
                        <p className="number">{mostCommonAgeGroup}</p>
                    </div>
                    <div className="info" >
                        <p className="text">가장 많은 시간대</p>
                        <span className="icon">&#128337;</span>
                        <p className="number">{peakTime}</p>
                    </div>
                    <div className="info">
                        <p className="text">인구유형</p>
                        <span className="icon">&#9792; &#9794;</span>
                        <p className="number">{populationType}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Button_1;
