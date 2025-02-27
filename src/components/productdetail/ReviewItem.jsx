import { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/css/productdetail/ReviewItem.css";

// 쿠키 설정 함수 (JSON 객체 형태로 여러 개의 값을 저장)
const setCookie = (name, value, days = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  const existingCookie = getCookie(name);
  const updatedCookie = { ...existingCookie, ...value };
  document.cookie = `${name}=${JSON.stringify(updatedCookie)};expires=${expires.toUTCString()};path=/`;
};

// 쿠키 가져오기 함수 (JSON 객체 형태로 가져옴)
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const [cookieName, cookieValue] = cookies[i].split("=");
    if (cookieName === name) {
      try {
        return JSON.parse(cookieValue);
      } catch (error) {
        return {};
      }
    }
  }
  return {};
};

// 문자열 마스킹
const hideUserId = (user_id) => {
  const visiblePart = user_id.substring(0, 4);
  const hiddenPart = "***";
  return `${visiblePart}${hiddenPart}`;
};

const ReviewItem = ({ review, product_id }) => {
  const { review_id, user_id, created_at, review_text, rating, review_like, images } = review;
  const cookieData = getCookie("reviewActions");
  const [liked, setLiked] = useState(cookieData[`liked_${review_id}`] || false);
  const [reported, setReported] = useState(cookieData[`reported_${review_id}`] || false);

  useEffect(() => {
    // 쿠키 데이터가 없으면 빈 객체를 반환하고 상태 초기화
    const cookieData = getCookie("reviewActions");
    setLiked(cookieData[`liked_${review_id}`] || false);
    setReported(cookieData[`reported_${review_id}`] || false);
  }, [review_id]);

  const handleLikeClick = async () => {
    if (liked) return;
    try {
      const response = await axios.put(`http://localhost:8080/reviews/${review_id}/like`);
      if (response.data.message === "success") {
        setLiked(true);
        setCookie("reviewActions", { [`liked_${review_id}`]: true }, 7);
  
      // 좋아요 요청 성공 후 페이지 새로고침
      window.location.reload();
    }
    } catch (error) {
      console.error("❌ 좋아요 오류:", error);
    }
  };
  

  const handleReportClick = async (event) => {
    event.stopPropagation(); // 클릭 이벤트 전파 방지
    if (reported) return;

    try {
      const response = await axios.post(`http://localhost:8080/reviews/${user_id || "guest"}`);
      
      if (response.data.message === "success") {
        setReported(true);
        setCookie("reviewActions", { [`reported_${review_id}`]: true }, 7);
      }
    } catch (error) {
      console.error("❌ 신고 오류:", error);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="stars-container">
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? "filled-star" : "empty-star"}>★</span>
          ))}
        </div>
        <span className="review-like-count">👍 {review_like}명</span>
      </div>
    );
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-user">{hideUserId(user_id)}</span>
        <span className="review-date">{created_at}</span>
        {renderStars(rating)}
      </div>

      <p className="review-text">{review_text}</p>

      {images && images.length > 0 && (
        <div className="review-images">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`리뷰 이미지 ${index + 1}`} className="review-image" />
          ))}
        </div>
      )}

      <div className="review-actions">
        <button className="like-button" onClick={handleLikeClick} disabled={liked}>
          {liked ? "✅ 완료" : "👍 좋아요"}
        </button>
        <button className="report-button" onClick={handleReportClick} disabled={reported}>
          {reported ? "🚨 신고 완료" : "🚨 신고하기"}
        </button>
      </div>
    </div>
  );
};

export default ReviewItem;
