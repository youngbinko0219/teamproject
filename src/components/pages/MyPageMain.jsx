import React, { useState, useEffect } from "react";
import "../style/MyPageMainStyle.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import axios from "axios";
import useUserStore from "../../zustand/useUserStore";
import Point from "./point.jsx";

console.log(Point);

/* 사용자 정보 출력*/
const LoginSection = () => {
  const { user_id, userInfo } = useUserStore();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/${user_id}`
        );
        //정보 가져오고 저장
        setUserInfo("받은 데이터:", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setUserInfo(response.data[0]); // 첫 번째 요소를 저장
        } else {
          setUserInfo(null); // 데이터가 없을 경우 null 처리
        }
        console.log(response.data);
      } catch (error) {
        console.error("회원 정보 불러오기 오류:", error);
        setUserInfo(null); // 오류 발생 시 null 처리
      }
    };

    if (user_id) {
      fetchUserInfo();
    }
  }, [user_id]); // user_id 변경될 때마다 실행

  return (
    <div className="member-info-container">
      <h2 className="login-title">회원 정보</h2>
      <div className="member-info-content">
        {userInfo ? (
          <>
            <p>이름: {userInfo.user_name}</p>
            <p>성별: {userInfo.user_gender}</p>
            <p>가입일: {userInfo.created_at}</p>
          </>
        ) : (
          <p>회원 정보를 불러오는 중...</p>
        )}
      </div>
      <div className="button-container">
        <Link to="/edit">
          <button className="button">계정 관리</button>
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
  const [points, setPoints] = useState(null); // 포인트 상태 관리

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user/point");
        setPoints(response.data); // 포인트 데이터 업데이트
      } catch (error) {
        console.error("포인트 불러오기 오류:", error);
      }
    };

    fetchPoints();
  }, []);

  return (
    <div className="page-container">
      <Sidebar />
      <div className="dashboard">
        <div className="dashboard-content">
          <h1 className="profile-title">마이페이지</h1>
          <div className="info-container">
            <LoginSection />
            <div className="point-info-container">
              {/* 포인트와 회원 등급을 전달 */}
              {points ? (
                <Point points={points.points} userGrade={points.userGrade} />
              ) : (
                <p>포인트 정보를 불러오는 중...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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
