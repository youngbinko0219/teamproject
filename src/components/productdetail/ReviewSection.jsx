import React, { useState } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewItem from "./ReviewItem";  // ✅ 오타 수정됨
import { reviews } from "./reviewData";

const ReviewSection = () => {
  const [sortType, setSortType] = useState("helpful"); // 기본값: 도움순
  const [photoOnly, setPhotoOnly] = useState(false); // 기본값: 모든 리뷰 표시

  // 정렬된 리뷰 데이터 만들기
  const sortedReviews = [...reviews]
    .filter(review => (photoOnly ? review.photo : true)) // ✅ `review.image` → `review.photo`
    .sort((a, b) => {
      if (sortType === "helpful") {
        return b.likes - a.likes; // ✅ 좋아요 많은 순 정렬
      } else {
        return new Date(b.date) - new Date(a.date); // ✅ 최신순 정렬
      }
    });

  return (
    <div className="review-section">
      {/* ⭐ 리뷰 요약 */}
      <ReviewSummary />

      {/* 📌 정렬 & 필터 버튼 */}
      <div className="review-controls">
        <button 
          className={sortType === "helpful" ? "active" : ""}
          onClick={() => setSortType("helpful")}
        >
          도움순
        </button>
        <button 
          className={sortType === "latest" ? "active" : ""}
          onClick={() => setSortType("latest")}
        >
          최신순
        </button>

        {/* ✅ 포토리뷰 필터 (토글 버튼) */}
        <label>
          <input 
            type="checkbox"
            checked={photoOnly}
            onChange={() => setPhotoOnly(prev => !prev)}
          />
          포토리뷰
        </label>
      </div>

      {/* 📌 리뷰 목록 출력 */}
      <div className="review-list">
        {sortedReviews.map((review, index) => ( // ✅ `review.id` 대신 `index` 사용
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
