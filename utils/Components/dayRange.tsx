import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import stockContext from "../../src/views/js/stockContext";
const testArray :any = [];

const DayRange = (): JSX.Element => {
  const [lastdata, setLastdata] = useState("");
  const dayRangeContext = useContext<any>(stockContext);
  if (dayRangeContext === null) {
    return <div>Loading...</div>; // 데이터가 null인 동안 로딩 상태를 표시
  }
  let Lastdata : any = []
  useEffect(()=> {

//   if(dayRangeContext) {
//     //! 전날 데이터 요청에 사용하기 위해 데이터 가공
  const groupedData : any = _.groupBy(dayRangeContext, 'symbol')
  console.log(groupedData)
  Object.values(groupedData).map((data :any)=> {
    console.log(data)
    const dataIng = data[0].price[1]['1. open'];
    let formattedDate : any;

   try {
    let today = data[0].price[0];
    let dateOnly = today.split(" ")[0];
    let noHyphen = dateOnly.split("-");
    formattedDate = noHyphen.join("");
   } catch (err) {
    console.log("데이터 안왔옹")
   };
  function test() {
      
    fetch(`/yesterDayDataRequest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // fetch 요청에 23230612과 같은식으로 보내야 함
      body: JSON.stringify({ stockName: data[0].symbol, day: formattedDate }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("POST 요청이 실패했습니다.");
      }
    })
    .then((data) => {
      // setLastdata(data[0]["open"]);
      console.log(data[0]["open"])
      Lastdata(data[0]["open"])
    })
    .catch((error) => {
      console.error(error);
    });

    const initialValue: any = Lastdata;
    console.log(initialValue)
    const finalValue = parseFloat(dataIng);
    const increasePercent = ((finalValue - initialValue) / initialValue) * 100;
    const roundedIncreasePercent = Math.round(increasePercent * 100) / 100;
    console.log(roundedIncreasePercent, "해결?")
    testArray.push(roundedIncreasePercent)
    console.log(testArray)
    return testArray;
  }
  })
  // const initialValue: any = lastdata;
  // const finalValue = parseFloat(dataIng);
//   // 가격
//   Object.values(groupedData).map((data : any)=> {
//     const dataIng = data[0].price[1]['1. open'];
//   // 초기 값
//   // parseInt() 함수를 사용하여 문자열을 정수로 변환
//   const initialValue: any = lastdata;
//   // 최종 값
//   // parseFloat() 함수를 사용하여 문자열을 부동 소수점 숫자로 변환
//   const finalValue = parseFloat(dataIng);
//   // 증가율 계산
//   const increasePercent = ((finalValue - initialValue) / initialValue) * 100;
//   // 소수 둘째 자리까지 반올림
//   const roundedIncreasePercent = Math.round(increasePercent * 100) / 100;
//   let today = data[0].price[0];
//   let dateOnly = today.split(" ")[0];
//   let noHyphen = dateOnly.split("-");
//   let formattedDate = noHyphen.join("");
//   fetch(`/yesterDayDataRequest`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     // fetch 요청에 23230612과 같은식으로 보내야 함
//     body: JSON.stringify({ stockName: data[0].symbol, day: formattedDate }),
//   })
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         throw new Error("POST 요청이 실패했습니다.");
//       }
//     })
//     .then((data) => {
//       setLastdata(data[0]["open"]);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   });
// }
  }, [dayRangeContext]);
  
  return (
    <div className="stockInfo">
      <div className="stockSymbol">{}</div>
      <div className="stockChangeRate">
        {/* {roundedIncreasePercent.toFixed(2)} % */}
      </div>
    </div>
  );
};

export default DayRange;
