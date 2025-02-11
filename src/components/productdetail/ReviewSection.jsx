import React, { useState, useEffect } from "react";
import ReviewSummary from "./ReviewSummary";
import ReviewItem from "./ReviewItem";
import { reviews } from "./reviewData";

const ReviewSection = () => {
  // 리뷰 정렬 상태: 기본값은 도움순
  const [sortType, setSortType] = useState("helpful");
  // 포토리뷰 필터 상태: 기본값은 모든 리뷰 표시
  const [photoOnly, setPhotoOnly] = useState(false);
  // 현재 페이지 상태: 기본값은 첫 페이지 (1)
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // 페이지당 리뷰 개수 설정

  // 포토리뷰 필터 적용: photoOnly가 true일 때만 사진이 있는 리뷰를 필터링
  const filteredReviews = reviews.filter(review => !photoOnly || review.photo !== null);

  // 정렬 적용: sortType에 따라 좋아요 순 혹은 최신순으로 정렬
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortType === "helpful") {
      return b.likes - a.likes; // 좋아요 순으로 정렬
    } else {
      return new Date(b.date) - new Date(a.date); // 최신순으로 정렬
    }
  });

  // 총 페이지 수 계산: 총 리뷰 개수 % 페이지당 리뷰 개수로 계산
  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage) || 1;

  // 정렬 버튼 클릭 시 첫 페이지로 이동
  const handleSortChange = (newSortType) => {
    setSortType(newSortType); // 정렬 방식 변경
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로 이동
  };
  
  // 현재 페이지에서 보여줄 리뷰 자르기
  const startIndex = (currentPage - 1) * reviewsPerPage; // 시작 인덱스 계산
  const paginatedReviews = sortedReviews.slice(startIndex, startIndex + reviewsPerPage); // 현재 페이지에 맞는 리뷰만 선택

  // 페이지 그룹 계산 (5개 단위로 그룹화)
  const groupSize = 5; // 한 번에 보여줄 페이지 개수
  const currentGroup = Math.ceil(currentPage / groupSize); // 현재 그룹 번호 계산
  const startPage = (currentGroup - 1) * groupSize + 1; // 그룹의 첫 페이지
  const endPage = Math.min(startPage + groupSize - 1, totalPages); // 그룹의 마지막 페이지

  return (
    <div className="review-section">
      {/* 리뷰 요약 컴포넌트 */}
      <ReviewSummary />

      {/* 정렬 및 필터 버튼 */}
      <div className="review-controls">
        <button 
          className={sortType === "helpful" ? "active" : ""} // 도움순 정렬 버튼
          onClick={() => handleSortChange("helpful")} // 클릭 시 도움순 1페이지로 이동
        >
          도움순
        </button>
        <button 
          className={sortType === "latest" ? "active" : ""} // 최신순 정렬 버튼
          onClick={() => handleSortChange("latest")} // 클릭 시 최신순 1페이지로 이동
        >
          최신순
        </button>

        {/* 포토리뷰 필터 (체크박스) */}
        <label>
          <input 
            type="checkbox"
            checked={photoOnly} // 체크박스 상태 (포토리뷰 필터 적용 여부)
            onChange={() => {
              setPhotoOnly(prev => !prev); // 필터 변경 시 체크 상태 반전
              setCurrentPage(1); // 필터 변경 시 1페이지로 이동
            }}
          />
          포토리뷰
        </label>
      </div>

      {/* 필터 및 정렬된 리뷰 목록 출력 */}
      <div className="review-list">
        {paginatedReviews.length > 0 ? (
          // 리뷰가 있으면 ReviewItem 컴포넌트를 이용해 각각의 리뷰 표시
          paginatedReviews.map(review => <ReviewItem key={review.id} review={review} />)
        ) : (
          <p>포토리뷰가 없습니다.</p> // 포토리뷰가 없으면 이 문구 출력
        )}
      </div>

        

      {/* 페이지네이션 UI: 페이지 이동 버튼 */}
      <div className="pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          이전
        </button>

        {/* 5개 단위 페이지 그룹 표시 */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1; // 페이지 번호
          if (pageNumber >= startPage && pageNumber <= endPage) {
            return (
              <button 
                key={pageNumber} 
                className={currentPage === pageNumber ? "active" : ""} // 현재 페이지는 강조
                onClick={() => setCurrentPage(pageNumber)} // 페이지 변경
              >
                {pageNumber}
              </button>
            );
          }
          return null; // 범위 밖의 페이지는 표시하지 않음
        })}

        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          다음
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
