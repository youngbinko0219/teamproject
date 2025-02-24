// src/api/CartService.js
import axios from "axios";

const API_URL = "http://localhost:8080/cart";

// 장바구니의 모든 아이템 가져오기
export const getCartItems = () => {
  return axios.get(API_URL);
};

// 장바구니에 아이템 추가하기
export const addCartItem = (itemData) => {
  return axios.post(API_URL, itemData);
};

// 장바구니 아이템 업데이트하기 (예: 수량 변경)
export const updateCartItem = (itemId, updateData) => {
  return axios.put(`${API_URL}/${itemId}`, updateData);
};

// 장바구니에서 아이템 삭제하기
export const deleteCartItem = (itemId) => {
  return axios.delete(`${API_URL}/${itemId}`);
};

// 장바구니 모든 아이템 삭제하기
export const clearCart = () => {
  return axios.delete(API_URL); // 모든 아이템 삭제를 위한 API 호출
};
