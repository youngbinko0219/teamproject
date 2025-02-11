import React from "react";
import "../../assets/css/pages/Style/MyPageMainStyle.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-text">개인 정보</span>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-text">대여 내역 조회</span>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-text">찜 목록</span>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-text">물품 상태 체크</span>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-text">상품 회수 서비스</span>
      </div>
    </div>
  );
};

const LoginSection = () => {
  return (
    <div className="login-section">
      <h2 className="login-title">회원 정보</h2>
      <div className="login-box">
        {/* 왼쪽 정렬된 사용자 정보 */}
        <div className="login-info">
          <div className="login-icon" />  
        </div>
        <div className="login-text">
        <span>가나디</span><br />
        <small>ID</small>
        </div>

        {/* 오른쪽 정렬된 계정 관리 버튼 */}
        <button className="login-button">계정 관리</button>
      </div>
    </div>
  );
};

const GradeSection = () => {
  return (
    <div className="login-section">
      <h2 className="login-title">회원 등급</h2>
      <div className="login-box">
        <div className="login-icon" />
        <span className="login-text">등급</span>
        <button className="login-button">계정 관리</button>
      </div>
    </div>
  );
};

const RentalHistory = () => {
  return (
    <div className="rental-history">
      <h2 className="section-title">대여 내역</h2>
      <div className="rental-item">
        <div className="rental-thumbnail" />
        <div className="rental-details">
          <span className="rental-name">카시트</span>
          <span className="rental-date">10 Oct 21, by Jane Ostin</span>
        </div>
      </div>
      <div className="rental-item">
        <div className="rental-thumbnail" />
        <div className="rental-details">
          <span className="rental-name">유모차</span>
          <span className="rental-date">10 Oct 21, by Jane Ostin</span>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1 className="profile-title">마이페이지</h1>
        <LoginSection />
        <RentalHistory />
      </div>
    </div>
  );
};

function MyPageMain() {
  return (
    <>
      <Sidebar />
      <LoginSection />
      <GradeSection />
      <RentalHistory />
      <Dashboard />
      {/* <Sidebar /> */}
    </>
  );
}

export default MyPageMain;
