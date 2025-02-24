import { useState } from "react";
import axios from "axios";
import useReviewStore from "../../hooks/useReviewStore";
import "../../assets/css/productdetail/ReviewItem.css";

// 쿠키 설정 함수 (유지 기간: 7일)
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// 쿠키 가져오기 함수
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) return cookieValue;
  }
  return null;
};


const ReviewItem = ({ review }) => {
  const { review_id, user_id, rating, created_at, review_text, reportCount = 0 } = review;  

  // 쿠키에서 신고 여부 확인 (쿠키가 있으면 신고된 상태)
  const [reported, setReported] = useState(getCookie(`reported_${review_id}`) === "true");

  const [likes, setLikes] = useState(review.likes || 0);
  const [liked, setLiked] = useState(false);


  // 좋아요 버튼 핸들러
  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  // 신고 버튼 클릭 핸들러
  const handleReportClick = async (event) => {
    event.stopPropagation();

    if (reported) return; // 이미 신고한 경우 실행 안 함

    try {
      const response = await axios.post(`http://localhost:8080/reviews/${user_id || "guest"}`);

      if (response.data.message === "success") {
        setCookie(`reported_${review_id}`, "true", 7); // 7일 동안 신고 유지
        setReported(true);
      }
    } catch (error) {
      console.error("신고 오류:", error);
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
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          👍 {likes}
        </button>
        <button className="report-button" onClick={handleReportClick} disabled={reported}>
          {reported ? "🚨 신고 완료" : "🚨 신고하기"}
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
