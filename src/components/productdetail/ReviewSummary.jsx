import "../../assets/css/productdetail/ReviewSummary.css";

const ReviewSummary = ({ reviews = [] }) => {
  const totalReviews = reviews.length;
  

  // 평균 별점 계산
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  // 별점 분포 계산 (1~5점)
  const ratingDistribution = [5, 4, 3, 2, 1].map(
    (score) => reviews.filter((review) => review.rating === score).length
  );

  // 별점 분포에서 최대값 구하기 (빈 값이 있을 수 있기 때문에 안전한 처리 필요)
  const maxCount = Math.max(...ratingDistribution) || 1; // 0일 경우 대비

  return (
    <div className="review-summary">
      {/* 왼쪽 별점 */}
      <div className="review-score-header">
        <span className="star-icon">⭐</span>
        <h2>{averageRating}</h2>
      </div>
      <p className="review-text">
        {totalReviews > 0
          ? (
              (ratingDistribution.slice(0, 3).reduce((a, b) => a + b, 0) /
                totalReviews) *
                100
            ).toFixed(1)
          : 0}
        %의 구매자들이
        <br />이 상품에 만족하고 있어요!
      </p>
      {/* 오른쪽 그래프 */}
      <div className="rating-breakdown">
        {[
          "아주 만족해요",
          "맘에 들어요",
          "보통이에요",
          "그냥 그래요",
          "별로예요",
        ].map((label, index) => (
          <div key={index} className="rating-bar">
            <span className="label">{label}</span>
            <div className="bar">
              <div
                className="fill"
                style={{
                  width: `${(ratingDistribution[index] / maxCount) * 100}%`,
                }}
              ></div>
            </div>
            <span className="count">{ratingDistribution[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
