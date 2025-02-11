import React, { useState, useEffect } from "react";

const ReviewItem = ({ review }) => {
  const [likes, setLikes] = useState(review.likes || 0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likedReviews")) || {};
    if (storedLikes[review.id]) {
      setLiked(true);
    }
  }, [review.id]);

  const handleLike = () => {
    const storedLikes = JSON.parse(localStorage.getItem("likedReviews")) || {};

    if (liked) {
      setLikes(prev => prev - 1);
      delete storedLikes[review.id]; // 좋아요 취소
    } else {
      setLikes(prev => prev + 1);
      storedLikes[review.id] = true; // 좋아요 저장
    }

    localStorage.setItem("likedReviews", JSON.stringify(storedLikes));
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
    </div>
  );
};

export default ReviewItem;
