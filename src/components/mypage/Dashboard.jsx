// src/components/mypage/Dashboard.jsx
import { useState, useEffect } from "react";
import axios from "axios";  // axios import
import { Link } from "react-router-dom";
import Point from "./Grade";
import "../../assets/css/mypage/Dashboard.css";
import MyPageLayout from "./MyPageLayout";
import RentalHistory from "./RentalHistory";
import LoginSection from "./LoginSection";  // 로그인 섹션 import
import useUserStore from "../../hooks/useUserStore";  // zustand import

const Dashboard = () => {
  const { userInfo, setPointsAndGrade, points, grade_name } = useUserStore();  // useUserStore에서 상태 가져오기
  const [loading, setLoading] = useState(true);  // 로딩 상태 추가

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");  // user_id는 예시로 로컬 스토리지에서 가져옴

    const getUserGradeAndPoints = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/${user_id}/grade`);
        const data = response.data;

        setPointsAndGrade(data.points, data.grade_name);  // 상태 업데이트
      } catch (error) {
        console.error("API 호출 오류:", error);
      } finally {
        setLoading(false);  // 데이터 로딩이 끝나면 로딩 상태 종료
      }
    };

    getUserGradeAndPoints();  // API 호출
  }, [setPointsAndGrade]);  // 컴포넌트가 처음 렌더링될 때만 호출

  if (loading) {
    return <p>로딩 중...</p>;  // 로딩 중일 때 메시지 표시
  }

  return (
    <MyPageLayout>
      <div className="mypage-page-container">
        <div className="mypage-dashboard">
          <div className="mypage-dashboard-content">
            <h1 className="mypage-profile-title">마이페이지</h1>

            <div className="mypage-info-container">
              <LoginSection />  {/* 로그인 섹션을 여전히 유지 */}
              <div className="mypage-point-info-container">
                <div className="point-container">
                  <h2 className="mypage-point-title">적립금 및 회원 등급</h2>
                  <div className="point-content">
                    <p>적립금: {points} 점</p>  {/* points 상태 출력 */}
                    <p>회원 등급: {grade_name}</p>  {/* grade_name 상태 출력 */}
                    <Link to="/mypage/grade"
                      style={{
                        textDecoration: "none",
                      }}
                      className="grade-detail-link mypage-edit-button">
                      자세히 보기
                    </Link>
                  </div>
                </div>
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
