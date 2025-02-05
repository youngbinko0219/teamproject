import React from "react";
import "./style/ReviewCount.css";

const ReviewCount = ({ count }) => {
  return <span className="review-count">({count} Reviews)</span>;
};

export default ReviewCount;
