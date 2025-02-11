const ReviewSummaryDetail = ({ ratingDistribution }) => {
  const maxCount = Math.max(...ratingDistribution) || 1; // 0일 경우 대비

  return (
    <div className="rating-breakdown">
      {["아주 만족해요", "맘에 들어요", "보통이에요", "그냥 그래요", "별로예요"].map((label, index) => (
        <div key={index} className="rating-bar">
          <span>{label}</span>
          <div className="bar">
            <div className="fill" style={{ width: `${(ratingDistribution[index] / maxCount) * 100}%` }}></div>
          </div>
          <span>{ratingDistribution[index]}</span>
        </div>
      ))}
    </div>
  );
};

export default ReviewSummaryDetail;
