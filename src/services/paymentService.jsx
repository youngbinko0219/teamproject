// src/services/paymentService.jsx
import axios from "axios";

const API_BASE = "http://localhost:8080"; // 백엔드 서버 주소

export const processPayment = async (paymentData) => {
  const response = await axios.post(`${API_BASE}/payment/process`, paymentData);
  return response.data;
};

export const getPaymentHistory = async (userId) => {
  const response = await axios.get(
    `${API_BASE}/payment/history?userId=${userId}`
  );
  return response.data;
};
