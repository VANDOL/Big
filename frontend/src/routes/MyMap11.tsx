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
import { Box, Center, Input, Button, IconButton, VStack, HStack, Text, Tabs, TabList, Tab, TabPanels, TabPanel, } from '@chakra-ui/react'
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { isVisible } from "@testing-library/user-event/dist/utils";
import MyForm from "../components/MyForm";
import MySwot from "../components/Swot";
import { createImportSpecifier } from "typescript";

export default function MyMap1() {
  useKakaoLoader()
  const [level, setLevel] = useState(3);
  const [click_m, setClick_m] = useState(false);
  const [over_m, setOver_m] = useState(false);
  const [mode_m, setMode_m] = useState(0);
  const [goRender, setGoRender] = useState(false);
  const mapRef = useRef<kakao.maps.Map>(null);
  const [clickName, setClickName] = useState("");
  const [clickSName, setClickSName] = useState("");

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
  const stores: any = {};
  stores["사직동"] = data4;

  useEffect(() => {

  }, [click_m, level])

  function clickDong(ev: any) {
    let check = false;
    for (let i of mk_obj.current.dong) {
      if (i.name == ev.currentTarget.id) {
        i.click_c = false;
        check = true;
        let coords = new kakao.maps.LatLng(parseFloat(i.customOverlay.props.position["lat"]), parseFloat(i.customOverlay.props.position["lng"]));
        // mapRef.current?.panTo()

        if (mapRef.current?.getLevel()! > 4) {
          mapRef.current?.setLevel(4);
        }
        mapRef.current?.panTo(coords);
        // mapRef.current?.setCenter(coords);
        setClickName(i.name);
      }
      else {
        i.click_c = false;
        try {


        }
        catch {

        }
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
        if (i.click_c) {
          // i.click_c = false;
          // setClickName('');
        }
        else {
          i.click_c = true;
          check = true;
          // setClickName(i.name);
        }
      }
      else {
        i.click_c = false;
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
      i.click_c = false;
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
        click_c: false
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
        click_c: false
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

          setClickName('');
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
          // mapRef.current?.setCenter(coords);
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
    setClick_m((m: boolean) => {
      return check;
    });
  }

  function makeSang(hello: any) {
    let key_id = 1;
    for (let i of hello["features"]) {
      let code = i["properties"]["TRDAR_CD"];
      let name = i["properties"]["TRDAR_CD_N"];
      let p_1 = 0;
      let p_2 = 0;
      let p_count = 0;
      let m_path = [];
      for (let p of i["geometry"]["coordinates"][0]) {
        p_1 = p_1 + p[1];
        p_2 = p_2 + p[0];
        p_count = p_count + 1;
        m_path.push({ lat: p[1], lng: p[0] });
      }

      let content = React.createElement(
        "div",
        { className: "mk-1", id: name, onClick: clickSang },
        React.createElement("div", { className: "mk-2", onClick: null }, name)
      );
      let CustomOverlay = React.createElement(CustomOverlayMap, { position: { lat: p_1 / p_count, lng: p_2 / p_count }, key: key_id }, content);
      let polygon = React.createElement(
        Polygon,
        {
          path: m_path, strokeWeight: 2,
          strokeColor: "#C53030", strokeOpacity: 0.7,
          strokeStyle: "solid", fillColor: true ? "#FC8181" : "#A2FF99",
          fillOpacity: true ? 0.5 : 0.7, key: key_id
        },
        null);
      let m_obj = {
        name: name,
        sang: name,
        code: code,
        customOverlay: CustomOverlay,
        // customOverlay: null,
        polygon: polygon,
        click_c: false
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
        // ::-webkit-scrollbar {
        //   display: none;
        // }
        .swot_table {
          width: 100%;
          // border-collapse: unset;
          //border-collapse: initial;
          border: none;
        }
        .swot_info {
          width: 100%;
          min-height: 100px;
          height:100px;
          border: 1px solid black;
          border-radius: 20px;
          // background-color: white;
          // box-shadow: 0px 1px 4px -2px;
          // margin-bottom: 10px;
          // margin-top: 10px;
          // display: flex;
        }
        
        .swot_img {
          width: 50px;
          height: 50px;
          // border: 1px solid black;
        }
        .swot_txt {
          // border: 1px solid black;
          
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
        .di {
          width: 200px;
          height: 200px;
          border: 1px solid black;
        }
        .qqq {
          width: 100px;
          height: 100px;
          border: 1px solid black;
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
      fetch("http://127.0.0.1:8000/data/dong/?dong="+ clickName)
      .then((res)=>{return res.json();})
      .then((res)=>{
        let len = res.length;
        console.log(len)
        let key_id = 0;
        for(let i of res) {
          let obj:any = {}
          obj["name"] = i.name;
          obj["s"] = i["s"];
          obj["w"] = i["w"];
          obj["o"] = i["o"];
          obj["t"] = i["t"];
          obj["marker"] = React.createElement(
            MapMarker,
            {
              key: key_id++,
              position: { lat: parseFloat(i["lat"]), lng: parseFloat(i["lng"])},
              onClick: (ev) => {
                const E: any = ev;
                setClickSName(i.name);
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
      .catch((res)=>{console.error(res)})
    }
    catch {

    }
  }, [clickName]);

  useEffect(function () {
    console.log(clickSName);
  }, [clickSName]);


  return (
    <>
      <div id="mymap">
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
                setMode_m(0)
                setClickName('');
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
                  stores_m.current.map((n:any, i:any)=>{
                    return clickSName == n.name && <MySwot key={"1"} data={n}></MySwot>
                  })
                }
              </TabPanel>
              <TabPanel w={"400px"} bg={"white"} h={"85%"} mt={"10px"}
                borderRadius={"20px"}
                boxShadow={"0px 0px 15px -5px #4A5568"}
                overflowY={"auto"}
              >
                <MyForm></MyForm>
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

              return n.click_c && n.polygon;
            })
          }
          {//swot
            (mode_m == 0 && clickName != '' && level < 6) && stores_m.current.map((n:any, i:any)=>{
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

              return n.click_c && n.polygon;
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
