import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"

import "../css/Shortcut.css"

export default function Shortcut(props: any) { // 추천 상권
    return (
       <div className="short-card" onClick={(ev)=>{ // 클릭 이벤트 
        let coords = new kakao.maps.LatLng(parseFloat(props.data.position.lat), parseFloat(props.data.position.lng)) // 추천 상권 위치 

        for(let i of props.mk_obj.current.sang) {
            if(i.name == props.data.name) {
                i.click_c = true;
            }
            else {
                i.click_c = false;
            }
        }
        props.map.current.panTo(coords); // 지도 이동 
        if (props.map.current?.getLevel()! > 4) {
            setTimeout(function () {
              props.map.current?.setLevel(4); // 지도 줌 레벨 변환 
            }, 500)
        }
        props.setName(props.data.name); // 클릭된 상권 이름 저장 
        props.setCode(props.data.code); // 클릭된 상권 코드 저장 
       }}>
        <div className="m-txt">
            {/* 상권 이름 */}
            {props.data.name}
        </div>
        <div className="e-txt1">
            {/* 상권 코드 */}
            {props.data.cname}
        </div>
        <div className="e-txt2">
            {/* 상권 행정구 행정동 */}
            {props.data.gu} {props.data.dong}
        </div>
       </div>
    )
}