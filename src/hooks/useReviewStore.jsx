import { create } from 'zustand';

const useReviewStore = create((set) => ({
  reviews: [], // 초기 값 빈 배열로 설정
  setReviews: (newReviews) => set({ reviews: newReviews }),

  reviewForm: {
    product_id: null,
    user_id: null,
    selectedOption: "",
  },

  setReviewForm: (formData) =>
    set((state) => ({
      reviewForm: { ...state.reviewForm, ...formData },
    })),

  // 좋아요 상태 업데이트
  updateReviewLikes: (reviewId, newLikes) => set((state) => ({
    reviews: state.reviews.map((review) => 
      review.review_id === reviewId 
        ? { ...review, review_like: newLikes } 
        : review
    ),
  })),
}));

export default useReviewStore;
