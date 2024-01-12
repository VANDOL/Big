import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"
import { SearchIcon, TriangleUpIcon } from '@chakra-ui/icons'
import "../css/MyForm.css"
import cateData_ from "../json/cate_data.json"; // 업종 이름 
import uniqueValues_ from "../json/unique_values.json"; // 행정구 이름 

export default function MyForm(props: any) { // 추천 상권 조건 설정 창 

    const [txtList, setTxtList] = useState<any>([]); // 선택된 행중구 
    const [rV1, setRV1] = useState(2400); // 보증금 
    const [rV2, setRV2] = useState(15); // 월평당임대료
    const [rV3, setRV3] = useState(50); // 성비율 
    const [rV4, setRV4] = useState(50); // 인구비율 
    const uniqueValues:any = uniqueValues_;
    const cateData:any = cateData_;
    const name = ["한식", "일식", "중식", "양식", "분식", "패스트푸드", "치킨", "주점", "카페", "제과점"]
    const [gu, setGu] = useState(uniqueValues_); // 행정구 
    useEffect(()=>{ // 초기값 설정 
        let guList:Array<any> = gu.name;
        guList.sort();
        setGu({name:guList});
    }, [])
    function sendData(f:any) { // 조건 송신 추전 상권 수신 
        // let formData = new FormData();
        let formObj:any = { // 조건 데이터 
            "cate": null,
            "gu": [] as any,
            "rv1": null,
            "rv2": null,
            "rv3": null,
            "rv4": null,
            "age": [] as any
        };
        for(let i of f.elements) {
            if(i.name == "cate") {
                if(i.checked) {
                    formObj[i.name] = i.value;
                }
            }
            else if(i.name == "gu") {
                if(i.checked) {
                    formObj[i.name].push(i.value);
                }
            }
            else if(i.name == "age") {
                if(i.checked) {
                    formObj[i.name].push(i.value);
                }
            }
            else {
                formObj[i.name] = (i.value);
            }
        }

        try {
            fetch("http://127.0.0.1:8000/cafe/anal", { // 조건 데이터 송신 
              method: "POST", // 또는 'PUT'
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formObj),
            }).then((res)=>(res.json()))
            .then((res)=>{

                props.setData(res); // 추천 상권 데이터 저장 
            })
            .catch((res)=>{console.error(res)})
            
        } 
        catch (error) {
            console.error("실패:", error);
        }

        const styleScrollbar = () => {
            // 수직 스크롤바 스타일링
            const verticalScrollbar = document.querySelector(
              '::-webkit-scrollbar-vertical'
            ) as HTMLElement;
      
            if (verticalScrollbar) {
              verticalScrollbar.style.width = '7px'; // 수직 스크롤바 너비 조절
            }
      
            // 수평 스크롤바 스타일링
            const horizontalScrollbar = document.querySelector(
              '::-webkit-scrollbar-horizontal'
            ) as HTMLElement;
      
            if (horizontalScrollbar) {
              horizontalScrollbar.style.height = '10%'; // 수평 스크롤바 높이 조절
            }
          };
          styleScrollbar();
    }

    return (
        <form className="main" onSubmit={(ev) => { 
            const El:any = ev.target;
            ev.preventDefault();
            sendData(El);
            }}>
            <div className="pd-b">
                <div className="form-h">
                    상권 추천
                </div>
                <div className="form-h1">
                    업종
                </div>
                <div className="form-r-w">
                    {
                        cateData["name"].map((n:any, i:any)=>{
                            return (
                                <Fragment key={"f-r-i-"+i}>
                                    <input id={"f-r-i-"+i} className="in-r dis-hi" type="radio" name="cate" value={n} required/>
                                    <label htmlFor={"f-r-i-"+i} className="form-r-w-i">
                                        <div className="img-div">
                                            <div className={"formImg formImg" + i}>
                                            </div>
                                            <div className={"img-txt img-txt" + i}>
                                                {name[i]}
                                            </div>   
                                        </div>
                                    </label>
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
            <div className="pd-b">
                <div className="form-h1">
                    지역
                </div>
                <div className="form-div">
                    <div id="reg-txt" onClick={(ev) => {
                    const El1: any = document.getElementById("reg");
                    El1.className = El1.className.split(' ').map((n: any) => {
                        if (n != 'dis-hi') {
                            return n;
                        }
                    }).join(' ');
                    const El2: any = document.getElementById("reg-txt");
                    El2.className += " dis-hi";
                }}>
                    {
                        txtList.map((n:any, i:any)=>{
                            return <span key={i} className="s-txt">{n}</span>;
                        })
                    }
                    </div>
                    <div id="reg" className="dis-hi form-c-w-1 pos-rel">
                        <div className="form-c-w-2">
                            {
                                gu.name.map((n:any,i:any)=>{
                                    return (
                                        <Fragment key={"f-2-c-i-" + i}>
                                            <input id={"f-2-c-i-" + i} className="dis-hi in-c" value={n} type="checkbox" name="gu"/>
                                            <label htmlFor={"f-2-c-i-" + i}
                                            onClick={(ev)=>{
                                                const E:any = ev;
                                                const el:any = document.getElementById(E.target.htmlFor);
                                                if(el.checked == false) {
                                                    let List:any = [];
                                                    for(let i of txtList) {
                                                        List.push(i);
                                                    }
                                                    List.push(el.value);
                                                    setTxtList(List);
                                                }
                                                else {
                                                    console.log(el.checked);
                                                    let List:any = [];
                                                    for(let i of txtList) {
                                                        if(el.value != i) {
                                                            List.push(i);
                                                        }
                                                    }
                                                    setTxtList(List);
                                                }
                                            }}
                                            >
                                                {n}
                                            </label>
                                        </Fragment>
                                    )
                                })
                            }
                        </div>
                        <div className="jub-btn">
                            <TriangleUpIcon cursor={"pointer"} onClick={(ev)=>{ 
                                const El1: any = document.getElementById("reg-txt");
                                El1.className = El1.className.split(' ').map((n: any) => {
                                    if (n != 'dis-hi') {
                                        return n;
                                    }
                                }).join(' ');
                                const El2: any = document.getElementById("reg");
                                El2.className += " dis-hi";
                            }}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pd-b">
                <div className="form-h1 pos-rel">
                    보증금
                    <div className="e-txt">
                        {rV1}만원 이하
                    </div>
                </div>
                <div>
                    <input className="slider_manymoney" max={7500} type="range" name="rv1" value={rV1} onChange={(ev) => {setRV1(parseFloat(ev.target.value))}} />
                </div>
            </div>
            <div className="pd-b">
                <div className="form-h1 pos-rel">
                    월임대료
                    <div className="e-txt">
                        평당 {rV2}만원 이하
                    </div>
                </div>
                <div>
                    <input className="slider_money" max={39} type="range" name="rv2" value={rV2} onChange={(ev) => { setRV2(parseFloat(ev.target.value)) }} />
                </div>
            </div>
            <div className="pd-b">
                <div className="form-h1 pos-rel">
                    성별
                    <div className="e-txt">
                        남 {rV3} : {100 - rV3} 여
                    </div>
                </div>
                <div>
                    <input className="slider_sex" type="range" name="rv3" value={rV3} onChange={(ev) => { setRV3(parseFloat(ev.target.value)) }} />
                </div>
            </div>
            <div className="pd-b">
                <div className="form-h1 pos-rel">
                    인구
                    <div className="e-txt">
                        직장 {rV4} : {100 - rV4} 상주
                    </div>
                </div>
                <div>
                    <input className="slider_home" type="range" value={rV4} name="rv4" onChange={(ev) => { setRV4(parseFloat(ev.target.value)) }} />
                </div>
            </div>
            <div className="pd-b">
                <div className="form-h1">
                    연령
                </div>
                <div className="form-c-w">
                    <div className="chk-d">
                        <input id="f-c-i-1" className="ckb" type="checkbox" name="age" value={"20"}/>
                        <label htmlFor="f-c-i-1" className='cb2'></label>
                        <h3>20대</h3>
                    </div>
                    <div className="chk-d">
                        <input id="f-c-i-2" className="ckb" type="checkbox" name="age" value={"30"}/>
                        <label htmlFor="f-c-i-2" className='cb2'></label>
                        <h3>30대</h3>
                    </div>
                    <div className="chk-d">
                        <input id="f-c-i-3" className="ckb" type="checkbox" name="age" value={"40"}/>
                        <label htmlFor="f-c-i-3" className='cb2'></label>
                        <h3>40대</h3>
                    </div>
                    <div className="chk-d">
                        <input id="f-c-i-4" className="ckb" type="checkbox" name="age" value={"50"}/>
                        <label htmlFor="f-c-i-4" className='cb2'></label>
                        <h3>50대</h3>
                    </div>
                    <div className="chk-d">
                        <input id="f-c-i-5" className="ckb" type="checkbox" name="age" value={"60"}/>
                        <label htmlFor="f-c-i-5" className='cb2'></label>
                        <h3>60대</h3>
                    </div>
                </div>
            </div>
            <div className="dis-flex f-center pm">
                <button className="form-btn" type="submit">
                    <div>
                        추천
                    </div>
                </button>
            </div>
        </form>
    )
}