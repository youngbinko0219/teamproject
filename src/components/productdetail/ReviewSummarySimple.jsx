import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "../../assets/css/productdetail/ReviewSummarySimple.css";

const ReviewSummarySimple = ({ product_id }) => {
  const [averageRating, setAverageRating] = useState(0.0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reviews/${product_id}/list`);
        const reviews = response.data;

        const total = reviews.length;
        setTotalReviews(total); 

        if (total > 0) {
          const avg = reviews.reduce((acc, review) => acc + review.rating, 0) / total;
          setAverageRating(Number(avg.toFixed(1)));
        }
      } catch (error) {
        console.error(`❌ 리뷰 데이터 요청 실패 (상품 ID: ${product_id}):`, error);
      }
    };

    fetchReviewData();
  }, [product_id]); 

  return (
    <div className="review-summary-simple">
      <div className="stars">
        {[...Array(Math.floor(averageRating))].map((_, index) => (
          <span key={index} className="filled-star">★</span>
        ))}
        {averageRating % 1 >= 0.5 && <span className="half-star">★</span>}
        {[...Array(5 - Math.floor(averageRating) - (averageRating % 1 >= 0.5 ? 1 : 0))].map((_, index) => (
          <span key={`empty-${index}`} className="empty-star">★</span>
        ))}
      </div>

      <span className="review-count">({totalReviews} Reviews)</span>
    </div>
  );
};

// Props 유효성 검사
ReviewSummarySimple.propTypes = {
  product_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default ReviewSummarySimple;
