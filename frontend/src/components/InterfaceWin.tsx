import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import "../css/InterfaceWin.css"
import Button_1 from '../visualization_of_data/Button_1';
import Button_2 from '../visualization_of_data/Button_2';
import Button_3 from '../visualization_of_data/Button_3';
import Button_4 from '../visualization_of_data/Button_4';
import Button_5 from '../visualization_of_data/Button_5';

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