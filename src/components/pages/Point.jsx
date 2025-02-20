import React, { useEffect, useState } from "react";
import "../style/PointStyle.css";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const Point = () => {
  const [points, setPoints] = useState(0);
  const [userGrade, setUserGrade] = useState("");

  useEffect(() => {
    const fetchPointData = async () => {
      try {
        const response = await fetch("http://localhost:8080/user/point");
        const data = await response.json();

        console.log("포인트 및 회원 등급 데이터:", data);

        setPoints(data.points);
        setUserGrade(data.userGrade);
      } catch (error) {
        console.error("포인트 조회 오류:", error);
      }
    };

    fetchPointData();
  }, []);

  return (
    <div className="point-page">
      <div className="point-container">
        <h2 className="point-title">적립금 및 회원 등급</h2>
        <div className="point-content">
          <p>적립금 : {points} 점</p>
          <p>회원 등급 : {userGrade}</p>
        </div>
      </div>
    </div>
  );
};

export default Point;
