import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"

import "../css/MySwot.css"

export default function MySwot(props: any) { // 스왓 창
    return (
        <div className={`swot_window`}>
          <div className="s-name">
            {/* 카페 이름 */}
            {props.data.name}
          </div>
          <div className="first">
            <div className="swot-txt">S</div>
            {/* 스왓 */}
            <div>{props.data.s}</div>
          </div>
          <div className="second">
            <div className="swot-txt">W</div>
            {/* 스왓 */}
            <div>{props.data.w}</div>
          </div>
          <div className="third">
            <div className="swot-txt">O</div>
            {/* 스왓 */}
            <div>{props.data.o}</div>
          </div>
          <div className="forth">
            <div className="swot-txt">T</div>
            {/* 스왓 */}
            <div>{props.data.t}</div>
          </div>
        </div>
    );
}