// services/productService.js
import axios from "axios";

/**
 * 백엔드 API에서 검색 결과를 가져오는 함수
 * @param {string} searchName - 검색할 상품명
 * @returns {Promise<Array>} - 검색 결과 배열
 */
export const fetchProducts = async (searchName) => {
  const response = await axios.get(
    `http://localhost:8080/products/search?searchName=${encodeURIComponent(
      searchName
    )}`
  );
  return response.data;
};
