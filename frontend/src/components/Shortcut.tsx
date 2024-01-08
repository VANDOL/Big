import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"

import "../css/Shortcut.css"

export default function Shortcut(props: any) {
    // let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"]));
    return (
       <div className="short-card" onClick={(ev)=>{
        let coords = new kakao.maps.LatLng(parseFloat(props.data.position.lat), parseFloat(props.data.position.lng))

        console.log(coords);
        props.map.current.panTo(coords);
       }}>
        {props.data.gu} {props.data.dong} <br />
        {props.data.name} <br />
       </div>
    )
}