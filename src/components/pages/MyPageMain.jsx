import React, { useEffect, useState } from "react";
import "../style/MyPageMainStyle.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const LoginSection = () => {
  const [setUserInfo] = useState(null); // 사용자 정보 상태 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기
        const response = await axios.get("http://localhost:5173/auth/userinfo", {
          headers: { Authorization: `Bearer ${token}` }, // 헤더에 토큰 추가
        });
        setUserInfo(response.data); // 사용자 정보 저장
      } catch (error) {
        console.error("회원 정보 불러오기 오류:", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="login-section">
      <h2 className="login-title">회원 정보</h2>
      <div className="login-box">
        {/* 왼쪽 정렬된 사용자 정보 */}
        <div className="login-info">
          <div className="login-icon" />
        </div>
        <div className="login-text">
          <span>김철수</span>
          <br />
          <small>kim7su</small>
        </div>

        {/* 오른쪽 정렬된 계정 관리 버튼 */}
        <Link to="/edit">
          <button className="login-button">계정 관리</button>
        </Link>
      </div>
    </div>
  );
};

const RentalHistory = () => {
  return (
    <div className="rental-history">
      <h2 className="section-title">대여 내역</h2>
      <div className="rental-list">
        <div className="rental-item">
          <div className="rental-thumbnail">
            <img
              src="src/assets/car-seat.png"
              alt="카시트"
              className="thumbnail-image"
            />
          </div>
          <div className="rental-text">
            <span className="rental-title">카시트</span>
            <span className="rental-description">카시트</span>
            <span className="rental-date">10 Oct 24</span>
          </div>
        </div>
        <div className="rental-item">
          <div className="rental-thumbnail">
            <img
              src="src/assets/stroller.png"
              alt="유모차"
              className="thumbnail-image"
            />
          </div>
          <div className="rental-text">
            <span className="rental-title">유모차</span>
            <span className="rental-description">유모차</span>
            <span className="rental-date">10 Oct 24</span>
          </div>
        </div>
      </div>
      <Link to="/rental">
        <button className="more-button">더보기</button>
      </Link>
    </div>
  );
};

const Dashboard = () => {
  return (
    <>
      <div className="page-container">
        <Sidebar />
        <div className="dashboard">
          <div className="dashboard-content">
            <h1 className="profile-title">마이페이지</h1>
            <LoginSection />
            <RentalHistory />
          </div>
        </div>
      </div>
    </>
  );
};

function MyPageMain() {
  return (
    <>
      <Dashboard />
      {/* <Sidebar /> */}
    </>
  );
}

export default MyPageMain;
