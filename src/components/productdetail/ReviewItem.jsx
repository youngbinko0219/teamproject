import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/productdetail/ReviewItem.css";

// 쿠키 설정 함수 (JSON 객체 형태로 여러 개의 값을 저장)
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  // 기존 쿠키 값을 가져와서 업데이트
  const existingCookie = getCookie(name);
  const updatedCookie = { ...existingCookie, ...value };
  // 쿠키 저장
  document.cookie = `${name}=${JSON.stringify(updatedCookie)};expires=${expires.toUTCString()};path=/`;
};

// 쿠키 가져오기 함수 (JSON 객체 형태로 가져옴)
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      try {
        return JSON.parse(cookieValue); // 문자열 → JSON 객체 변환
      } catch (error) {
        return {}; // 오류 발생 시 빈 객체 반환
      }
    }
  }
  return {}; // 쿠키가 없으면 빈 객체 반환
};

const ReviewItem = ({ review }) => {
  const { review_id, user_id, created_at, review_text } = review;

  // 쿠키에서 좋아요 & 신고 상태 확인
  const cookieData = getCookie("reviewActions");
  const [liked, setLiked] = useState(cookieData[`liked_${review_id}`] || false);
  const [reported, setReported] = useState(cookieData[`reported_${review_id}`] || false);

  // `useEffect`에서 쿠키를 다시 확인하여 업데이트
  useEffect(() => {
    const cookieData = getCookie("reviewActions");
    setLiked(cookieData[`liked_${review_id}`] || false);
    setReported(cookieData[`reported_${review_id}`] || false);
  }, [review_id]);

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = async () => {
    event.stopPropagation();
    
    if (liked) return; 

    try {
      const response = await axios.put(`http://localhost:8080/reviews/${review_id}/like`);

      if (response.data.message === "success") {
        setLiked(true);
        setCookie("reviewActions", { [`liked_${review_id}`]: true }, 7); // JSON 형태로 저장
      }
    } catch (error) {
      console.error("❌ 좋아요 오류:", error);
    }
  };

  // 신고 버튼 클릭 핸들러
  const handleReportClick = async (event) => {
    event.stopPropagation();

    if (reported) return; 

    try {
      const response = await axios.post(`http://localhost:8080/reviews/${user_id || "guest"}`);

      if (response.data.message === "success") {
        setReported(true);
        setCookie("reviewActions", { [`reported_${review_id}`]: true }, 7); // JSON 형태로 저장
      }
    } catch (error) {
      console.error("❌ 신고 오류:", error);
    }
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-user">{user_id}</span>
        <span className="review-date">{created_at}</span>
      </div>

      <p className="review-text">{review_text}</p>

      <div className="review-actions">
        <button className="like-button"
          onClick={handleLikeClick}
          disabled={liked}>
          {liked ? "✅ 완료" : "👍 좋아요"}
        </button>
        <button className="report-button" 
          onClick={handleReportClick} 
          disabled={reported}>
          {reported ? "🚨 신고 완료" : "🚨 신고하기"}
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
