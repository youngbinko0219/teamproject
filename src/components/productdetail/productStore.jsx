import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  product: null,
  loading: false,
  error: null,

  fetchProduct: async (productId) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get(`http://localhost:8080/products/view/${productId}`);
      set({ product: response.data });
    } catch (err) {
      console.error("🚨 상품 데이터 로드 오류:", err);
      set({ error: "상품 데이터를 불러오는 중 오류가 발생했습니다." });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
