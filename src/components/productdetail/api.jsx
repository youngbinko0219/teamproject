import { fetchMockProduct, fetchMockInquiries } from "./mockData"; 

const USE_MOCK = true; // 🔹 true: 더미 데이터 사용 | false: 실제 API 사용

// 📌 상품 데이터를 가져오는 API 요청
export const fetchProduct = async (productId) => {
  if (USE_MOCK) {
    return fetchMockProduct(productId);
  }

  try {
    const response = await fetch(`/api/products/${productId}`);
    if (!response.ok) throw new Error("API 요청 실패");
    return await response.json();
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};

export const fetchInquiries = async () => {
  if (USE_MOCK) {
    return fetchMockInquiries();
  }

  try {
    const response = await fetch(`/api/inquiries`);
    if (!response.ok) throw new Error("API 요청 실패");
    return await response.json();
  } catch (error) {
    console.error("API 에러:", error);
    throw error;
  }
};

export const postNewInquiry = async (newInquiry) => {
  if (USE_MOCK) {
    console.log("📢 Mock Posting Inquiry...");

    return new Promise(async (resolve) => {
      setTimeout(async () => {
        const inquiries = await fetchMockInquiries(); // 기존 문의 리스트 가져오기
        const newId = inquiries.length + 1;

        const updatedMockInquiries = [
          {
            id: newId,
            ...newInquiry,
            user: "testUser123",
            createdAt: new Date().toISOString().split("T")[0],
            answer: null,
          },
          ...inquiries, // ✅ 기존 문의 목록 유지
        ];

        resolve(updatedMockInquiries);
      }, 500);
    });
  }
};
