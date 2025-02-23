import { create } from 'zustand';

const useReviewStore = create((set) => ({

	// 리뷰 목록
  reviews: [],  
  setReviews: (newReviews) => set({ reviews: newReviews }),  

}));

export default useReviewStore;
