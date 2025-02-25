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

const ReviewItem = ({ review, product_id, updateReviewLikes }) => {
  const { review_id, user_id, created_at, review_text, rating, review_like, review_images } = review;
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
    if (liked) return; // 이미 좋아요를 눌렀으면 아무 일도 하지 않음

    try {
      // UI에서 먼저 좋아요 수를 1 증가시킴
      updateReviewLikes(review_id, review_like + 1);

      const response = await axios.put(`http://localhost:8080/reviews/${review_id}/like`);
      
      if (response.data.message === "success") {
        setLiked(true);
        setCookie("reviewActions", { [`liked_${review_id}`]: true }, 7);
      } else {
        // 좋아요 업데이트 실패 시 UI에서 변경된 값 롤백
        updateReviewLikes(review_id, review_like);
        toast.error("좋아요 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("❌ 좋아요 오류:", error);
      updateReviewLikes(review_id, review_like); // 오류 발생 시 원래 값으로 롤백
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

      {review_images && review_images.length > 0 && (
        <div className="review-images">
          {review_images.map((image, index) => (
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
