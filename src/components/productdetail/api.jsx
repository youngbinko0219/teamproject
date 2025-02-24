import axios from "axios";

// 📌 상품 데이터를 가져오는 API 요청
export const fetchProduct = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};

export const fetchInquiries = async () => {
  try {
    const response = await axios.get(`/inquiries`);
    return response.data;
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};

export const postNewInquiry = async (newInquiry) => {
  try {
    const response = await axios.post(`/inquiries`, newInquiry);
    return response.data;
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};

// 📌 리뷰 데이터를 가져오는 API 요청
export const fetchReviews = async (productId) => {
  try {
    const response = await axios.get(`/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};

export const postReview = async (productId, reviewData) => {
  try {
    const response = await axios.post(
      `/products/${productId}/reviews`,
      reviewData
    );
    return response.data;
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};
