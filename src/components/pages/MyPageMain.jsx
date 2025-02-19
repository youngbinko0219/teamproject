import React, { useEffect, useState } from "react";
import "../style/MyPageMainStyle.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";
import useUserStore from "../../zustand/useUserStore";

const LoginSection = () => {
  const [userInfo, setUserInfo] = useState({
    user_id: "",         
    user_pw: "",         
    user_name: "",       
    user_email: "",      
    user_phone: "",      
    user_addr1: "",      
    user_addr2: "",      
    user_addr3: "",      
    user_gender: "",     
    user_birth: "",      
    created_at: "",      
    points: 0,           
    provider: "",        
  }); 
  const {user_id} = useUserStore();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${user_id}`);
        const {message, ...data} = response.data;
        if (message === "success") {
          setUserInfo(data);
        } else {
          console.error("회원 정보 불러오기 실패:", data.error);
        }
      } catch (error) {
        console.error("회원 정보 불러오기 오류:", error);
      }
    };
    if (user_id) fetchUserInfo();
  }, []);

  return (
<div className="login-section">
      <h2 className="login-title">회원 정보</h2>
      <div className="login-box">
        <div className="login-info">
          <div className="login-icon" />
        </div>
        <div className="login-text">
          {userInfo ? (
            <>
              <span>이름 : {userInfo.user_name}</span><br />
              <span>성별 : {userInfo.user_gender}</span><br />
              <span>가입일 : {userInfo.created_at}</span><br />
              <span>포인트 : {userInfo.points} P</span><br />
              <span>회원 등급 : {userInfo.provider}</span>
            </>
          ) : (
            <p>회원 정보를 불러오는 중...</p>
          )}
        </div>
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
            <span className="rental-date">2024-10-24</span>
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
            <span className="rental-date">2024-10-24</span>
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
