// src/services/userService.js
import axios from "axios";

const BASE_URL = "http://localhost:8080";

// 사용자 정보 조회
export const fetchUserInfo = async (userId) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response.data;
};

// 포인트 정보 조회
export const fetchUserPoints = async () => {
  const response = await axios.get(`${BASE_URL}/user/point`);
  return response.data;
};

// 사용자 정보 업데이트
export const updateUserInfo = async (data) => {
  const response = await axios.post(`${BASE_URL}/auth/update`, data);
  return response.data;
};
