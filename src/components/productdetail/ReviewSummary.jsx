import React from "react";
import "../../assets/css/productdetail/ReviewSummary.css";

const ReviewSummary = ({ averageRating, totalReviews }) => {
  return (
    <div className="review-summary">
      <div className="stars">
        {"★".repeat(Math.floor(averageRating))}
        {averageRating % 1 !== 0 && "☆"} {/* 0.5점 반영 */}
      </div>
      <span className="review-count">({totalReviews} Reviews)</span>
    </div>
  );
};

export default ReviewSummary;