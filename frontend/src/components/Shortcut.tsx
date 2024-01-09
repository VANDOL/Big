import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"

import "../css/Shortcut.css"

export default function Shortcut(props: any) {
    // let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"]));
    return (
       <div className="short-card" onClick={(ev)=>{
        let coords = new kakao.maps.LatLng(parseFloat(props.data.position.lat), parseFloat(props.data.position.lng))

        for(let i of props.mk_obj.current.sang) {
            if(i.name == props.data.name) {
                i.click_c = true;
            }
            else {
                i.click_c = false;
            }
        }
        props.map.current.panTo(coords);
        if (props.map.current?.getLevel()! > 4) {
            setTimeout(function () {
              props.map.current?.setLevel(4);
            }, 500)
        }
        props.setName(props.data.name);
        props.setCode(props.data.code);
       }}>
        <div className="m-txt">
            {props.data.name}
        </div>
        <div className="e-txt1">
            {props.data.cname}
        </div>
        <div className="e-txt2">
            {props.data.gu} {props.data.dong}
        </div>
       </div>
    )
}