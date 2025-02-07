import React, { useState } from "react";
import "../Style/MyPageEditStyle.css";

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
