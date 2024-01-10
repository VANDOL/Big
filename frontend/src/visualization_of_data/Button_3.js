import React from 'react';
import './css/Button.css';
import PieChart from '../chart/Piechart'; 
import BarChart from "../chart/Barchart"; 

import "./css/Button.css";
import "./css/Button1.css";

const Button_3 = ({ data1 } ) => {
    if (!data1) {
        return <div>Loading...</div>;
    }
    let highname1 = '';
    let highname2 = '';

    const totalDayOfWeekSales = {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0
    };

    const totalTimeOfDaySales = {
        time_00_06: 0,
        time_06_11: 0,
        time_11_14: 0,
        time_14_17: 0,
        time_17_21: 0,
        time_21_24: 0
    };

    const dayOfWeekKoreanMapping = {
        monday: '월요일',
        tuesday: '화요일',
        wednesday: '수요일',
        thursday: '목요일',
        friday: '금요일',
        saturday: '토요일',
        sunday: '일요일'
    };
    
    const timeOfDayKoreanMapping = {
        time_00_06: '00시-06시',
        time_06_11: '06시-11시',
        time_11_14: '11시-14시',
        time_14_17: '14시-17시',
        time_17_21: '17시-21시',
        time_21_24: '21시-24시'
    };

    data1.forEach(entry => {
        totalDayOfWeekSales.monday += entry.monday_sales_amount;
        totalDayOfWeekSales.tuesday += entry.tuesday_sales_amount;
        totalDayOfWeekSales.wednesday += entry.wednesday_sales_amount;
        totalDayOfWeekSales.thursday += entry.thursday_sales_amount;
        totalDayOfWeekSales.friday += entry.friday_sales_amount;
        totalDayOfWeekSales.saturday += entry.saturday_sales_amount;
        totalDayOfWeekSales.sunday += entry.sunday_sales_amount;
    });

    data1.forEach(entry => {
        totalTimeOfDaySales.time_00_06 += entry.sales_amount_time_00_06;
        totalTimeOfDaySales.time_06_11 += entry.sales_amount_time_06_11;
        totalTimeOfDaySales.time_11_14 += entry.sales_amount_time_11_14;
        totalTimeOfDaySales.time_14_17 += entry.sales_amount_time_14_17;
        totalTimeOfDaySales.time_17_21 += entry.sales_amount_time_17_21;
        totalTimeOfDaySales.time_21_24 += entry.sales_amount_time_21_24;
    });

    const dayOfWeekChartData = Object.keys(totalDayOfWeekSales).map(key => ({
        category:  dayOfWeekKoreanMapping[key],
        value: totalDayOfWeekSales[key]
    }));

    const timeOfDayChartData = Object.keys(totalTimeOfDaySales).map(key => ({
        category: timeOfDayKoreanMapping[key],
        value: totalTimeOfDaySales[key]
    }));

    if (dayOfWeekChartData.length > 0) {
        const high =dayOfWeekChartData.reduce((max, entry) => max.value > entry.value ? max : entry);
        highname1 = high.category
        // console.log(highname1);
    } else {
        // console.log('dayOfWeekChartData is empty');
    }

    if (timeOfDayChartData.length > 0) {
        const high =timeOfDayChartData.reduce((max, entry) => max.value > entry.value ? max : entry);
        highname2 = high.category
        // console.log(highname2);
    } else {
        // console.log('timeOfDayChartData is empty');
    }

    return (
        <div className="container">
            <div className="header">
                <div className="s_title">요일별 매출액</div>
            </div>
            <BarChart data={dayOfWeekChartData} />
            <div className="header">
                <p className="sub_text">요일별 매출이 가장 많은 업종은 <spane className="e_hi">{highname1}</spane> 입니다</p>
            </div>
            <div className="header">
                <div className="s_title">시간대별 매출액</div>
            </div>
            <BarChart data={timeOfDayChartData} />
            <div className="header">
                <p className="sub_text">시간대별 매출이 가장 많은 업종은 <spane className="e_hi">{highname2}</spane> 입니다</p>
            </div>
        </div>
    );
};

export default Button_3;