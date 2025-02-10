import React from "react";
import "../../assets/css/productdetail/ReviewList.css";

const reviews = [
  {
    id: 1,
    user: "qw***12",
    date: "2025-01-01",
    rating: 5,
    text: "아기용 프리미엄 다기능 점퍼루 매우 만족합니다.",
    helpful: 87,
    images: ["/images/review1.jpg", "/images/review2.jpg"],
  },
  {
    id: 2,
    user: "kk***34",
    date: "2025-01-02",
    rating: 4,
    text: "기능도 좋고 튼튼해서 만족합니다!",
    helpful: 43,
    images: ["/images/review3.jpg"],
  },
];

const ReviewList = () => {
  return (
    <div className="review-list">
      {reviews.map((review) => (
        <div key={review.id} className="review-item">
          <div className="review-header">
            <span className="username">{review.user}</span>
            <span className="date">{review.date}</span>
          </div>
          <div className="review-rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} className={index < review.rating ? "star filled" : "star"}>★</span>
            ))}
          </div>
          <div className="review-text">{review.text}</div>
          <div className="review-images">
            {review.images.map((img, index) => (
              <img key={index} src={img} alt="리뷰 이미지" className="review-image" />
            ))}
          </div>
          <div className="review-actions">
            <button className="helpful-btn">이 리뷰가 도움이 돼요 {review.helpful}</button>
            <button className="report-btn">신고하기</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
