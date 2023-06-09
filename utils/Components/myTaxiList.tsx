import React, { useEffect, useState } from "react";
import "../../src/views/css/myTaxiListCss.css";
import { getCookie } from "./cookie";

const MyTaxiList = (): JSX.Element => {
  const [myTaxiData, setMyTaxiData] = useState<any[]>([]);
  useEffect(() => {
    console.log(decodeURIComponent(getCookie("userName")))
    fetch(`/myTaxiData?userName=${decodeURIComponent(getCookie("userName"))}`)
      .then((response) => response.json())
      .then((data) => {
        setMyTaxiData(data);
      })
      .catch((error) => {
        // 오류 처리
        console.error("정류장 데이터를 가져오는데 실패 :", error);
      });
  }, []);

  const refreshData = () => {
    fetch("/myTaxiData")
      .then((response) => response.json())
      .then((data) => {
        setMyTaxiData(data);
      });
  };

  return (
    <>
      <div className="main">
        {myTaxiData ? (
          // 데이터가 존재하는 경우에만 접근
          myTaxiData.map((data: any, index: number) => (
            <div key={index} className="myTaxiListCss">
              {/* 데이터 활용 */}
              <div id="stocks">{data["stocks"]}</div>
              {/* 택시 고유 번호 */}
              <div>{data["taxiId"]}</div>
              {/* 출발 희망가 */}
              <div id="purchasePrice">{data["purchasePrice"]}</div>
              {/* 구매량 */}
              <div className="commonFontSize">{data["stockAmount"]}</div>
              {/* 목표가 */}
              <div className="commonFontSize" style={{ color: "#008000" }}>
                {data["targetPrice"]}
              </div>
              {/* 폭파 희망가 */}
              <div className="commonFontSize" style={{ color: "#C1121F" }}>
                {data["stopLossPrice"]}
              </div>
              {/* 동승자 모집 기간 */}
              <div className="commonFontSize">{data["recruitmentPeriod"]}</div>
              {/* 최대 인원 */}
              <div>{data["maxPerson"]}</div>
            </div>
          ))
        ) : (
          // 데이터가 없는 경우에 대한 처리
          <p>Loading...</p>
        )}
        <div>
          <button onClick={refreshData}>새로고침</button>
        </div>
      </div>
    </>
  );
};
export default MyTaxiList;
