import React from "react";
import "../../assets/css/productdetail/ReviewSummaryDetail.css";

const ReviewSummaryDetail = ({ averageRating, totalReviews, reviewStats }) => {
  return (
    <div className="review-summary-detail">
      <div className="summary-left">
        <div className="review-score">{averageRating.toFixed(1)}</div>
        <div className="review-text">{totalReviews}명의 구매자가 리뷰를 남겼어요!</div>
      </div>
      <div className="summary-right">
        {reviewStats.map((item, index) => (
          <div key={index} className="review-bar">
            <span className="label">{item.label}</span>
            <div className="bar">
              <div className="filled" style={{ width: `${item.percentage}%` }}></div>
            </div>
            <span className="count">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummaryDetail;
