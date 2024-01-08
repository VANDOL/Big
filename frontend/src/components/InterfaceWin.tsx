import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import "../css/InterfaceWin.css"
<<<<<<< HEAD
import Button_1 from '../visualization_of_data/Button_1';
import Button_2 from '../visualization_of_data/Button_2';
import Button_3 from '../visualization_of_data/Button_3';
import Button_4 from '../visualization_of_data/Button_4';
import Button_5 from '../visualization_of_data/Button_5';
=======
import BarChart from "../chart/Barchart";
import PieChart from "../chart/Piechart";


// Sample data for opening and closing stores
const openingData = 120; // Represents the number of new stores opened
const closingData = 95;  // Represents the number of stores closed

// Sample data for Bar Chart (e.g., rental rates for commercial properties)
const barChartData = [
    { category: 'Main Street', value: 5000 },
    { category: 'Second Street', value: 4500 },
    { category: 'Third Street', value: 4000 },
    { category: 'Fourth Street', value: 3500 },
    { category: 'Fifth Street', value: 3000 },
];

// Sample data for Pie Chart (e.g., proportion of franchise vs general stores)
const pieChartData = [
    { category: 'Franchise Stores', value: 300 },
    { category: 'General Stores', value: 700 },
];


const data={
    "name": "Gangnam District",
    "description": "A major commercial and entertainment district in Seoul.",
    "ageGroup": {
      "children": 10,
      "teens": 15,
      "youngAdults": 40,
      "adults": 25,
      "seniors": 10
    },
    "peakTime": "18:00 - 22:00",
    "populationType": "Mostly young adults and professionals",
    "populationByAge": {
      "0-10": 5,
      "11-20": 10,
      "21-30": 40,
      "31-40": 20,
      "41-50": 15,
      "51+": 10
    },
    "salesData": [
      { "category": "Retail", "value": 200000 },
      { "category": "Food & Beverage", "value": 150000 },
      { "category": "Services", "value": 50000 },
      // ... other categories
    ]
  }
>>>>>>> see

export default function InterfaceWin(props: any) {
    const [openToggle, setOpenToggle] = useState(false);
    const [check, setCheck] = useState<any>(false);
    useEffect(()=>{
        setCheck(false);
        if(props.data.length > 0) {
            setCheck(true);
            // console.log(props);
        }
        // console.log(props);
    },[props.data])
    useEffect(()=>{
        if(props.getCheck == '') {
            setOpenToggle(false);
        }
        else {
            setOpenToggle(true);
            let el:any = document.getElementById("i-checkbox");
            el.checked = false;
        }
    }, [props.getCheck]);
    return (
        <>
            {
                props.getCheck !='' ? 
                <input id="i-checkbox" type="checkbox" className="dis-hi" />   
                :
                (<input id="i-checkbox" type="checkbox" checked disabled className="dis-hi" />)
            }
            <span className="i-btn">
                {
                    props.getCheck !='' ? 
                    (openToggle ?
                    <label onClick={(ev) => { setOpenToggle(false) }} htmlFor="i-checkbox"><ArrowRightIcon h={"90%"} w={"90%"}></ArrowRightIcon></label> 
                    :
                    <label onClick={(ev) => { setOpenToggle(true) }} htmlFor="i-checkbox"><ArrowLeftIcon h={"90%"} w={"90%"}></ArrowLeftIcon></label>
                    )
                    :
                    <label htmlFor="i-checkbox"><ArrowLeftIcon h={"90%"} w={"90%"}></ArrowLeftIcon></label>
                }

            </span>
            <div className="i-win">
                {
                    openToggle ?
                    <Tabs isFitted>
                        <TabList>
                            <Tab> 1 </Tab>
                            <Tab> 2 </Tab>
                            <Tab> 3 </Tab>
                            <Tab> 4 </Tab>
                            <Tab> 5 </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel h={"100%"}>
<<<<<<< HEAD
                                { <Button_1 regionData={props.data.regionData} />}
                            </TabPanel>
                            {/* <TabPanel h={"100%"}>
                                {<Button_2 barChartData={yourBarChartData} pieChartData={yourPieChartData} openingData={yourOpeningData} closingData={yourClosingData} />}
                            </TabPanel>
                            <TabPanel h={"100%"}>
                                {<Button_3 barChartData={yourBarChartData} pieChartData={yourPieChartData} />}
                            </TabPanel>
                            <TabPanel h={"100%"}>
                                { <Button_4 regionData={props.data.regionData} />}
=======
                            <div className="popup-container">
                                <div className="popup-header">
                                    <h2>책임의 한계 안내</h2>
                                    <p>
                                    본 보고서는 서울특별시에서 선택상권분석을 돕기 위해 제공하는 정보입니다.
                                    서울특별시에서 보유하거나 외부기관으로부터 수집된 신뢰할만한 자료 및 정보로부터 얻어진 것이나 통계적으로 추정된 정보를 이용하여 작성되었기에 리포트 내용에 대한 정확성이나 완전성을 보장할 수 없습니다.
                                    따라서 자신의 판단과 책임하에 보고서를 활용하시기 바랍니다.
                                    또한 서울시는 본 보고서를 활용하여 결과에 대한 어떠한 법적 책임도 없으며 전적으로 사용자 자신에게 있음을 알려드립니다.
                                    </p>
                                    {/* <h1>{regionData.name}</h1> 예시: db에서 가져온 지역명으로 변경 */}
                                </div>
                                <div className="popup-body">
                                {/* 데이터베이스에서 가져온 값으로 통계를 표시합니다. */}
                                <div className="stat">
                                        <span className="stat-title">거주민 연령대</span>
                                        {/* <div className="stat-value">{data?.ageGroup}</div> */}
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
                                        {/* <div className="stat-value">{data?.populationByAge}</div> */}
                                    </div>
                                    <p>업종별 평균 매출액</p>
                                    <BarChart data={data.salesData} />
                                    <p>매출액은 카드사 데이터로 도출한 매출추정액입니다.</p>
                                </div>
                            </div>
                            </TabPanel>
                            <TabPanel h={"100%"}>
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
                                {props.data.b}
                            </TabPanel>
                            <TabPanel h={"100%"}>
                            {/* <div className="button-container">
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
                                {props.data.c} */}
>>>>>>> see
                            </TabPanel>
                            <TabPanel h={"100%"}>
                                { <Button_5 regionData={props.data.regionData} />}
                            </TabPanel> */}
                        </TabPanels>
                    </Tabs>
                    :
                    <div></div>
                }
            </div>
        </>
    )
}