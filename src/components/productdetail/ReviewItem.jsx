import { useState } from "react";
import ReportModal from "../../modals/productsdetail/ReportModal";
import "../../assets/css/productdetail/ReviewItem.css";

const ReviewItem = ({ review }) => {
  const [likes, setLikes] = useState(review.likes || 0);
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 좋아요 버튼 핸들러
  const handleLike = () => {
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
    setLiked((prev) => !prev);
  };

  // 신고 버튼 클릭 핸들러
  const handleReportClick = (event) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-user">{review.user}</span>
        <span className="review-date">{review.date}</span>
      </div>

      <p className="review-text">{review.comment}</p>

      {review.photos && review.photos.length > 0 && (
        <div className="review-photos">
          {review.photos.slice(0, 5).map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`리뷰 사진 ${index + 1}`}
              className="review-photo"
            />
          ))}
        </div>
      )}

      <div className="review-actions">
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          👍 {likes}
        </button>
        <button className="report-button" onClick={handleReportClick}>
          🚨 신고하기
        </button>
      </div>

      {isModalOpen && (
        <ReportModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          review={review}
        />
      )}
    </div>
  );
};

export default ReviewItem;
