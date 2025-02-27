import { useState } from "react";
import ProductCard from "./ProductCard";
import SortBar from "./SortBar";
import "../../assets/css/productlist/ProductGrid.css";

const itemsPerPage = 16; // 한 페이지당 상품 개수
const pageGroupSize = 5; // 페이지 그룹 크기

const ProductGrid = ({ products = [] }) => {
  const [sortType, setSortType] = useState("latest"); 
  const [currentPage, setCurrentPage] = useState(1); 

  // 정렬 적용 (최신순, 가격순)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "latest") return b.product_id - a.product_id;
    if (sortType === "price-low") return a.price - b.price;
    if (sortType === "price-high") return b.price - a.price;
    return 0;
  });

  // 페이지네이션 계산
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // 현재 페이지 그룹 계산
  const totalGroups = Math.ceil(totalPages / pageGroupSize);
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  // 정렬 기준 변경 시 페이지를 1페이지로 이동
  const handleSortChange = (sortOption) => {
    setSortType(sortOption);
    setCurrentPage(1);
  };

  return (
    <div className="product-grid-container">
      {/* 정렬 옵션 바 */}
      <SortBar onSortChange={handleSortChange} activeSort={sortType} />

      {/* 상품 목록 */}
      {currentItems.length > 0 ? (
        <>
          <div className="product-grid">
            {currentItems.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="pagination-container2">
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - pageGroupSize, 1))}
                disabled={currentGroup === 1}
              >
                이전
              </button>
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
                return null;
              })}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + pageGroupSize, totalPages))}
                disabled={currentGroup === totalGroups}
              >
                다음
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>해당 조건에 맞는 상품이 없습니다.</p>
      )}
    </div>
  );
};

export default ProductGrid;
