import React from "react"
import { useRef, useState, useEffect } from "react"
import { Map, MapMarker, Polygon, CustomOverlayMap } from "react-kakao-maps-sdk"
import useKakaoLoader from "../js/kakao_api"

import data1 from "../json/simple_map1.json"; // 행정동 데이터 
import data2 from "../json/simple_map2.json"; // 행정구 데이터 
import data3 from "../json/simple_map3.json"; // 행정시도 데이터 

import sang_data1 from "../json/why_map1.json"; // 상권 데이터 
import { Center, Input, IconButton, HStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import { SearchIcon, CloseIcon } from '@chakra-ui/icons'
import MyForm from "../components/MyForm";
import MySwot from "../components/Swot";
import InterfaceWin from "../components/InterfaceWin";
import Shortcut from "../components/Shortcut";
import formImg1 from "../img/form_img/MicrosoftTeams-image.png";
import "../css/MyMap.css"
export default function MyMap1() {
  useKakaoLoader() // kakao map api 호출 
  const [level, setLevel] = useState(10); //지도의 줌 레벨 
  const [click_m, setClick_m] = useState(true); // 클릭의 따른 상태 체크
  const [mode_m, setMode_m] = useState(0); // 상권추천과 가게분석 상태 체크
  const [goRender, setGoRender] = useState(false); // 강제로 재렌더링 
  const mapRef = useRef<kakao.maps.Map>(null); // 지도의 DOM 
  const [clickName, setClickName] = useState(""); // 가게분석에서 클릭한 행정동
  const [clickName1, setClickName1] = useState(""); // 상권분석에서 클릭한 상권 
  const [clickCode1, setClickCode1] = useState(""); // 상권분석에서 클릭한 상권 코드 
  const [clickSName, setClickSName] = useState(""); // 가게분석에서 클릭한 카페 이름 
  const [fetchedData, setFetchedData] = useState(null); // 호출된 상권정보
  const [fetchedData2, setFetchedData2] = useState(null); // 호출된 상권정보
  const sangData = useRef<any>([]); // 호출된 상권정보 
  const [rSang, setRSang] = useState<any>([]); // 추천된 상권 
  const [rSang_, setRSang_] = useState<any>([]); // 추천된 상권리스트 
  const [getCheck, setGetCheck] = useState(''); // 상권클릭 체크 
  const stores_m = useRef<any>([]); // 카페정보 
  const mk_obj = useRef( 
    {
      dong: [] as any, // 행정동 데이터 
      gu: [] as any, // 행정구 데이터 
      sido: [] as any, // 행정시도 데이터 
      sang: [] as any, // 상권 데이터 
      sDong: [] as any, // 상권 행정동 데이터 
      sGu: [] as any, // 상권 행정구 데이터 
      sSido: [] as any // 상권 행정시도 데이터 
    }
  );


  function clickSDong(ev: any) { //상권 행정동 클릭시 발생하는 이벤트 
    for (let i of mk_obj.current.sDong) {
      if (i.name + "-sang" == ev.currentTarget.id) { // 클릭된 행정동 확인 
        let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"])); // 클릭된 상권 행정구 위치 
        mapRef.current?.panTo(coords); // 지도 이동 
        if (mapRef.current?.getLevel()! > 4) {
          setTimeout(function () {
            mapRef.current?.setLevel(4); // 지도의 줌레벨 변환 
          }, 500)
        }
      }
    }
    setGoRender((m) => {
      return !m;
    });
  }

  function clickDong(ev: any) { // 행정동 클릭 이벤트 
    let check = false;
    for (let i of mk_obj.current.dong) {
      if (i.name == ev.currentTarget.id) { // 클릭된 행정동 확인 
        setClick_m(false);
        if (i.click_c == true) { // 클릭 해제 
          i.click_c = false;
          setClickName(''); // 클릭된 이름 초기화 
          setClickSName(''); // 클릭된 이름 초기화 
        }
        else { // 클릭 활성화 
          i.click_c = true;
          check = true;
          let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"])); // 클릭된 행정구 위치 
          mapRef.current?.panTo(coords); // 지도 이동 
          if (mapRef.current?.getLevel()! > 4) {
            setTimeout(function () {
              mapRef.current?.setLevel(4); // 지도 줌 레벨 변환 
            }, 500)
          }
          setClickName(i.name); // 클릭된 이름 저장 
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
  function enterDong(ev: any) { // 행정동 마우스 입장 이벤트 
    if (ev.target != ev.currentTarget) {
      return;
    }
    let check = false;

    for (let i of mk_obj.current.dong) {

      if (i.name == ev.currentTarget.id) { // 입장된 행정동 체크 
        if (i.hover_c) {
        }
        else { // 입장 활성화 
          i.hover_c = true;
          check = true;
        }
      }
      else { // 입장 비활성화 
        i.hover_c = false;
      }
    }
    setGoRender((m) => {
      return !m;
    });
  }
  function outDong(ev: any) { // 행정동 마우스 빠져나감 이벤트 
    if (ev.target != ev.currentTarget) { 
      return;
    }
    let check = false;
    for (let i of mk_obj.current.dong) { // 입장 비활성화 
      i.hover_c = false;
    }
    setGoRender((m) => {
      return !m;
    });
  }
  function makeDong(hello: any) { // 상권 행정동 / 행정동 데이터 저장 
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
      let content = React.createElement( // 행정동 마커
        "div",
        { className: "mk-1", id: name, onClick: clickDong, onMouseEnter: enterDong, onMouseLeave: outDong },
        React.createElement("div", { className: "mk-2", onClick: null }, name)
      );
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: p_1 / p_count, lng: p_2 / p_count }, key: key_id }, content); // 행정동 마커 
      let polygon = React.createElement( // 행정동 경계면 
        Polygon,
        {
          path: m_path, strokeWeight: 3,
          strokeColor: "#2F855A", strokeOpacity: 0.7,
          strokeStyle: "dashed", fillColor: true ? "#68D391" : "#A2FF99",
          fillOpacity: true ? 0.3 : 0.5, key: key_id
        },
        null);
      let m_obj = { // 행정동 정보 
        name: name, // 행정동 이름 
        dong: name, // 행정동 이름 
        code: code, // 행정동 코드 
        customOverlay: CustomOverlay, // 행정동 마커 
        polygon: polygon, // 행정동 경계면 
        click_c: false, // 행정동 마우스 클릭 유무 
        hover_c: false // 행정동 마우스 오버 유무 
      };

      mk_obj.current.dong.push(m_obj);

      let content_ = React.createElement( // 상권 행정동 마커 
        "div",
        { className: "mk-1", id: name + "-sang", onClick: clickSDong },
        React.createElement("div", { className: "mk-2", onClick: null }, name)
      );
      CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: p_1 / p_count, lng: p_2 / p_count }, key: key_id }, content_); // 상권 행정동 마커 
      m_obj = { // 상권 행정동 정보 
        name: name, // 상궝 행정동 이름 
        dong: name, // 상권 행정동 이름 
        code: null, 
        customOverlay: CustomOverlay, // 상권 행저동 마커 
        polygon: null as any, // 상권 행정동 경계면 
        click_c: false,
        hover_c: false
      };
      mk_obj.current.sDong.push(m_obj);

      key_id = key_id + 1;
    }
  }

  function clickGu(ev: any) { // 행정구 클릭 이벤트 
    let check = false;
    for (let i of mk_obj.current.gu) {
      if (i.name == ev.currentTarget.id) { // 클릭된 행정구 확인 
        let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"])); // 행정동 위치 

        mapRef.current?.panTo(coords); // 지도 이동 
        if (mapRef.current?.getLevel()! > 5) {
          setTimeout(function () {
            mapRef.current?.setLevel(5); // 지도 줌 레벨 변환 
          }, 500)
        }
      }
    }
    setGoRender((m) => {
      return !m;
    });
  }
  function makeGu(hello: any) { // 상권 행정구 / 행정구 데이터 저장
    let key_id = 1;
    for (let n of hello["name"]) {
      let name = n;
      let content = React.createElement( // 행정구 마커 
        "div"
        , { className: "mk-1", id: name, onClick: clickGu },
        React.createElement("div", { className: "mk-2" }, name)
      );
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: hello[n][1], lng: hello[n][0] }, key: key_id }, content); // 행정구 마커 
      let m_obj = { // 행정구 데이터 
        name: name, // 행정구 이름 
        gu: name, // 행정구 이름 
        customOverlay: CustomOverlay, // 행정구 마커 
        polygon: null as any,
        click_c: false 
      };
      mk_obj.current.gu.push(m_obj);

      let content_ = React.createElement( // 상권 행정구 마커 
        "div"
        , { className: "mk-1", id: name + "-sang", onClick: clickSang },
        React.createElement("div", { className: "mk-2" }, name)
      );
      CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: hello[n][1], lng: hello[n][0] }, key: key_id }, content); // 상권 행정구 마커 
      m_obj = { // 상권 행정구 데이터 
        name: name, // 상권 행정구 이름 
        gu: name, // 상권 행정구 이름 
        customOverlay: CustomOverlay, // 상권 행정구 마커 
        polygon: null as any,
        click_c: false
      };
      mk_obj.current.sGu.push(m_obj);

      key_id = key_id + 1;
    }
  }

  function clickSido(ev: any) { // 행정시도 클릭 이벤트 
    for (let i of mk_obj.current.sido) {
      if (i.name == ev.currentTarget.id) { // 클릭된 행정시도 확인 
          let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"])); // 행정시도 위치 
          mapRef.current?.panTo(coords); // 지도 이동 
          if (mapRef.current?.getLevel()! > 8) {
            setTimeout(function () {
              mapRef.current?.setLevel(8); // 지도 줌 레벨 변환 
            }, 500)
          }
        }
    }
    setGoRender((m) => {
      return !m;
    });

  }

  function makeSido(hello: any) { // 상권 행정시도 / 행정시도 데이터 저장 
    let key_id = 1;
    for (let n of hello["name"]) {
      let name = n;
      let content = React.createElement( // 행정시도 마커 
        "div"
        , { className: "mk-1", id: name, onClick: clickSido },
        React.createElement("div", { className: "mk-2" }, name)
      );
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: hello[n][1], lng: hello[n][0] }, key: key_id }, content); // 행정시도 마커 
      let m_obj = { // 행정시도 데이터 
        name: name, // 행정시도 이름 
        sido: name, // 행정시도 이름 
        customOverlay: CustomOverlay, // 행정시도 마커 
        polygon: null as any,
        click_c: false
      };
      mk_obj.current.sido.push(m_obj);

      let content_ = React.createElement( // 상권 행정시도 마커 
        "div"
        , { className: "mk-1", id: name + "-sang", onClick: clickSido },
        React.createElement("div", { className: "mk-2" }, name)
      );
      CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: hello[n][1], lng: hello[n][0] }, key: key_id }, content); // 상권 행정시도 마커 
      m_obj = { // 상권 행정시도 데이터 
        name: name, // 상권 행정시도 이름 
        sido: name, // 상권 행정시도 이름 
        customOverlay: CustomOverlay, // 상권 행정시도 마커 
        polygon: null as any,
        click_c: false
      };
      mk_obj.current.sSido.push(m_obj);

      key_id = key_id + 1;
    }
  }


  function clickSang(ev: any) { // 상권 클릭 이벤트 
    let check = false;
    for (let i of mk_obj.current.sang) {
      if (i.name == ev.currentTarget.id) { // 클릭된 상권 확인 
        if (i.click_c) { // 클릭 비활성화 
          i.click_c = false;
          setClickCode1(""); // 클릭된 이름 초기화 
          setClickName1(''); // 클릭된 코드 초기화 
        }
        else { // 클릭 활성화 
          i.click_c = true;
          check = true;
          let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"])); // 상권 위치 
          mapRef.current?.panTo(coords); // 지도 이동 
          if (mapRef.current?.getLevel()! > 3) {
            setTimeout(function () {
              mapRef.current?.setLevel(3); // 지도 줌 레벨 변환 
            }, 500)
          }
          setClickCode1(i.code); // 클릭된 이름 저장 
          setClickName1(i.name); // 클릭된 코드 저장 
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
  function makePath(p: any, mp: any, p_1: any, p_2: any, p_count: any) { // 상권 경계면 저장 
    if (typeof p[0][0] == 'number') {
      return true;
    }
    for (const pp of p) {
      let check = makePath(pp, mp, p_1, p_2, p_count);
      if (check == true) {
        const mpp: any = [];
        for (const ppp of pp) {
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
  function makeSang(hello: any) { // 상권 데이터 저장 
    let key_id = 1; 
    for (let i of hello["features"]) {
      let code = i["properties"]["TRDAR_CD"];
      let name = i["properties"]["TRDAR_CD_N"];
      let cate = i["properties"]["TRDAR_SE_1"];
      let gu = i["properties"]["SIGNGU_CD_"];
      let dong = i["properties"]["ADSTRD_CD_"];
      let cname = i["properties"]["TRDAR_SE_1"]
      let p_1 = [0];
      let p_2 = [0];
      let p_count = [0];
      let m_path: any = [];
      let len = i["geometry"]["coordinates"].length;
      makePath(i["geometry"]["coordinates"], m_path, p_1, p_2, p_count);
      let content = React.createElement( // 상권 마커 
        "div",
        { className: "mk-1", id: name, onClick: clickSang },
        React.createElement("div", { className: "mk-2", onClick: null }, name)
      );
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: p_1[0] / p_count[0], lng: p_2[0] / p_count[0] }, key: key_id }, content); // 상권 마커 
      let polygonList: any = [];
      let polygonList1: any = [];
      for (let p of m_path) {
        let polygon1 = React.createElement( // 상권 경계면 
          Polygon,
          {
            path: m_path, strokeWeight: 2,
            strokeColor: "#4299E1", strokeOpacity: 0.7,
            strokeStyle: "solid", fillColor: true ? "#BEE3F8" : "#A2FF99",
            fillOpacity: true ? 0.5 : 0.7, key: key_id
          },
          null);
        polygonList1.push(polygon1);
        let polygon = React.createElement( // 상권 경계면 
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
      let m_obj = { // 상권 데이터 
        name: name, // 상권 이름 
        cname: cname, // 상권 코드 
        sang: name, // 상권 이름 
        cate: cate, // 상권 종류 
        gu: gu, // 상권 행정구 
        dong: dong, // 상권 행정동 
        code: code, // 상권 코드 
        customOverlay: CustomOverlay, // 상권 마커 
        polygon: polygonList, // 상권 경계면 
        polygon1: polygonList1, // 상권 경계면 
        click_c: false, // 상권 클릭 유무 
        select_c: false,
      };

      mk_obj.current.sang.push(m_obj);
      key_id = key_id + 1;
    }
  }

  function searchAddrFromCoords(geocoder: any, coords: any, callback: any) { // kakao map api 현재 위치 요청 
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
  const [searchText, setSearchText] = useState(""); // 맵 현재위치 

  const handleSubmit = (event: any) => { // 도로명 위치 검색 
    event.preventDefault();
    if (!mapRef.current || searchText == '') {
      return;
    }
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(searchText, function (result, status) {
      // 정상적으로 검색이 완료됐으면 
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(parseFloat(result[0].y), parseFloat(result[0].x)); // 검색된 위치 
        mapRef.current!.panTo(coords); // 지도 이동 
      }
    });
  }

  useEffect(function () { // css 스타일 적용  
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
          margin-left: 25px;
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

  useEffect(() => { // 초기값 설정 
    let timerId = setInterval(() => {
      if (!!mapRef.current) {
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
  useEffect(function () { // 행정동 카페 데이터 요청 저장 
    stores_m.current = [];
    if (!mapRef.current) {
      return;
    }
    else if (clickName == '') {
      return;
    }
    try {
      fetch("http://127.0.0.1:8000/data/dong/?dong=" + clickName) // 카페 데이터 요청 
        .then((res) => { return res.json(); })
        .then((res) => {
          let len = res.length;
          let key_id = 0;
          for (let i of res) {
            let obj: any = {} // 카페 데이터
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
                image: {
                  src: formImg1,
                  size: {width: 50, height: 50},
                  options: {
                    offset: {x:25, y:25}
                  }
                },
                onClick: (ev) => { // 카페 세팅 SWOT 띄우기 
                  const E: any = ev;
                  setClickSName(i.name);
                  setClick_m(true);
                },
                onMouseOver: (ev) => { // 카페 이름 띄우기 
                  const E: any = ev;
                  let el = document.createElement("div");
                  el.className = "info-1";
                  el.innerHTML = `${i.name}`;
                  E.a.appendChild(el);
                },
                onMouseOut: (ev) => { // 띄운 카페 이름 지우기 
                  const E: any = ev;
                  for (let c of E.a.children) {
                    if (c.className == 'info-1') {
                      E.a.removeChild(c);
                    }
                  }
                }
              },
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

  useEffect(function () { // 상권 데이터 요청 저장 
    stores_m.current = [];
    if (!mapRef.current) {
      return;
    }
    else if (clickName1 == '') {
      setGetCheck('');
      return;
    }
    setGetCheck(clickName1);
    try {
      fetch("http://127.0.0.1:8000/data/market/?commercial_code=" + clickCode1) // 상권 데이터 요청 
        .then((res) => { return res.json(); })
        .then((res) => {
          sangData.current = res;
          setGoRender((m) => (!m));
        })
        .catch((res) => { console.error(res) })
    }
    catch {
    }
  }, [clickCode1]);

  useEffect(function () { // 상권 추천 데이터 저장 
    if (!!mk_obj.current.sang[0]) {
      let rList: any = [];
      for (let i of mk_obj.current.sang) {
        i.select_c = false;
        for (let j of rSang) {
          if (i.code == j["Commercial_Code"]) {
            i.select_c = true;
            let obj: any = {
              dong: i.dong, // 상권 행정동 
              gu: i.gu, // 상권 행정구 
              code: i.code, // 상권 코드 
              cate: i.cate, // 상권 종류 
              name: i.name, // 상권 이름 
              cname: i.cname, // 상권 코드 
              position: i.customOverlay.props.position // 상권 위치 
            }
            rList.push(obj);
            break;
          }
        }
      }
      
      setRSang_(rList);
    }
    setGoRender((m) => (!m));
  }, [rSang]);

  useEffect(function () { // 상권 데이터 요처 저장 
      stores_m.current = [];
      if (!mapRef.current) {
        return;
      }
      else if (clickName1 == '') {
        setGetCheck('');
        return;
      }
      const fetchData = async () => {
          setGetCheck(clickName1);
          try {
              const response = await fetch('http://127.0.0.1:8000/data/sang1/?commercial_code='+clickCode1); // 상권 데이터 요청 
              const data = await response.json();
              setFetchedData(data); // 상권 데이터 저장 
          } catch (error) {
              console.error("Failed to fetch data:", error);
          }
      };
      fetchData();
  }, [clickCode1]);

  useEffect(function () { // 상권 데이터 요청 저장 
    stores_m.current = [];
    if (!mapRef.current) {
      return;
    }
    else if (clickName1 == '') {
      setGetCheck('');
      return;
    }
    const fetchData = async () => {
        setGetCheck(clickName1);
        try {
            const response = await fetch('http://127.0.0.1:8000/data/sang2/?commercial_code='+clickCode1); // 상권 데이터 요청 
            const data = await response.json();
            setFetchedData2(data); // 상권 데이터 저장 
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };
    fetchData();
}, [clickCode1]);

  return (
    <>
      {
      }
      <div id="mymap">
        { // 상권 분석 창 
          mode_m == 0 &&
          <InterfaceWin code={clickCode1} getCheck={getCheck} data={sangData.current} data1={fetchedData} data2={fetchedData2}></InterfaceWin>
        }
        <Tabs isFitted variant='soft-rounded' // 상권분석 / 가게분석 전환 
          pos={"absolute"} left={"20px"} top={"5px"}
          zIndex={"15"}
          h={"100%"}
        >
          <TabList gap={"5px"} w={"400px"} h={"60px"}>
            <Tab bg={"#EDF2F7"} boxShadow={"xs"} fontFamily={'KCC-Ganpan'}
              fontSize={"28px"}
              _selected={{
                bg: "#4A5568",
                color: "white"
              }}
              onClick={() => {
                setClick_m(true);
                setMode_m(0) // 상권분석으로 전환 
                setClickName('');
                clickDong({ currentTarget: { id: "" } });
              }}
            >
              상권분석
            </Tab>
            <Tab bg={"#EDF2F7"} boxShadow={"xs"} fontFamily={'KCC-Ganpan'}
              fontSize={"28px"}
              _selected={{
                bg: "#4A5568",
                color: "white"
              }}
              onClick={() => {
                setClick_m(false);
                setMode_m(1); // 가게분석으로 전환 
                setClickName1('');
                clickSang({ currentTarget: { id: "" } });
              }}
            >
              가게분석
            </Tab>
          </TabList>
          {
            click_m &&
            <TabPanels h={"100%"}>
              <TabPanel w={"400px"} bg={"white"} h={"85%"} mt={"10px"}
                borderRadius={"20px"}
                boxShadow={"0px 0px 15px -5px #4A5568"}
                overflowY={"auto"}
              >
                { // 추천 상권 창 
                  rSang.length > 0 ?
                    (
                      <div className="shortcut-win">
                        <div className="c-btn f-font">
                          추천상권
                          <CloseIcon position={"relative"} left={"calc(100% - 125px)"} bottom={"10px"}
                            cursor={"pointer"}
                            onClick={(ev) => {
                              setRSang([]);
                            }}
                          >

                          </CloseIcon>
                        </div>
                        {
                          rSang_.map((n: any, i: any) => {
                            return <Shortcut key={n.name} setName={setClickName1} setCode={setClickCode1} data={n} map={mapRef} mk_obj={mk_obj}></Shortcut>
                          })
                        }
                      </div>
                    ) :
                    (<MyForm setData={setRSang} setCheck={setGetCheck}></MyForm>)
                }
              </TabPanel>
              <TabPanel w={"500px"} h={"500px"} mt={"10px"}
                borderRadius={"20px"}
                boxShadow={"0px 0px 15px -5px #4A5568"}
                overflowY={"auto"}
              >
                { // 행정동 카페 SWOT 창 
                  stores_m.current.map((n: any, i: any) => {
                    return clickSName == n.name && <MySwot key={i} data={n}></MySwot>
                  })
                }
              </TabPanel>
            </TabPanels>
          }
        </Tabs>
        <HStack id="" position={"absolute"} zIndex={"10"} top={"20px"} left={"50%"} transform={"translate(-50%, 0)"}>
          <Center id="" bg="rgb(29, 40, 44, 0.7)" borderRadius={"50px"}>
            {/* 지도 현재위치 텍스트 창 */}
            <Text id="cl" color="white" fontWeight={"bold"} m={"10px"} pl={"5px"} pr={"5px"}>
            </Text>
          </Center>
          <form id="search_form" action="" onSubmit={handleSubmit}>
            {/* 지도 검색 창 */}
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
          center={{ lng: 126.99049375019212, lat: 37.55267434584237 }}
          style={{
            // 지도의 크기
            width: "100%",
            height: "100%",
          }}
          level={10} // 지도의 확대 레벨
          maxLevel={11}
          onZoomChanged={(qqq) => setLevel(qqq.getLevel())}
          ref={mapRef}
          onCreate={() => { }}
        >
          {(mode_m == 1 && level < 6) && mk_obj.current.dong.map(function (n: any, i: any) {
            // 지도 행정동 마커 
            return n && (n.customOverlay);
          })
          }
          {
            (mode_m == 1 && mk_obj.current.dong) && mk_obj.current.dong.map(function (n: any, i: any) {
              // 지도 행정동 경계면 
              return (n.click_c || n.hover_c) && n.polygon;
            })
          }
          { 
            (mode_m == 1 && clickName != '' && level < 6) && stores_m.current.map((n: any, i: any) => {
              // 카페 마커 
              return n.marker;
            })
          }
          { //
            (mode_m == 1 && level < 9 && level > 5) && mk_obj.current.gu.map(function (n: any, i: any) {
              // 지도 행정구 마커 
              return n && n.customOverlay;
            })
          }
          {
            (mode_m == 1 && level > 8) && mk_obj.current.sido.map(function (n: any, i: any) {
              // 지도 행정시도 마커 
              return n && n.customOverlay;
            })
          }

          {
            (mode_m == 0 && mk_obj.current.sang && level < 5) && mk_obj.current.sang.map(function (n: any, i: any) {
              // 지도 상권 마커 
              return n.customOverlay;
            })
          }
          {
            (mode_m == 0 && mk_obj.current.sang) && mk_obj.current.sang.map(function (n: any, i: any) {
              // 지도 추천 상권 경계면 
              return (n.select_c && (n.polygon1.map((n: any, i: any) => { return n })));
            })
          }
          {
            (mode_m == 0 && mk_obj.current.sang) && mk_obj.current.sang.map(function (n: any, i: any) {
              // 지도 상권 경계면 
              return (n.click_c && (n.polygon.map((n: any, i: any) => { return n })));
            })
          }
          {
            (mode_m == 0 && mk_obj.current.sDong && level < 7 && level > 4) && mk_obj.current.sDong.map(function (n: any, i: any) {
              // 지도 상권 행정동 마커 
              return n.customOverlay;
            })
          }
          {
            (mode_m == 0 && mk_obj.current.sGu && level < 9 && level > 6) && mk_obj.current.sGu.map(function (n: any, i: any) {
              // 지도 상권 행정구 마커 
              return n.customOverlay;
            })
          }
          {
            (mode_m == 0 && mk_obj.current.sSido && level > 8) && mk_obj.current.sSido.map(function (n: any, i: any) {
              // 지도 상권 행정시도 마커 
              return n.customOverlay;
            })
          }
        </Map>

      </div>
    </>
  )
}
