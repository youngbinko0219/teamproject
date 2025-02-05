import React from "react";
import ReviewItem from "./ReviewItem";
import "./style/ReviewList.css";

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      {reviews.map((review, index) => (
        <ReviewItem key={index} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
