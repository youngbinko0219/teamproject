import React from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewList from "./ReviewList";
import ReviewFilter from "./ReviewFilter";
import Pagination from "./Pagination";
import "../../assets/css/productdetail/ReviewSection.css";

const ReviewSection = () => {
  return (
    <div className="review-section">
      <ReviewSummary />
      <ReviewFilter />
      <ReviewList />
      <Pagination />
    </div>
  );
};

export default ReviewSection;