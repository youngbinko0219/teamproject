// components/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchProducts } from "../../services/ProductService";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../pagination/Pagination";
import "../../assets/css/header/SearchResults.css";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  useEffect(() => {
    const getData = async () => {
      try {
        if (query) {
          const data = await fetchProducts(query);
          setResults(data);
        }
      } catch (err) {
        console.error("Error fetching search results", err);
        setError(err);
      }
    };
    getData();
  }, [query]);

  // usePagination 훅은 항상 최상위에서 호출해야 합니다.
  const {
    currentItems,
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
  } = usePagination(results, 10, 5);

  // 에러가 있으면 바로 반환 (에러 처리도 최상위에서)
  if (error) {
    return <div>Error fetching search results</div>;
  }

  return (
    <div className="search-results-container">
      {/* 검색 결과 문구 */}
      <h2 className="search-results-title">
        검색 결과 : {query} (총 {results.length}개)
      </h2>

      {results.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        <>
          <div className="search-items-wrapper">
            {currentItems.map((product) => (
              <Link
                key={product.product_id}
                to={`/products/view/${product.product_id}`}
                className="search-product-item"
              >
                <img
                  src={product.images}
                  alt={product.product_name}
                  style={{ width: "100%", height: "150px", objectFit: "cover" }}
                />
                <h3>{product.product_name}</h3>
                <p>{product.category}</p>
                <p>{product.price}원</p>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageNumbers={pageNumbers}
            startPage={startPage}
            endPage={endPage}
            itemsPerPage={itemsPerPage}
            handlePageClick={handlePageClick}
            handlePrevGroup={handlePrevGroup}
            handleNextGroup={handleNextGroup}
            handleItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchResults;
