import React from "react"
import { useRef, useState, useEffect } from "react"
import { Map, MapMarker, Polygon, CustomOverlayMap } from "react-kakao-maps-sdk"
import useKakaoLoader from "../js/kakao_api"

import data1 from "../json/simple_map1.json";
import data2 from "../json/simple_map2.json";
import data3 from "../json/simple_map3.json";

import data4 from "../json/store_data_사직동.json";

import sang_data1 from "../json/why_map1.json";

// import { chakra } from '@chakra-ui/react'
import { Box, Center, Input, Button, IconButton, VStack, HStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Divider, } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import { isVisible } from "@testing-library/user-event/dist/utils";
import MyForm from "../components/MyForm";
import MySwot from "../components/Swot";
import InterfaceWin from "../components/InterfaceWin";
import Shortcut from "../components/Shortcut";
import { createImportSpecifier } from "typescript";
// import { mymap } from "./MyMap";

export default function MyMap1() {
  useKakaoLoader()
  const [level, setLevel] = useState(3);
  const [click_m, setClick_m] = useState(false);
  const [over_m, setOver_m] = useState(false);
  const [mode_m, setMode_m] = useState(0);
  const [goRender, setGoRender] = useState(false);
  const mapRef = useRef<kakao.maps.Map>(null);
  const [clickName, setClickName] = useState("");
  const [clickName1, setClickName1] = useState("");
  
  const [clickSName, setClickSName] = useState("");

  const sangData = useRef<any>({});
  const [rSang, setRSang] = useState<any>([]);
  const [rSang_, setRSang_] = useState<any>([]);
  const [getCheck, setGetCheck] = useState('');

  const stores_m = useRef<any>([]);
  const mk_obj = useRef(
    {
      dong: [] as any,
      gu: [] as any,
      sido: [] as any,
      sang: [] as any,
      sDong: [] as any,
      sGu: [] as any,
      sSido: [] as any
    }
  );



  function clickDong(ev: any) {
    let check = false;
    for (let i of mk_obj.current.dong) {
      if (i.name == ev.currentTarget.id) {
        setClick_m(false);
        if (i.click_c == true) {
          i.click_c = false;
          setClickName('');
          setClickSName('');
        }
        else {
          i.click_c = true;
          check = true;
          let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"]));

          if (mapRef.current?.getLevel()! > 4) {
            mapRef.current?.setLevel(4);
          }
          mapRef.current?.panTo(coords);
          setClickName(i.name);
        }
      }
      else {
        i.click_c = false;
      }
    }
    setGoRender((m) => {
      return !m;
    });
    // setClick_m((m:boolean)=>{
    //   return check;
    // });
  }
  function enterDong(ev: any) {
    if (ev.target != ev.currentTarget) {
      return;
    }
    let check = false;

    for (let i of mk_obj.current.dong) {

      if (i.name == ev.currentTarget.id) {
        if (i.hover_c) {
        }
        else {
          i.hover_c = true;
          check = true;
        }
      }
      else {
        i.hover_c = false;
      }
    }
    setGoRender((m) => {
      return !m;
    });
    setOver_m((m: boolean) => {
      return check;
    });
  }
  function outDong(ev: any) {
    if (ev.target != ev.currentTarget) {
      return;
    }
    let check = false;
    for (let i of mk_obj.current.dong) {
      i.hover_c = false;
    }
    // setClickName('');
    setOver_m((m: boolean) => {
      return check;
    });
    setGoRender((m) => {
      return !m;
    });
  }
  function makeDong(hello: any) {
    let key_id = 1;
    for (let i of hello["features"]) {
      let code = i["properties"]["adm_cd"]
      let name = i["properties"]["adm_nm"].split(" ")[2];
      let p_1 = 0;
      let p_2 = 0;
      let p_count = 0;
      let m_path = [];
      for (let p of i["geometry"]["coordinates"][0][0]) {
        p_1 = p_1 + p[1];
        p_2 = p_2 + p[0];
        p_count = p_count + 1;
        m_path.push({ lat: p[1], lng: p[0] });
      }
      let content = React.createElement(
        "div",
        { className: "mk-1", id: name, onClick: clickDong, onMouseEnter: enterDong, onMouseLeave: outDong },
        React.createElement("div", { className: "mk-2", onClick: null }, name)
      );
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: p_1 / p_count, lng: p_2 / p_count }, key: key_id }, content);
      let polygon = React.createElement(
        Polygon,
        {
          path: m_path, strokeWeight: 3,
          strokeColor: "#2F855A", strokeOpacity: 0.7,
          strokeStyle: "dashed", fillColor: true ? "#68D391" : "#A2FF99",
          fillOpacity: true ? 0.3 : 0.5, key: key_id
        },
        null);
      let m_obj = {
        name: name,
        dong: name,
        code: code,
        customOverlay: CustomOverlay,
        polygon: polygon,
        click_c: false,
        hover_c: false
      };

      mk_obj.current.dong.push(m_obj);

      let content_ = React.createElement(
        "div",
        { className: "mk-1", id: name + "-sang", onClick: clickSang },
        React.createElement("div", { className: "mk-2", onClick: null }, name)
      );
      CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: p_1 / p_count, lng: p_2 / p_count }, key: key_id }, content_);
      m_obj = {
        name: name,
        dong: name,
        code: null,
        customOverlay: CustomOverlay,
        polygon: null as any,
        click_c: false,
        hover_c: false
      };
      mk_obj.current.sDong.push(m_obj);

      key_id = key_id + 1;
    }
  }
  function makeGu(hello: any) {
    let key_id = 1;
    for (let n of hello["name"]) {
      let name = n;
      let content = React.createElement(
        "div"
        , { className: "mk-1", id: name, onClick: clickDong },
        React.createElement("div", { className: "mk-2" }, name)
      );
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: hello[n][1], lng: hello[n][0] }, key: key_id }, content);
      let m_obj = {
        name: name,
        gu: name,
        customOverlay: CustomOverlay,
        polygon: null as any,
        click_c: false
      };
      mk_obj.current.gu.push(m_obj);

      let content_ = React.createElement(
        "div"
        , { className: "mk-1", id: name + "-sang", onClick: clickSang },
        React.createElement("div", { className: "mk-2" }, name)
      );
      CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: hello[n][1], lng: hello[n][0] }, key: key_id }, content);
      m_obj = {
        name: name,
        gu: name,
        customOverlay: CustomOverlay,
        polygon: null as any,
        click_c: false
      };
      mk_obj.current.sGu.push(m_obj);

      key_id = key_id + 1;
    }
  }
  function makeSido(hello: any) {
    let key_id = 1;
    for (let n of hello["name"]) {
      let name = n;
      let content = React.createElement(
        "div"
        , { className: "mk-1", id: name, onClick: clickDong },
        React.createElement("div", { className: "mk-2" }, name)
      );
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: hello[n][1], lng: hello[n][0] }, key: key_id }, content);
      let m_obj = {
        name: name,
        sido: name,
        customOverlay: CustomOverlay,
        polygon: null as any,
        click_c: false
      };
      mk_obj.current.sido.push(m_obj);

      let content_ = React.createElement(
        "div"
        , { className: "mk-1", id: name + "-sang", onClick: clickDong },
        React.createElement("div", { className: "mk-2" }, name)
      );
      CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: hello[n][1], lng: hello[n][0] }, key: key_id }, content);
      m_obj = {
        name: name,
        sido: name,
        customOverlay: CustomOverlay,
        polygon: null as any,
        click_c: false
      };
      mk_obj.current.sSido.push(m_obj);

      key_id = key_id + 1;
    }
  }


  function clickSang(ev: any) {
    let check = false;

    for (let i of mk_obj.current.sang) {

      if (i.name == ev.currentTarget.id) {
        if (i.click_c) {
          i.click_c = false;

          setClickName1('');
        }
        else {
          i.click_c = true;
          check = true;

          let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"]));
          // mapRef.current?.panTo()

          if (mapRef.current?.getLevel()! > 3) {
            mapRef.current?.setLevel(3);
          }
          mapRef.current?.panTo(coords);
          setClickName1(i.name);
        }

      }
      else {
        i.click_c = false;
      }
    }
    setGoRender((m) => {
      return !m;
    });

  }
  function makePath(p:any, mp:any, p_1:any, p_2:any, p_count:any) {
    if(typeof p[0][0] == 'number') {
      // console.log(p);
      return true;
    }
    // console.log(p);
    for(const pp of p) {
      let check = makePath(pp, mp, p_1, p_2, p_count);
      if(check == true) {
        // console.log(pp);
        const mpp:any = [];
        for(const ppp of pp) {
          p_1[0] = p_1[0] + ppp[1];
          p_2[0] = p_2[0] + ppp[0];
          mpp.push({ lat: ppp[1], lng: ppp[0] });
          
          p_count[0] = p_count[0] + 1;
        }
        mp.push(mpp);
        break;
      }
    }
    return false;
  }
  function makeSang(hello: any) {
    let key_id = 1;
    for (let i of hello["features"]) {
      let code = i["properties"]["TRDAR_CD"];
      let name = i["properties"]["TRDAR_CD_N"];
      let cate = i["properties"]["TRDAR_SE_1"];
      let gu = i["properties"]["SIGNGU_CD_"];
      let dong = i["properties"]["ADSTRD_CD_"];
      // let p_1 = 0;
      // let p_2 = 0;
      // let p_count = 0;
      let p_1 = [0];
      let p_2 = [0];
      let p_count = [0];
      let m_path:any = [];
      let len = i["geometry"]["coordinates"].length;
      makePath(i["geometry"]["coordinates"], m_path, p_1, p_2, p_count);
      
      // for (let p of i["geometry"]["coordinates"][0]) {
      //   p_1 = p_1 + p[1];
      //   p_2 = p_2 + p[0];
      //   p_count = p_count + 1;
      //   m_path.push({ lat: p[1], lng: p[0] });
      // }
      if(code == "3110008") {
        console.log("311");
        console.log(m_path);
      }
      if(code == "3130020") {
        // console.log(i["geometry"]["coordinates"]);
        console.log("313");
        console.log(m_path);
      }
      let content = React.createElement(
        "div",
        { className: "mk-1", id: name, onClick: clickSang },
        React.createElement("div", { className: "mk-2", onClick: null }, name)
      );
      // let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: p_1 / p_count, lng: p_2 / p_count }, key: key_id }, content);
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: p_1[0] / p_count[0], lng: p_2[0] / p_count[0] }, key: key_id }, content);
      let polygonList:any = [];
      let polygonList1:any = [];
      for(let p of m_path) {
        let polygon1 = React.createElement(
          Polygon,
          {
            path: m_path, strokeWeight: 2,
            strokeColor: "#4299E1", strokeOpacity: 0.7,
            strokeStyle: "solid", fillColor: true ? "#BEE3F8" : "#A2FF99",
            fillOpacity: true ? 0.5 : 0.7, key: key_id
          },
          null);
          polygonList1.push(polygon1);
        let polygon = React.createElement(
          Polygon,
          {
            path: m_path, strokeWeight: 3,
            strokeColor: "#2F855A", strokeOpacity: 0.7,
            strokeStyle: "dashed", fillColor: true ? "#68D391" : "#A2FF99",
            fillOpacity: true ? 0.3 : 0.5, key: key_id
          },
          null);
          polygonList.push(polygon);
      }

      // let polygon1 = React.createElement(
      //   Polygon,
      //   {
      //     path: m_path, strokeWeight: 2,
      //     strokeColor: "#C53030", strokeOpacity: 0.7,
      //     strokeStyle: "solid", fillColor: true ? "#FC8181" : "#A2FF99",
      //     fillOpacity: true ? 0.5 : 0.7, key: key_id
      //   },
      //   null);
      // let polygon = React.createElement(
      //   Polygon,
      //   {
      //     path: m_path, strokeWeight: 3,
      //     strokeColor: "#2F855A", strokeOpacity: 0.7,
      //     strokeStyle: "dashed", fillColor: true ? "#68D391" : "#A2FF99",
      //     fillOpacity: true ? 0.3 : 0.5, key: key_id
      //   },
      //   null);
      let m_obj = {
        name: name,
        sang: name,
        cate: cate,
        gu: gu,
        dong: dong,
        code: code,
        customOverlay: CustomOverlay,
        // customOverlay: null,
        // polygon: polygon,
        // polygon1: polygon1,
        polygon: polygonList,
        polygon1: polygonList1,
        click_c: false,
        select_c: false,
      };

      mk_obj.current.sang.push(m_obj);
      key_id = key_id + 1;
    }
    // mk_obj.current.sang = [];
  }



  function searchAddrFromCoords(geocoder: any, coords: any, callback: any) {
    if (!geocoder) {
      return;
    }
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }
  function displayCenterInfo(result: any, status: any) {
    if (status === kakao.maps.services.Status.OK) {
      const infoDiv = document.getElementById("cl");

      for (var i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === "H") {
          infoDiv && (infoDiv.innerHTML = result[i].address_name);
          break;
        }
      }
    }
  }
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (!mapRef.current || searchText == '') {
      return;
    }
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchText, function (result, status) {

      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {

        var coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x));

        mapRef.current!.panTo(coords);

        // map.setLevel(level);
      }
    });
  }

  useEffect(function () {
    const sheet = document.createElement('style');
    const sheet_str = `html {
            height: 100%;
        }
        body {
            height: 100%;
        }
        #root {
            height: 100%;
        }
        .css-0 {
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        #mymap {
            flex: 1;
            position: relative;
            overflow: hidden;
        }
        @keyframes pulse {
          0% {
              transform: scale(1);
          }
          50% {
              transform: scale(1.2);
          }
          100% {
              transform: scale(1);
          }
        }
        .mk-1 {
            width: 80px;
            height: 80px;
            display: flex;
            justify-content: center;
            justify-items: center;
            align-items: center;
            align-content: center;
            border-radius: 50%;
            background-color: rgba(56, 161, 105, 0.6);
            text-align: center;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease; /* 부드러운 전환 효과 */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 약간의 그림자 효과 */
        }
        .mk-1-click {
            transform: scale3d(110%,110%, 100%);
            font-weight: bold;
        }
        .mk-1:hover {
          animation: pulse 1s infinite;
        }
        .mk-2 {
            color: white;
            border-radius: 30px;
            width: 60px;
            height: 60px;
            display: flex;
            text-align: center;
            justify-content: center;
            justify-items: center;
            align-items: center;
            align-content: center;
            text-wrap: wrap;
            line-height: 1.1;
        }
        .info-1 {
          position: absolute;
          text-wrap: nowrap;
          bottom: 100%;
          margin-left: 14.5px;
          margin-bottom: 7px;
          transform: translate(-50%, 0%);
          background-color: #2D3748;
          padding: 2px;
          padding-left: 6px;
          padding-right: 6px;
          border-radius: 10px;
          color: white;
          text-weight:bold;
        }
        .info-1::after {
          
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          border-width: 5px;
          border-style: solid;
          border-color: #2D3748 transparent transparent transparent;
          transform: translate(-50%, 0%);
        }
        .info-2 {
          z-index:100;
          overflow-y: auto;
          position: absolute;
          width: 300px;
          height: 300px;
          bottom: 100%;
          margin-left: 14.5px;
          margin-bottom: 7px;
          transform: translate(-50%, 0%);
          background-color: #2D3748;
          padding: 2px;
          padding-left: 6px;
          padding-right: 6px;
          border-radius: 10px;
          color: white;
          text-weight:bold;
        }
        .info-2::after {
          
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          border-width: 5px;
          border-style: solid;
          border-color: #2D3748 transparent transparent transparent;
          transform: translate(-50%, 0%);
        }
        .dis_hi {
          display: none;
        }
        .visi_hi {
          visibility: hidden;
        }
        .cate_win {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap:5px;
          width: 75%;
          margin: auto;
        }
        .cate_item {
          width: 23%;
          height:50px;
          border-radius: 10px;
          box-shadow: 0px 1px 3px -1px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cate_item:active {
          font-weight: bold;
        }
        .cate_item > label{
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .cate_item > label:active {
          
        }
        .cate_txt {
          font-size: 18px;
          font-weight: bold;
          padding-left: 20px;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        .cate_range {
          width: 90%;
          position: relative;
          left:50%;
          transform: translate(-50%, 0);
        }
        .cate_list {
          // display: flex;
          // justify-content: space-between;
          // width: 90%;
          // position: relative;
          // left:50%;
          // transform: translate(-50%, 0);
        }
        .ckb_label {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .cate_ckb {
          width:20px;
          height:20px;
        }
        .shortcut-win {
          position: relative;
          width: 100%;
        }
        .c-btn {
          padding: 5px;
          margin: 5px;
          width: 100%;
        }
        `;
    const head = document.head || document.getElementsByTagName('head')[0];
    sheet.innerText = sheet_str;
    head.appendChild(sheet);
  }, []);

  useEffect(() => {
    let timerId = setInterval(() => {
      if (!!mapRef.current) {
        // console.log(mapRef.current);
        clearInterval(timerId);

        const map = mapRef.current;


        makeDong(data1);
        makeGu(data2);
        makeSido(data3);
        makeSang(sang_data1);
        setGoRender((m) => { return !m });
        const geocoder = new kakao.maps.services.Geocoder();
        searchAddrFromCoords(geocoder, map.getCenter(), displayCenterInfo);
        kakao.maps.event.addListener(map, "idle", function () {
          searchAddrFromCoords(geocoder, map.getCenter(), displayCenterInfo);
        });

      }
    }, 100);

  }, []);

  useEffect(function () {

  }, [mode_m]);

  useEffect(function () {
    stores_m.current = [];
    if (!mapRef.current) {
      return;
    }
    else if (clickName == '') {
      return;
    }
    try {
      fetch("http://127.0.0.1:8000/data/dong/?dong=" + clickName)
        .then((res) => { return res.json(); })
        .then((res) => {
          let len = res.length;
          console.log(len)
          let key_id = 0;
          for (let i of res) {
            let obj: any = {}
            obj["name"] = i.name;
            obj["s"] = i["s"];
            obj["w"] = i["w"];
            obj["o"] = i["o"];
            obj["t"] = i["t"];
            obj["marker"] = React.createElement(
              MapMarker,
              {
                key: key_id++,
                position: { lat: parseFloat(i["lat"]), lng: parseFloat(i["lng"]) },
                onClick: (ev) => {
                  const E: any = ev;
                  setClickSName(i.name);
                  console.log(i.name);
                  setClick_m(true);
                },
                onMouseOver: (ev) => {
                  const E: any = ev;
                  let el = document.createElement("div");
                  el.className = "info-1";
                  el.innerHTML = `${i.name}`;
                  E.a.appendChild(el);
                },
                onMouseOut: (ev) => {
                  const E: any = ev;
                  for (let c of E.a.children) {
                    if (c.className == 'info-1') {
                      E.a.removeChild(c);
                    }
                  }
                }
              },
              // <div className="click-me dis-not"></div>
            );
            stores_m.current.push(obj);
          }
          let timerId1 = setInterval(() => {
            if (stores_m.current.length == 0) {
              clearInterval(timerId1);
              setGoRender((m) => (!m));

            }
          }, 100);
          let timerId2 = setInterval(() => {
            if (stores_m.current.length != 0) {
              clearInterval(timerId2);
              setGoRender((m) => (!m));
            }
          }, 100);
          return res;
        })
        .catch((res) => { console.error(res) })
    }
    catch {

    }
  }, [clickName]);


  useEffect(function () {
    stores_m.current = [];
    if (!mapRef.current) {
      return;
    }
    else if (clickName1 == '') {
      setGetCheck('');
      return;
    }

    sangData.current = {
      a: "a",
      b: "b",
      c: "c"
    }

    setGetCheck(clickName1);
    try {
      fetch("http://127.0.0.1:8000/data/dong/?dong=" + clickName1)
        .then((res) => { return res.json(); })
        .then((res) => {

        })
        .catch((res) => { console.error(res) })
    }
    catch {

    }
  }, [clickName1]);

  useEffect(function () {
    if (!!mk_obj.current.sang[0]) {
      let rList:any = [];
      
      for (let i of mk_obj.current.sang) {
        i.select_c = false;
        for (let j of rSang) {
          if (i.code == j["a"]) {
            i.select_c = true;
            let obj:any = {
              dong: i.dong,
              gu: i.gu,
              cate: i.cate,
              name: i.name,
              position: i.customOverlay.props.position
            }
            // console.log(i.customOverlay.props.position);
            rList.push(obj);
            break;
          }
        }
      }
      console.log(rList);
      setRSang_(rList);
    }
    setGoRender((m) => (!m));
  }, [rSang]);


  return (
    <>
      {
        // console.log(rSang)
      }
      <div id="mymap">
        {
          mode_m == 1 &&
          <InterfaceWin getCheck={getCheck} data={sangData.current}></InterfaceWin>
        }
        <Tabs isFitted variant='soft-rounded'
          pos={"absolute"} left={"20px"} top={"5px"}
          zIndex={"15"}
          h={"100%"}
        >
          <TabList gap={"5px"} w={"200px"}>
            <Tab bg={"#EDF2F7"} boxShadow={"xs"}
              _selected={{
                bg: "#4A5568",
                color: "white"
              }}
              onClick={() => {
                setClick_m(false);
                setMode_m(0)
                
                setClickName1('');
                clickSang({ currentTarget: { id: "" } });
              }}
            >
              행정동
            </Tab>
            <Tab bg={"#EDF2F7"} boxShadow={"xs"}
              _selected={{
                bg: "#4A5568",
                color: "white"
              }}
              onClick={() => {
                setClick_m(true);
                setMode_m(1);
                setClickName('');
                clickDong({ currentTarget: { id: "" } });
              }}
            >
              업체
            </Tab>
          </TabList>
          {
            click_m &&
            <TabPanels h={"100%"}>
              <TabPanel w={"400px"} bg={"white"} h={"500px"} mt={"10px"}
                borderRadius={"20px"}
                boxShadow={"0px 0px 15px -5px #4A5568"}
                overflowY={"auto"}
              >
                {
                  stores_m.current.map((n: any, i: any) => {
                    return clickSName == n.name && <MySwot data={n}></MySwot>
                  })
                }
              </TabPanel>
              <TabPanel w={"400px"} bg={"white"} h={"85%"} mt={"10px"}
                borderRadius={"20px"}
                boxShadow={"0px 0px 15px -5px #4A5568"}
                overflowY={"auto"}
              >
                {
                  rSang.length > 0?
                  (
                  <div className="shortcut-win">
                    <div className="c-btn">
                      <CloseIcon position={"relative"} left={"calc(100% - 10px)"} bottom={"10px"}
                      cursor={"pointer"}
                      onClick={(ev)=>{
                        setRSang([]);
                      }}
                      >

                      </CloseIcon>
                    </div>
                    {
                      rSang_.map((n:any, i:any)=>{
                        return <Shortcut key={i} data={n} map={mapRef}></Shortcut>
                      })
                    }
                  </div>
                  ):
                  (<MyForm setData={setRSang} setCheck={setGetCheck}></MyForm>)
                }
              </TabPanel>
            </TabPanels>
          }
        </Tabs>
        <HStack id="" position={"absolute"} zIndex={"10"} top={"20px"} left={"50%"} transform={"translate(-50%, 0)"}>
          <Center id="" bg="rgb(29, 40, 44, 0.7)" borderRadius={"50px"}>
            <Text id="cl" color="white" fontWeight={"bold"} m={"10px"} pl={"5px"} pr={"5px"}>

            </Text>
          </Center>
          <form id="search_form" action="" onSubmit={handleSubmit}>
            <HStack bg={""}>
              <Input id="search_text" type="text" bg={"rgb(230, 255, 250, 0.5)"}
                _focus={{ bg: "rgb(230, 255, 250, 0.8)", borderWidth: "0px", boxShadow: "0px 0px 1px 1px #68D391" }}
                _hover={{}}
                autoComplete='off'
                value={searchText}
                onChange={(e) => { setSearchText(e.target.value) }}
              ></Input>
              <IconButton type="submit" aria-label='Search database' icon={<SearchIcon />}
                boxShadow={"0px 0px 3px -1px #4A5568"}
              />
            </HStack>
          </form>
        </HStack>
        <Map // 지도를 표시할 Container
          // center={{ lat: 37.575650779448786, lng: 126.976888842748167 }}
          center={{ lng: 126.9655355, lat: 37.583049 }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={3} // 지도의 확대 레벨
          maxLevel={11}
          onZoomChanged={(qqq) => setLevel(qqq.getLevel())}
          ref={mapRef}
          onCreate={() => { }}
        >
          {(mode_m == 0 && level < 6) && mk_obj.current.dong.map(function (n: any, i: any) {
            return n && (n.customOverlay);
          })
          }
          {
            (mode_m == 0 && mk_obj.current.dong) && mk_obj.current.dong.map(function (n: any, i: any) {

              return (n.click_c || n.hover_c) && n.polygon;
            })
          }
          {//swot
            (mode_m == 0 && clickName != '' && level < 6) && stores_m.current.map((n: any, i: any) => {
              return n.marker;
            })
          }
          {
            (mode_m == 0 && level < 9 && level > 5) && mk_obj.current.gu.map(function (n: any, i: any) {
              return n && n.customOverlay;
            })
          }
          {
            (mode_m == 0 && level > 8) && mk_obj.current.sido.map(function (n: any, i: any) {
              return n && n.customOverlay;
            })
          }

          {
            (mode_m == 1 && mk_obj.current.sang && level < 5) && mk_obj.current.sang.map(function (n: any, i: any) {
              return n.customOverlay;
            })
          }
          {
            (mode_m == 1 && mk_obj.current.sang) && mk_obj.current.sang.map(function (n: any, i: any) {
              // return (n.select_c && (n.polygon1.map((n:any, i:any)=>{return n}))) || (n.click_c && (n.polygon.map((n:any, i:any)=>{return n})));
              return (n.select_c && (n.polygon1.map((n:any, i:any)=>{return n})));
            })
          }
          {
            (mode_m == 1 && mk_obj.current.sang) && mk_obj.current.sang.map(function (n: any, i: any) {
              return (n.click_c && (n.polygon.map((n:any, i:any)=>{return n})));
            })
          }
          {
            (mode_m == 1 && mk_obj.current.sDong && level < 7 && level > 4) && mk_obj.current.sDong.map(function (n: any, i: any) {
              return n.customOverlay;
            })
          }
          {
            (mode_m == 1 && mk_obj.current.sGu && level < 9 && level > 6) && mk_obj.current.sGu.map(function (n: any, i: any) {
              return n.customOverlay;
            })
          }
          {
            (mode_m == 1 && mk_obj.current.sSido && level > 8) && mk_obj.current.sSido.map(function (n: any, i: any) {
              return n.customOverlay;
            })
          }
        </Map>

      </div>
    </>
  )
}
