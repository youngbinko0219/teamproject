// hooks/usePagination.js
import { useState } from "react";

/**
 * 배열 형태의 데이터를 받아 페이지네이션을 처리하는 훅
 * @param {Array} data - 전체 데이터
 * @param {number} defaultItemsPerPage - 기본 페이지당 아이템 수
 * @param {number} groupSize - 페이지 번호를 몇 개씩 묶어서 보여줄지
 * @returns 페이징 계산 결과와 핸들러들을 담은 객체
 */
export const usePagination = (
  data,
  defaultItemsPerPage = 10,
  groupSize = 5
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // 전체 아이템 수, 전체 페이지 수 계산
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 현재 페이지에 보여줄 데이터 슬라이스
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  // 페이지 그룹 계산(예: 5개씩 묶음)
  // currentGroup = 현재 몇 번째 그룹인지
  // startPage = 그룹의 시작 페이지, endPage = 그룹의 마지막 페이지
  const currentGroup = Math.ceil(currentPage / groupSize);
  const startPage = (currentGroup - 1) * groupSize + 1;
  const endPage = Math.min(startPage + groupSize - 1, totalPages);

  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // 페이지 변경 핸들러
  const handlePageClick = (pageNum) => {
    setCurrentPage(pageNum);
  };

  // 이전 그룹 버튼
  const handlePrevGroup = () => {
    setCurrentPage(startPage - 1);
  };

  // 다음 그룹 버튼
  const handleNextGroup = () => {
    setCurrentPage(endPage + 1);
  };

  // 페이지당 아이템 수 변경
  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // 페이지 번호 초기화
  };

  return {
    // 실제로 렌더링할 아이템
    currentItems,
    // 페이지 정보
    currentPage,
    totalPages,
    pageNumbers,
    startPage,
    endPage,
    itemsPerPage,
    // 이벤트 핸들러
    handlePageClick,
    handlePrevGroup,
    handleNextGroup,
    handleItemsPerPageChange,
  };
};
