import _ from "lodash";
import React, { useContext, useMemo, useState } from "react";
import stockContext from "../../src/views/js/stockContext";

interface DayRangeProps {
  stockSymbol: string;

}

const TestData = ({ stockSymbol }: DayRangeProps): JSX.Element | null => {

  const [lastdata, setLastdata] = useState("");
  const dayRangeContext = useContext<any>(stockContext);
  if (dayRangeContext === null) {
    return <div>Loading...</div>; // 데이터가 null인 동안 로딩 상태를 표시
  }
  if (stockSymbol === 'AAPL') {

    //! 전날 데이터 요청에 사용하기 위해 데이터 가공
    const groupedData: any = _.groupBy(dayRangeContext, 'symbol')
    // 가격

    const dataIng = groupedData[stockSymbol][0].price[1]['1. open'];
  
  
    // 초기 값
    // parseInt() 함수를 사용하여 문자열을 정수로 변환
    const initialValue: any = lastdata;
    // 최종 값
    // parseFloat() 함수를 사용하여 문자열을 부동 소수점 숫자로 변환
    const finalValue = parseFloat(dataIng);
    // 증가율 계산
    const increasePercent = ((finalValue - initialValue) / initialValue) * 100;
    // 소수 둘째 자리까지 반올림
    const roundedIncreasePercent = Math.round(increasePercent * 100) / 100;
    
    let today = groupedData[stockSymbol][0].price[0];
    let dateOnly = today.split(" ")[0];
    let noHyphen = dateOnly.split("-");
    let formattedDate = noHyphen.join("");
    fetch(`/yesterDayDataRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // fetch 요청에 23230612과 같은식으로 보내야 함
      body: JSON.stringify({ stockName: groupedData[stockSymbol][0].symbol, day: formattedDate }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("POST 요청이 실패했습니다.");
        }
      })
      .then((data) => {
        setLastdata(data[0]["open"]);
      })
      .catch((error) => {
        console.error(error);
      });


    return (
      <div>
        {roundedIncreasePercent.toFixed(2)} %
      </div>


    );
  }
  else if (stockSymbol === 'TSLA') {

    //! 전날 데이터 요청에 사용하기 위해 데이터 가공
    const groupedData: any = _.groupBy(dayRangeContext, 'symbol')
    // 가격

    const dataIng = groupedData[stockSymbol][0].price[1]['1. open'];
    
   
    // 초기 값
    // parseInt() 함수를 사용하여 문자열을 정수로 변환
    const initialValue: any = lastdata;
    // 최종 값
    // parseFloat() 함수를 사용하여 문자열을 부동 소수점 숫자로 변환
    const finalValue = parseFloat(dataIng);
    // 증가율 계산
    const increasePercent = ((finalValue - initialValue) / initialValue) * 100;
    // 소수 둘째 자리까지 반올림
    const roundedIncreasePercent = Math.round(increasePercent * 100) / 100;
   
    let today = groupedData[stockSymbol][0].price[0];
    let dateOnly = today.split(" ")[0];
    let noHyphen = dateOnly.split("-");
    let formattedDate = noHyphen.join("");
    fetch(`/yesterDayDataRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // fetch 요청에 23230612과 같은식으로 보내야 함
      body: JSON.stringify({ stockName: groupedData[stockSymbol][0].symbol, day: formattedDate }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("POST 요청이 실패했습니다.");
        }
      })
      .then((data) => {
        setLastdata(data[0]["open"]);
      })
      .catch((error) => {
        console.error(error);
      });
    return (
      <div>
        {roundedIncreasePercent.toFixed(2)} %
      </div>

    );
  }
  else if (stockSymbol === 'AMZN') {

    //! 전날 데이터 요청에 사용하기 위해 데이터 가공
    const groupedData: any = _.groupBy(dayRangeContext, 'symbol')
    // 가격

    const dataIng = groupedData[stockSymbol][0].price[1]['1. open'];
    

    // 초기 값
    // parseInt() 함수를 사용하여 문자열을 정수로 변환
    const initialValue: any = lastdata;
    // 최종 값
    // parseFloat() 함수를 사용하여 문자열을 부동 소수점 숫자로 변환
    const finalValue = parseFloat(dataIng);
    // 증가율 계산
    const increasePercent = ((finalValue - initialValue) / initialValue) * 100;
    // 소수 둘째 자리까지 반올림
    const roundedIncreasePercent = Math.round(increasePercent * 100) / 100;
   
    let today = groupedData[stockSymbol][0].price[0];
    let dateOnly = today.split(" ")[0];
    let noHyphen = dateOnly.split("-");
    let formattedDate = noHyphen.join("");
    fetch(`/yesterDayDataRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // fetch 요청에 23230612과 같은식으로 보내야 함
      body: JSON.stringify({ stockName: groupedData[stockSymbol][0].symbol, day: formattedDate }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("POST 요청이 실패했습니다.");
        }
      })
      .then((data) => {
        setLastdata(data[0]["open"]);
      })
      .catch((error) => {
        console.error(error);
      });


    return (
      <div>
        {roundedIncreasePercent.toFixed(2)} %
      </div>


    );
  }
  return (
    <div>

    </div>

  );
};

export default TestData;
