import React from "react";
import "../../assets/css/productdetail/ReviewFilter.css";

const ReviewFilter = () => {
  return (
    <div className="review-filter">
      <button className="filter-btn active">도움순</button>
      <button className="filter-btn">최신순</button>
      <button className="write-review-btn">리뷰 작성하기</button>
    </div>
  );
};

export default ReviewFilter;
