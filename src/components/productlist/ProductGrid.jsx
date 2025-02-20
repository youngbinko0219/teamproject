import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SortBar from "./SortBar";
import "../../assets/css/productlist/ProductGrid.css";
import useProductStore from "../../zustand/useProductStore";
import axios from "axios";

const itemsPerPage = 16; // 한 페이지당 상품 개수
const pageGroupSize = 5; // 페이지 그룹 크기 

const ProductGrid = () => {
  const { category } = useProductStore();  // 선택한 카테고리 가져오기
  const [list, setList] = useState([]); // 전체 상품 목록 상태
  const [products, setProducts] = useState([]); // 필터링된 상품 목록 상태(정렬을 위해 필요)
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [sortType, setSortType] = useState("latest"); // 기본 정렬 기준

  // 상품 목록 API 호출 (카테고리 변경될 때마다 실행)
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/products/${category}`);
        setList(response.data); // 전체 상품 목록을 가져옴
        setProducts(response.data); // 카테고리에 맞는 상품 목록으로 초기화
      } catch (error) {
        console.error("상품 목록 불러오기 오류:", error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [category]); // category 변경 시 실행

  // 카테고리가 변경될 때 정렬을 최신순으로 초기화
  useEffect(() => {
    setSortType("latest");  // 정렬 기준을 최신순으로 변경
    setCurrentPage(1); // 항상 1페이지로 이동
  }, [category]); // 카테고리 변경 시 실행

  // 정렬 변경 시 1페이지로 이동
  const handleSortChange = (sortOption) => {
    setSortType(sortOption);
    setCurrentPage(1); 
  };

  // 정렬 적용 (최신순, 가격순, 리뷰순, 찜순)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortType === "latest") return new Date(b.created_at) - new Date(a.created_at);
    if (sortType === "price-low") return a.price - b.price;
    if (sortType === "price-high") return b.price - a.price;
    if (sortType === "review") return b.review_count - a.review_count;
    if (sortType === "wishlist") return b.wishlist_count - a.wishlist_count;
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

  return (
    <div className="product-grid-container">
      <SortBar onSortChange={handleSortChange} activeSort={sortType}  />
      {loading ? (
        <p>상품을 불러오는 중...</p>
      ) : (
        <>
          {/* 상품 목록 */}
          <div className="product-grid">
            {currentItems.length > 0 ? (
              currentItems.map((product) => {
                return <ProductCard key={product.product_id} product={product} />;
              })
            ) : (
              <p>해당 조건에 맞는 상품이 없습니다.</p>
            )}
          </div>


          {/* 페이지네이션 */}
          <div className="pagination-container2">
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - pageGroupSize, 1))} 
                disabled={currentGroup === 1}
              >
                이전
              </button>
              {/* 현재 페이지 그룹의 번호만 표시 */}
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
                onClick={() => setCurrentPage(prev => Math.min(prev + pageGroupSize, totalPages))} 
                disabled={currentGroup === totalGroups}
              >
                다음
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
