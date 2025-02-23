import { useState } from "react";
import ReportModal from "../../modals/productsdetail/ReportModal";
import "../../assets/css/productdetail/ReviewItem.css";

const ReviewItem = ({ review }) => {
  const { review_id, rating, created_at, review_text } = review;  // 이미 review에서 가져오므로 user_id는 필요없음

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

  return (
    <div className="review-item">
      <div className="review-header">
        <span className="review-user">{review.user_id}</span> {/* 이미 review 객체 안에 있음 */}
        <span className="review-date">{created_at}</span> {/* 바로 사용 */}
      </div>

      <p className="review-text">{review_text}</p>

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
          onClose={() => setIsModalOpen(false)}  // 모달 닫는 핸들러
          review={review}
        />
      )}
    </div>
  );
};

export default ReviewItem;
