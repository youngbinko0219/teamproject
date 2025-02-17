import React, { useState } from "react";
import "../Style/MyPageEditStyle.css";
import axios from "axios";
import Sidebar from "./Sidebar";

function MyPageEdit() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(""); // 아이디 추가
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState(""); // 새로운 비밀번호 추가
  const [phone, setPhone] = useState("");
  const [postalCode, setPostalCode] = useState(""); // 우편번호 추가
  const [address, setAddress] = useState(""); // 주소 추가
  const [detailAddress, setDetailAddress] = useState(""); // 상세 주소 추가
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5173/auth/update", {
        username,
        userId,
        password,
        newPassword,
        phone,
        postalCode,
        address,
        detailAddress,
      });

      if (response.status === 200) {
        alert("정보가 성공적으로 업데이트되었습니다.");
      } else {
        setError("업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("업데이트 오류:", error);
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="mypage-edit-layout">
      <Sidebar />
      <div className="mypage-content">
        <div className="account-settings">
          <h1>계정 정보 수정</h1>
          <form className="account-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">이름</label>
              <input
                type="text"
                id="username"
                placeholder="이름을 입력하세요."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="userId">아이디</label>
              <input
                type="text"
                id="userId"
                placeholder="아이디를 입력하세요."
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input
                type="password"
                id="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">새로운 비밀번호</label>
              <input
                type="password"
                id="newPassword"
                placeholder="새로운 비밀번호를 입력하세요."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">전화번호</label>
              <input
                type="tel"
                id="phone"
                placeholder="전화번호를 입력하세요."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="postalCode">우편번호</label>
              <input
                type="text"
                id="postalCode"
                placeholder="우편번호를 입력하세요."
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">주소</label>
              <input
                type="text"
                id="address"
                placeholder="주소를 입력하세요."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="detailAddress">상세 주소</label>
              <input
                type="text"
                id="detailAddress"
                placeholder="상세 주소를 입력하세요."
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
              />
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit">저장</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MyPageEdit;
