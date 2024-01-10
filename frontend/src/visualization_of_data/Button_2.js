import React, { useState, useEffect } from "react";
import "./css/Button.css";
import "./css/Button1.css";
import BarChart from "../chart/Barchart";
// import PieChart from '../chart/PieChart';

const Button_2 = ({ data1 }) => {
    let chartData = [];
    let highname = '';
    if (data1) {
        chartData = data1.map((entry) => ({
            category: entry.service_industry_code_name,
            value: entry.total_sales_amount,
        }));
    }
    // console.log(chartData);
    if (chartData.length > 0) {
        const high = chartData.reduce((max, entry) => max.value > entry.value ? max : entry);
        highname = high.category
        // console.log(highname);
    } else {
        // console.log('chartData is empty');
    }
    
    return (
        <div className="container">
            <div className="header">
                <div className="s_title">업종별 매출액</div>
            </div>
            {data1 && <BarChart data={chartData} />}
            <div className="header">
                <p className="sub_text">업종별 매출이 가장 많은 업종은 <spane className="e_hi">{highname}</spane>입니다</p>
            </div>
        </div>
    );
};

export default Button_2;
