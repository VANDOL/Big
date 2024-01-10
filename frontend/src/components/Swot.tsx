import React, { Fragment } from "react"
import { useRef, useState, useEffect } from "react"

import "../css/MySwot.css"
import s_img1 from "../img/swot_img/swot_s.png";
import s_img2 from "../img/swot_img/swot_w.png";
import s_img3 from "../img/swot_img/swot_o.png";
import s_img4 from "../img/swot_img/swot_t.png";

export default function MySwot(props: any) {
    const Hello = true;
    // console.log(props);
    return (
        <div className={`swot_window`}>
          <div className="s-name">
            {props.data.name}
          </div>
          <div className="first">
            <div className="swot-txt">S</div>
            <div>{props.data.s}</div>
          </div>
          <div className="second">
            <div className="swot-txt">W</div>
            <div>{props.data.w}</div>
          </div>
          <div className="third">
            <div className="swot-txt">O</div>
            <div>{props.data.o}</div>
          </div>
          <div className="forth">
            <div className="swot-txt">T</div>
            <div>{props.data.t}</div>
          </div>
        </div>
    );
}