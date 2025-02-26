import { useState, useEffect } from "react";
import useProductStore from "../../hooks/useProductStore";
import useReviewStore from "../../hooks/useReviewStore";
import useUserStore from "../../hooks/useUserStore";
import axios from "axios";
import ReviewSummary from "./ReviewSummary";
import ReviewItem from "./ReviewItem";
import ReviewFormModal from "../../modals/productsdetail/ReviewFormModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/productdetail/ReviewSection.css";

const ReviewSection = () => {
  const { product_id, product_name, mainImage } = useProductStore(); 
  const { user_id } = useUserStore();
  const { reviews, setReviews, setReviewForm } = useReviewStore(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortType: "helpful",
    photoOnly: false,
    currentPage: 1,
  });

  const reviewsPerPage = 5;
  const pageGroupSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (product_id) {
      setReviewForm({
        productId: product_id,
        productName: product_name,
      });
    }
  }, [product_id, product_name, setReviewForm]);

  const loadReviews = async () => {
    if (!product_id) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:8080/reviews/${Number(product_id)}/list`);
      setReviews(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("리뷰 데이터 불러오기 실패:", error);
      toast.error("리뷰 데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!product_id) return;
    
    const fetchData = async () => {
        try {
            setIsLoading(true);
            await loadReviews();
        } catch (error) {
            console.error("🚨 리뷰 데이터를 불러오는 중 오류 발생:", error);
        } finally {
            setIsLoading(false);
        }
    };

    fetchData();
  }, [product_id, setReviews]);

  const openReviewModal = () => {
    if (!product_id) {
      toast.error("상품 정보가 올바르게 로드되지 않았습니다.");
      return;
    }
  
    if (!user_id) {
      toast.warn("로그인이 필요합니다.");
      return;
    }
  
    setIsModalOpen(true);
  };
  
  const handleReviewSubmit = () => {
    loadReviews(); 
  };

  // ✅ 좋아요 업데이트 함수 추가
  const updateReviewLikes = (reviewId, newLikeCount) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.review_id === reviewId ? { ...review, review_like: newLikeCount } : review
      )
    );
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const totalGroups = Math.ceil(totalPages / pageGroupSize);
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = Array.isArray(reviews) ? reviews.slice(indexOfFirstReview, indexOfLastReview) : [];

  return (
    <div className="review-container">
      <ToastContainer
        position="top-center"
        autoClose={1000} 
        hideProgressBar={true} 
        closeOnClick 
        pauseOnHover={false} 
        draggable={false} 
        theme="colored" 
      />
      <div className="review-summary-container">
        <ReviewSummary reviews={reviews} />
      </div>

      <div className="review-controls">
        <div className="review-controls-left">
          <button
            className={filters.sortType === "helpful" ? "active" : ""}
            onClick={() => setFilters({ ...filters, sortType: "helpful" })}
          >
            도움순
          </button>
          <button
            className={filters.sortType === "latest" ? "active" : ""}
            onClick={() => setFilters({ ...filters, sortType: "latest" })}
          >
            최신순
          </button>
        </div>
        <div className="review-controls-right">
          <button className="write-review-button" onClick={openReviewModal}>
            리뷰 작성하기
          </button>
        </div>
      </div>

      <div className="review-list">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => <ReviewItem key={review.review_id} review={review} product_id={product_id} updateReviewLikes={updateReviewLikes}  />)
        ) : (
          <p>리뷰가 없습니다.</p>
        )}
      </div>

      <div className="pagination-container2">
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - pageGroupSize, 1))} 
            disabled={currentGroup === 1}
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (pageNumber >= startPage && pageNumber <= endPage) {
              return (
                <button 
                  key={pageNumber} 
                  className={currentPage === pageNumber ? "active" : ""}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + pageGroupSize, totalPages))} 
            disabled={currentGroup === totalGroups}
          >
            다음
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ReviewFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          product_id={product_id} 
          product_name={product_name} 
          mainImage={mainImage} 
          user_id={user_id}
          onReviewSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default ReviewSection;
