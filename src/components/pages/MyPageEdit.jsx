import React, { useState } from "react";
import "../Style/MyPageEditStyle.css";
import axios from "axios";

function MyPageEdit() {
  // 상태를 관리하기 위한 useState 훅 사용
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // 폼 제출 이벤트 핸들러
  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    // 폼 제출 로직을 여기에 작성
    console.log({ username, email, password, phone });
  };

  const handleSendUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/info{user_id}"
      );

      if (response.status === 200) {
        const data = response.data; // 응답 데이터 가져오기

        if (data.message === "success") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("code", data.code);
        } else {
          alert("이메일 인증에 실패했습니다.");
        }

        setIsVerificationSent(true); // 인증 메일 발송 상태 업데이트
      }
    } catch (error) {
      console.error("이메일 인증 오류:", error);
      alert("이메일 인증 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <h1>계정 설정</h1>
      <form className="account-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">사용자 이름</label>
          <input
            type="text"
            id="username"
            placeholder="사용자 이름을 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">전화번호</label>
          <input
            type="tel"
            id="phone"
            placeholder="전화번호를 입력하세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <button type="submit">저장</button>
      </form>
    </div>
  );
}

export default MyPageEdit;
