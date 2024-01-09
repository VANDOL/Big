import React from "react";
import "./css/Button.css";
import BarChart from "../chart/Barchart";
import DBarChart from "../chart/doublechart";
import "./css/Button.css";
import "./css/Button1.css";

const Button_4 = ({ data2 }) => {
    if (!data2) {
        return <div>Loading...</div>;
    }
    const data_s = data2[0];
    let highname1 = '';
    let highname2 = '';
    const ageGroups = ["10", "20", "30", "40", "50", "60_above"];

    const residentData = {
        male: {},
        female: {},
    };

    ageGroups.forEach((ageGroup) => {
        const maleKey = `male_age_${ageGroup}_resident_population`;
        const femaleKey = `female_age_${ageGroup}_resident_population`;
        residentData.male[ageGroup] = data_s[maleKey];
        residentData.female[ageGroup] = data_s[femaleKey];
    });

    const residentformData = Object.keys(residentData.male).map(ageGroup => ({
        category: ageGroup.replace('_above', '+'),
        valueMale: residentData.male[ageGroup],
        valueFemale: residentData.female[ageGroup]
    }));

    let highestresident = 0;
    let highestresidentGender = '';
    let highestresidentAgeGroup = '';

    residentformData.forEach(entry => {
        if (entry.valueMale > highestresident) {
            highestresident = entry.valueMale;
            highestresidentGender = '남성';
            highestresidentAgeGroup = entry.category;
        }

        if (entry.valueFemale > highestresident) {
            highestresident = entry.valueFemale;
            highestresidentGender = '여성';
            highestresidentAgeGroup = entry.category;
        }
    });

    // console.log(`Highest resident Gender: ${highestresidentGender}, Age Group: ${highestresidentAgeGroup}`);

    const officeData = {
        male: {},
        female: {},
    };

    ageGroups.forEach((ageGroup) => {
        const maleKey = `male_age_${ageGroup}_office_population`;
        const femaleKey = `female_age_${ageGroup}_office_population`;
        officeData.male[ageGroup] = data_s[maleKey];
        officeData.female[ageGroup] = data_s[femaleKey];
    });

    const officeformData = Object.keys(officeData.male).map(ageGroup => ({
        category: ageGroup.replace('_above', '+'),
        valueMale: officeData.male[ageGroup],
        valueFemale: officeData.female[ageGroup]
    }));

    let highestoffice = 0;
    let highestofficeGender = '';
    let highestofficeAgeGroup = '';

    officeformData.forEach(entry => {
        if (entry.valueMale > highestoffice) {
            highestoffice = entry.valueMale;
            highestofficeGender = '남성';
            highestofficeAgeGroup = entry.category;
        }

        if (entry.valueFemale > highestoffice) {
            highestoffice = entry.valueFemale;
            highestofficeGender = '여성';
            highestofficeAgeGroup = entry.category;
        }
    });

    // console.log(`Highest office Gender: ${highestofficeGender}, Age Group: ${highestofficeAgeGroup}`);
    

    return (
        <div className="container">
            <div className="header">
                <div className="s_title">성별,연령별 주거인구</div>
            </div>
            <DBarChart data={residentformData} />
            <div className="header">
                <p className="sub_text">성별 가장 많은 주거인구의 연령대는 <spane className="e_hi">{highestresidentGender} {highestresidentAgeGroup}</spane>대 입니다</p>
            </div>
            <div className="header">
                <div className="s_title">성별,연령별 직장인구</div>
            </div>
            <DBarChart data={officeformData} />
            <div className="header">
                <p className="sub_text">성별 가장 많은 직장인구의 연령대는 <spane className="e_hi">{highestofficeGender} {highestofficeAgeGroup}</spane>대 입니다</p>
            </div>
        </div>
    );
};

export default Button_4;
