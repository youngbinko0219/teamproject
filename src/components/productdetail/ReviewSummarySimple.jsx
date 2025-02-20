import React from "react";
import "../../assets/css/productdetail/ReviewSummarySimple.css";

const ReviewSummarySimple = ({ averageRating, totalReviews }) => {
  const roundedRating = Math.round(averageRating); // ⭐ 반올림하여 정수 처리

  return (
    <div className="review-summary-simple">
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < roundedRating ? "filled-star" : "empty-star"}>
            ★
          </span>
        ))}
      </div>
      <span className="review-count">({totalReviews} Reviews)</span>
    </div>
  );
};

export default ReviewSummarySimple;