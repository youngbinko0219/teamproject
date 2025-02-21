import { create } from "zustand";

const useProductStore = create((set) => ({
  // 초기값
  category: null,

  // category 변경
  setCategory: (data) => set({ category: data }),

}));

export default useProductStore;
