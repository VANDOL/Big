import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"

import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import "../css/InterfaceWin.css"

export default function InterfaceWin(props: any) {
    const [openToggle, setOpenToggle] = useState(false);
    
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
                                {/* 1번 내용 */}
                                {props.data.a && "a"}
                            </TabPanel>
                            <TabPanel h={"100%"}>
                                {/* 2번 내용 */}
                                {props.data.b}
                            </TabPanel>
                            <TabPanel h={"100%"}>
                                {/* 3번 내용 */}
                                {props.data.c}
                            </TabPanel>
                            <TabPanel h={"100%"}>
                                {/* 4번 내용 */}
                            </TabPanel>
                            <TabPanel h={"100%"}>
                                {/* 5번 내용 */}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    :
                    <div></div>
                }
            </div>
        </>
    )
}