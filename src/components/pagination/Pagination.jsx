import React from "react";
import "../../assets/css/header/SearchResults.css"; // 필요한 CSS를 임포트하거나, 별도 파일로 관리

const Pagination = ({
  currentPage,
  totalPages,
  pageNumbers,
  startPage,
  endPage,
  itemsPerPage,
  handlePageClick,
  handlePrevGroup,
  handleNextGroup,
  handleItemsPerPageChange,
}) => {
  return (
    <div className="pagination-container">
      {/* 이전 그룹으로 이동 */}
      {startPage > 1 && (
        <button className="prev-group" onClick={handlePrevGroup}>
          &laquo; 이전
        </button>
      )}

      {/* 페이지 번호 버튼 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={page === currentPage ? "active" : ""}
        >
          {page}
        </button>
      ))}

      {/* 다음 그룹으로 이동 */}
      {endPage < totalPages && (
        <button className="next-group" onClick={handleNextGroup}>
          다음 &raquo;
        </button>
      )}

      {/* 페이지당 아이템 수 선택 */}
      <select
        value={itemsPerPage}
        onChange={(e) => handleItemsPerPageChange(e.target.value)}
      >
        <option value={5}>5개</option>
        <option value={10}>10개</option>
        <option value={20}>20개</option>
      </select>
    </div>
  );
};

export default Pagination;
