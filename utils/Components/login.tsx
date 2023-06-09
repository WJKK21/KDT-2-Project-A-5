import React, { useState } from "react";
import "../../src/views/css/style";
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("제출 확인");
    e.preventDefault();
  
    const data = {
      userId: email,
      password: password,
    };

    fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("POST 요청이 실패했습니다.");
        }
      })
      .then((data) => {
        console.log(data); // 서버의 응답을 출력하거나 원하는 작업을 수행합니다.
        if(data === true){
          console.log('data =', data); // 서버의 응답을 출력하거나 원하는 작업을 수행합니다.
          navigate('/home');
        }
        else{
          alert('로그인 실패')
        }
      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <>
      <div className="main">
        <form onSubmit={handleSubmit}>
          <input
            name="userId"
            type="email"
            placeholder="이메일"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={handleChangePassword}
          />
          <button type="submit">로그인</button>
        </form>
      </div>
    </>
  );
}
