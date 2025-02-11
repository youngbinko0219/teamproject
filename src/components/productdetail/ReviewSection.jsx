import React, { useState, useEffect } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewItem from "./ReviewItem";
import ReviewFormModal from "./ReviewFormModal"; 
import { reviews as initialReviews } from "./reviewData";

const ReviewSection = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [sortType, setSortType] = useState("helpful");
  const [photoOnly, setPhotoOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviewsPerPage = 5;
  const groupSize = 5; // ✅ 한 번에 보여줄 페이지 개수

  const addReview = (newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
    setSortType("latest");
    setCurrentPage(1);
    setIsModalOpen(false);
  };

  const filteredReviews = reviews.filter(review => !photoOnly || review.photo !== null);
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return sortType === "helpful" ? b.likes - a.likes : new Date(b.date) - new Date(a.date);
  });

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage) || 1;
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);

  // ✅ 현재 페이지 그룹 계산
  const currentGroup = Math.ceil(currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  return (
    <div className="review-section">
      <ReviewSummary reviews={reviews} />

      <button className="write-review-button" onClick={() => setIsModalOpen(true)}>
        ✍️ 리뷰 작성하기
      </button>

      <div className="review-controls">
        <button className={sortType === "helpful" ? "active" : ""} onClick={() => { setSortType("helpful"); setCurrentPage(1); }}>
          도움순
        </button>
        <button className={sortType === "latest" ? "active" : ""} onClick={() => { setSortType("latest"); setCurrentPage(1); }}>
          최신순
        </button>

        <label>
          <input type="checkbox" checked={photoOnly} onChange={() => setPhotoOnly(prev => !prev)} />
          포토리뷰
        </label>
      </div>

      <div className="review-list">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map(review => <ReviewItem key={review.id} review={review} />)
        ) : (
          <p>포토리뷰가 없습니다.</p>
        )}
      </div>

      {/* ✅ 5개 단위 페이지네이션 이동 */}
      <div className="pagination">
        {/* 🔹 "이전" 버튼: 이전 그룹으로 이동 */}
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - groupSize, 1))} 
          disabled={currentPage === 1}
        >
          이전
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          if (pageNumber >= startPage && pageNumber <= endPage) {
            return (
              <button key={pageNumber} className={currentPage === pageNumber ? "active" : ""}
                onClick={() => setCurrentPage(pageNumber)}>
                {pageNumber}
              </button>
            );
          }
          return null;
        })}

        {/* 🔹 "다음" 버튼: 다음 그룹으로 이동 */}
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + groupSize, totalPages))} 
          disabled={currentPage >= totalPages}
        >
          다음
        </button>
      </div>

      {isModalOpen && (
        <ReviewFormModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          addReview={addReview}
        />
      )}
    </div>
  );
};

export default ReviewSection;
