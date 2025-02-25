// src/services/WishListService.js
import axios from "axios";

const API_URL = "http://localhost:8080/wishlist";

// 위시리스트에 상품 추가
export const addWishItem = (wishData) => {
  const token = localStorage.getItem("accessToken");
  return axios.post(API_URL, wishData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 위시리스트에서 상품 제거 (userId와 productId 기준)
export const removeWishItem = (userId, productId) => {
  const token = localStorage.getItem("accessToken");
  return axios.delete(`${API_URL}/${userId}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
