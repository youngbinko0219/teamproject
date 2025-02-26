import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/mypage/GradePage.css";  
import useUserStore from "../../hooks/useUserStore";  // zustand import

const Grade = () => {
  const { points, grade_name } = useUserStore();  // useUserStore에서 상태 가져오기
  const [loading, setLoading] = useState(true);  // 로딩 상태
  const [pointList, setPointList] = useState([]);

  useEffect(() => {
    const fetchPointData = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const response = await axios.get(
          `http://localhost:8080/user/${user_id}/points`
        );
        const data = response.data;
        setPointList(data.pointList);
      } catch (error) {
        console.error("적립금 조회 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPointData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grade-page-point-page">
      <h2 className="grade-page-point-title">적립금 및 회원 등급</h2>
      <div className="grade-page-point-summary">
        <div className="grade-page-point-info">
          <p>
            <strong>전체 포인트:</strong> {points} 점
          </p>
        </div>
        <div className="grade-page-point-info">
          <p>
            <strong>회원 등급:</strong> {grade_name}
          </p>
        </div>
      </div>
      <div className="grade-page-point-table-container">
        <table className="grade-page-point-table">
          <thead>
            <tr>
              <th>날짜</th>
              <th>내용</th>
              <th>적립/사용</th>
            </tr>
          </thead>
          <tbody>
            {pointList && pointList.length > 0 ? (
              pointList.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.description}</td>
                  <td>{item.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">포인트 내역이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grade;