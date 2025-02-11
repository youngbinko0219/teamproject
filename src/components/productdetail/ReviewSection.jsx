import React, { useState, useEffect } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewItem from "./ReviewItem";
import { reviews } from "./reviewData";

const ReviewSection = () => {
  const [sortType, setSortType] = useState("helpful"); // 기본값: 도움순
  const [photoOnly, setPhotoOnly] = useState(false); // 기본값: 모든 리뷰 표시
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 추가
  const reviewsPerPage = 5; // 페이지당 리뷰 개수

  // 포토리뷰 필터 적용
  const filteredReviews = reviews.filter(review => !photoOnly || review.photo !== null);

  // 정렬 적용
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortType === "helpful") {
      return b.likes - a.likes; // 좋아요 순 정렬
    } else {
      return new Date(b.date) - new Date(a.date); // 최신순 정렬
    }
  });

  // 총 페이지 수 계산
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage) || 1; // 최소 1페이지 유지

  // 현재 페이지가 totalPages보다 크면 자동으로 1페이지로 이동 (무한 루프 방지)
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages)); // 🔥 한 번만 실행되도록 수정!
    }
  }, [photoOnly, sortType, totalPages]);

  // 현재 페이지에서 5개씩 자르기
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage);

  // 현재 페이지 그룹 계산 (5개 단위)
  const groupSize = 5; // 한 번에 보여줄 페이지 개수
  const currentGroup = Math.ceil(currentPage / groupSize); // 현재 그룹 계산
  const startPage = (currentGroup - 1) * groupSize + 1; // 그룹 시작 페이지
  const endPage = Math.min(startPage + groupSize - 1, totalPages); // 그룹 끝 페이지

  return (
    <div className="review-section">
      {/* 리뷰 요약 */}
      <ReviewSummary />

      {/* 정렬 & 필터 버튼 */}
      <div className="review-controls">
        <button 
          className={sortType === "helpful" ? "active" : ""}
          onClick={() => setSortType("helpful")}
        >
          도움순
        </button>
        <button 
          className={sortType === "latest" ? "active" : ""}
          onClick={() => setSortType("latest")}
        >
          최신순
        </button>

        {/* 포토리뷰 필터 (토글 버튼) */}
        <label>
          <input 
            type="checkbox"
            checked={photoOnly}
            onChange={() => {
              setPhotoOnly(prev => !prev);
              setCurrentPage(1); // 필터 변경 시 첫 페이지로 이동
            }}
          />
          포토리뷰
        </label>
      </div>

      {/* 리뷰 목록 출력 */}
      <div className="review-list">
        {paginatedReviews.length > 0 ? (
          paginatedReviews.map(review => <ReviewItem key={review.id} review={review} />)
        ) : (
          <p>포토리뷰가 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 UI 수정 (5개 단위 그룹) */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          이전
        </button>

        {/* 5개 단위 페이지 그룹 계산 */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          if (pageNumber >= startPage && pageNumber <= endPage) {
            return (
              <button 
                key={pageNumber} 
                className={currentPage === pageNumber ? "active" : ""}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          }
          return null; // 범위 밖이면 표시 안 함
        })}

        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
