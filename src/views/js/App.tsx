import React, { useEffect, useState } from "react";
// import Screen from "./screen";
import { Route, Routes, useLocation } from "react-router-dom";
import io from "socket.io-client";
import Header from "../../../utils/Components/header";
import Nav from "../../../utils/Components/nav";
import AccountScreen from "./account/accountScreen";
import MainScreen from "./mainPage/mainScreen";
import StationScreen from "./station/station";
const socket = io('http://localhost:8080');
// socket.on("stockDataUpdate", (stockData : {})=> {
//   console.log("이건 서버로 부터 받아온 주식 데이터 : " + stockData);
// })
export default () => {
  const location = useLocation();
  const [pageTitle, setPageTtle] = useState("호옴");
  const [stockData, setStockData] = useState(null);
  useEffect(() => {
    // URL 변화에 따라 pageTitle 상태를 업데이트함.
    switch (location.pathname) {
      case "/home":
        setPageTtle("홈");
        break;
      case "/account":
        setPageTtle("계좌");
        break;
      case "/station":
        setPageTtle("정류장");
        break;
      default:
        setPageTtle("홈");
        break;
    }
  }, [location.pathname]); // location.pathname이 바뀔 때마다 실행된다.
  // const [title, setTitle] = useState("홈");
  // const changeTitle = () => {
  //   setTitle("다른 페이지");
  // };
  // useEffect(() => {
  //   const url = useParams();
  // });
  useEffect(()=> {
    socket.on("stockDataUpdate", stockData => {
      setStockData(stockData);
    })
  })
  return
    <>
      <div className="container">
        <Header title={pageTitle} />
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route path="/home" element={<MainScreen />} />
          <Route path="/station" element={<StationScreen />} />
          <Route path="/account" element={<AccountScreen />} />
          <div> stockData={stockData}</div>
        </Routes>
        <Nav />
      </div>
    </>
};
