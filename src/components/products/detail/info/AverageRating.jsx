import React from "react";
import "./style/AverageRating.css"; // 스타일 적용
import RatingStars from "../../common/RatingStars"; // 별점 표시 컴포넌트

const AverageRating = () => {
  const rating = 4.5; // 평균 별점 (하드코딩)
  const reviewCount = 150; // 총 리뷰 개수 (하드코딩)

  return (
    <div className="average-rating-container">
      <div className="stars-and-reviews">
        <RatingStars rating={rating} />
        <span className="review-count">({reviewCount} Reviews)</span>
      </div>
      <div className="rental-status">대여 가능</div>
    </div>
  );
};

export default AverageRating;
