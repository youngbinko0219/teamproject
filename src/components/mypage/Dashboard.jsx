// src/components/mypage/Dashboard.jsx
import { useState, useEffect } from "react";
import { fetchUserPoints } from "../../services/useService";
import LoginSection from "./LoginSection";
import Point from "./Point";
import "../../assets/css/mypage/Dashboard.css";
import MyPageLayout from "./MyPageLayout";
import RentalHistory from "./RentalHistory";

const Dashboard = () => {
  const [points, setPoints] = useState(null);

  useEffect(() => {
    const getPoints = async () => {
      try {
        const data = await fetchUserPoints();
        setPoints(data);
      } catch (error) {
        console.error("포인트 불러오기 오류:", error);
      }
    };

    getPoints();
  }, []);

  return (
    <MyPageLayout>
      <div className="mypage-page-container">
        <div className="mypage-dashboard">
          <div className="mypage-dashboard-content">
            <h1 className="mypage-profile-title">마이페이지</h1>
            <div className="mypage-info-container">
              <LoginSection />
              <div className="mypage-point-info-container">
                {points ? (
                  <Point points={points.points} userGrade={points.userGrade} />
                ) : (
                  <p>포인트 정보를 불러오는 중...</p>
                )}
              </div>
            </div>
            <RentalHistory />
          </div>
        </div>
      </div>
    </MyPageLayout>
  );
};

export default Dashboard;
