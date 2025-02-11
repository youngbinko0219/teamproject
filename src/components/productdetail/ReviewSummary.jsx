import ReviewSummaryDetail from "./ReviewSummaryDetail";
import "../../assets/css/productdetail/ReviewSummary.css";
import { reviews } from "./reviewData";

const totalReviews = reviews.length;
const averageRating = (totalReviews > 0) 
  ? (reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews).toFixed(1)
  : "0.0";

const ratingDistribution = [5, 4, 3, 2, 1].map(score => 
  reviews.filter(review => review.rating === score).length
);

const ReviewSummary = () => {
  return (
    <div className="review-summary">
      <div className="review-header">
        <span className="star-icon">⭐</span>
        <h2>{averageRating}</h2>
      </div>
      <p>
        {((ratingDistribution.slice(0, 3).reduce((a, b) => a + b, 0)) / totalReviews * 100 || 0).toFixed(1)}
        %의 구매자들이 이 상품에 만족하고 있어요!
      </p>
      <ReviewSummaryDetail ratingDistribution={ratingDistribution} />
    </div>
  );
};

export default ReviewSummary;
