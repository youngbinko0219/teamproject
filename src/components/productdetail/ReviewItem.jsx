const ReviewItem = ({ review }) => {
    return (
      <div className="review-item">
        <p><strong>{review.user}</strong> ({review.date})</p>
        <p>{review.comment}</p>
        {review.image && <img src={review.image} alt="리뷰 이미지" />}
      </div>
    );
  };
  
  export default ReviewItem;
  