import React, { useState } from "react";
import ReportModal from "./ReportModal";
import "../../assets/css/productdetail/ReviewItem.css"

const ReviewItem = ({ review }) => {
  const [likes, setLikes] = useState(review.likes || 0);
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleLike = () => {
    setLikes(prev => (liked ? prev - 1 : prev + 1));
    setLiked(prev => !prev);
  };


  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-user">{review.user}</span>
        <span className="review-date">({review.date})</span>
      </div>

      <p>{review.comment}</p>
      {review.photo && <img src={review.photo} alt="리뷰 사진" className="review-photo" />}

      <div className="review-actions">
        <button className={`like-button ${liked ? "liked" : ""}`} onClick={handleLike}>
          👍 {likes}
        </button>
      </div>

      {/* 🚨 신고하기 버튼 */}
      <button className="report-button" onClick={() => setIsModalOpen(true)}>🚨 신고하기</button>
      {/* 신고 모달 */}
      {isModalOpen && (
        <ReportModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          review={review} 
        />
      )}
    </div>
  );
};

export default ReviewItem;
