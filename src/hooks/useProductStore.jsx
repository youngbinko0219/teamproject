import { create } from "zustand";

const useProductStore = create((set) => ({
  // 카테고리 상태
  category: null,
  setCategory: (data) => set({ category: data }),

  // 상품 아이디
  product_id: null,
  setProductId: (id) => set({ product_id: id }),

  // 상품 메인 이미지
  mainImage: null,
  setMainImage: (data) => set({ mainImage: data }),

  // 상품 옵션 선택
  rentalPeriod: "30일",
  selectedOption: null,
  rentalDate: null,
  quantity: 1,
  setRentalPeriod: (days) => set({ rentalPeriod: days }),
  setSelectedOption: (option) => set({ selectedOption: option }),
  setRentalDate: (date) => set({ rentalDate: date }),
  setQuantity: (qty) => set({ quantity: qty }),

  // 장바구니 추가 함수
  addToCart: () => {
    console.log("🛒 장바구니 추가됨:", {
      product_id: useProductStore.getState().product_id,
      rentalPeriod: useProductStore.getState().rentalPeriod,
      selectedOption: useProductStore.getState().selectedOption,
      rentalDate: useProductStore.getState().rentalDate,
      quantity: useProductStore.getState().quantity,
    });
  },

  // 즉시 구매 함수
  proceedToCheckout: () => {
    console.log("💳 결제 진행:", {
      product_id: useProductStore.getState().product_id,
      rentalPeriod: useProductStore.getState().rentalPeriod,
      selectedOption: useProductStore.getState().selectedOption,
      rentalDate: useProductStore.getState().rentalDate,
      quantity: useProductStore.getState().quantity,
    });
  },
}));

export default useProductStore;
