import React, { useState, useEffect } from "react"; 
import ReviewSummary from "./ReviewSummary";
import ReviewItem from "./ReviewItem";
import ReviewFormModal from "./ReviewFormModal"; 
import { fetchMockReviews } from "./mockData"; 
import "../../assets/css/productdetail/ReviewSection.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({ sortType: "helpful", photoOnly: false, currentPage: 1 });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviewsPerPage = 5;
  const groupSize = 5;

  useEffect(() => {
    const loadReviews = async () => {
      const fetchedReviews = await fetchMockReviews();
      setReviews(fetchedReviews);
    };
    loadReviews();
  }, []);

  /* ✅ 리뷰 추가 */
  const addReview = (newReview) => {
    setReviews(prevReviews => [newReview, ...prevReviews]);
    setFilters({ sortType: "latest", photoOnly: false, currentPage: 1 });
    setIsModalOpen(false);
  };

  /* ✅ 필터링 및 정렬 */
  const filteredReviews = reviews.filter(review => !filters.photoOnly || review.photo !== null);
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return filters.sortType === "helpful" ? b.likes - a.likes : new Date(b.date) - new Date(a.date);
  });

  /* ✅ 페이지네이션 계산 */
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage) || 1;
  const startIndex = (filters.currentPage - 1) * reviewsPerPage;
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);
  
  const currentGroup = Math.ceil(filters.currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  return (
    <div className="review-container">
      {/* 리뷰 통계 */}
      <div className="review-summary-container">
        <ReviewSummary reviews={reviews} />
      </div>

      {/* 정렬 버튼 + 리뷰 작성 버튼 */}
      <div className="review-controls">
        <div className="review-controls-left">
          <button 
            className={filters.sortType === "helpful" ? "active" : ""} 
            onClick={() => setFilters({ ...filters, sortType: "helpful", currentPage: 1 })}
          >
            도움순
          </button>

          <button 
            className={filters.sortType === "latest" ? "active" : ""} 
            onClick={() => setFilters({ ...filters, sortType: "latest", currentPage: 1 })}
          >
            최신순
          </button>

          <label>
            <input 
              type="checkbox" 
              checked={filters.photoOnly} 
              onChange={() => setFilters({ ...filters, photoOnly: !filters.photoOnly, currentPage: 1 })}
            />
            포토리뷰
          </label>
        </div>

        <div className="review-controls-right">
          <button className="write-review-button" onClick={() => setIsModalOpen(true)}>
            리뷰 작성하기
          </button>
        </div>
      </div>

      {/* 리뷰 목록 */}
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
          onClick={() => setFilters({ ...filters, currentPage: Math.max(filters.currentPage - groupSize, 1) })} 
          disabled={filters.currentPage === 1}
        >
          이전
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          if (pageNumber >= startPage && pageNumber <= endPage) {
            return (
              <button 
                key={pageNumber} 
                className={filters.currentPage === pageNumber ? "active" : ""}
                onClick={() => setFilters({ ...filters, currentPage: pageNumber })}
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}

        {/* 🔹 "다음" 버튼: 다음 그룹으로 이동 */}
        <button 
          onClick={() => setFilters({ ...filters, currentPage: Math.min(filters.currentPage + groupSize, totalPages) })} 
          disabled={filters.currentPage >= totalPages}
        >
          다음
        </button>
      </div>

      {/* 리뷰 작성 모달 */}
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
