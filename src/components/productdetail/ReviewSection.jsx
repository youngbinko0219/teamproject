import { useState, useEffect } from "react";
import useProductStore from "../../hooks/useProductStore";
import useReviewStore from "../../hooks/useReviewStore";
import axios from "axios";
import ReviewSummary from "./ReviewSummary";
import ReviewItem from "./ReviewItem";
import ReviewFormModal from "../../modals/productsdetail/ReviewFormModal";
import "../../assets/css/productdetail/ReviewSection.css";

const ReviewSection = () => {
  const { product_id } = useProductStore();
  const { reviews, setReviews } = useReviewStore();

  const [filters, setFilters] = useState({
    sortType: "helpful",
    photoOnly: false,
    currentPage: 1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviewsPerPage = 5;
  const groupSize = 5;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reviews/${product_id}/list`);
        setReviews(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("❌ 리뷰 데이터 불러오기 실패:", error);
      }
    };

    if (product_id) loadReviews();
  }, [product_id, setReviews]);  // product_id가 변경될 때마다 실행

  // 리뷰 추가 (API 호출)
  const addReview = async (reviewData) => {
    try {
      const newReview = await axios.post(`/products/${product_id}/reviews`, reviewData);
      setReviews((prevReviews) => [newReview.data, ...prevReviews]);
      setFilters({ sortType: "latest", photoOnly: false, currentPage: 1 });
      setIsModalOpen(false);
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
    }
  };

  /* 필터링 및 정렬 */
  const filteredReviews = reviews.filter(
    (review) => parseInt(review.product_id) === parseInt(product_id)
  );

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    return filters.sortType === "helpful"
      ? b.likes - a.likes
      : new Date(b.created_at) - new Date(a.created_at);
  });

  /* 페이지네이션 계산 */
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage) || 1;
  const startIndex = (filters.currentPage - 1) * reviewsPerPage;
  const paginatedReviews = sortedReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );
  const currentGroup = Math.ceil(filters.currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  // 현재 페이지가 totalPages를 초과하면 마지막 페이지로 조정
  useEffect(() => {
    if (filters.currentPage > totalPages) {
      setFilters((prev) => ({ ...prev, currentPage: totalPages }));
    }
  }, [totalPages, filters.currentPage]);

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
            onClick={() =>
              setFilters({ ...filters, sortType: "helpful", currentPage: 1 })
            }
          >
            도움순
          </button>
          <button
            className={filters.sortType === "latest" ? "active" : ""}
            onClick={() =>
              setFilters({ ...filters, sortType: "latest", currentPage: 1 })
            }
          >
            최신순
          </button>
          <label>
            <input
              type="checkbox"
              checked={filters.photoOnly}
              onChange={() =>
                setFilters({
                  ...filters,
                  photoOnly: !filters.photoOnly,
                  currentPage: 1,
                })
              }
            />
            포토리뷰
          </label>
        </div>

        <div className="review-controls-right">
          <button
            className="write-review-button"
            onClick={() => setIsModalOpen(true)}
          >
            리뷰 작성하기
          </button>
        </div>
      </div>

      {/* 리뷰 목록 */}
      <div className="review-list">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map((review) => (
            <ReviewItem key={review.review_id} review={review} />
          ))
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        {/* "이전" 버튼 */}
        <button
          onClick={() =>
            setFilters({
              ...filters,
              currentPage: Math.max(filters.currentPage - groupSize, 1),
            })
          }
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
                onClick={() =>
                  setFilters({ ...filters, currentPage: pageNumber })
                }
              >
                {pageNumber}
              </button>
            );
          }
          return null;
        })}

        {/* "다음" 버튼 */}
        <button
          onClick={() =>
            setFilters({
              ...filters,
              currentPage: Math.min(
                filters.currentPage + groupSize,
                totalPages
              ),
            })
          }
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
