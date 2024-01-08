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
        <>
        <div className="s-name">
            {props.data.name}
        </div>
        <table className="s-table">
            <tbody>
                <tr className="s-tr">
                    <th className="s-th"><img className="s-img" src={s_img1} alt="" /></th>
                    <td className="s-td">
                        {props.data.s}
                    </td>
                </tr>
                <tr className="s-tr">
                    <th className="s-th"><img className="s-img" src={s_img2} alt="" /></th>
                    <td className="s-td">
                        {props.data.w}
                    </td>
                </tr>
                <tr className="s-tr">
                    <th className="s-th"><img className="s-img" src={s_img3} alt="" /></th>
                    <td className="s-td">
                        {props.data.o}
                    </td>
                </tr>
                <tr className="s-tr">
                    <th className="s-th"><img className="s-img" src={s_img4} alt="" /></th>
                    <td className="s-td">
                        {props.data.t}
                    </td>
                </tr>
            </tbody>
        </table>
        </>
    )
}