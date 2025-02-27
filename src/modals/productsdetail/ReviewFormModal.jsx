import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useUserStore from "../../hooks/useUserStore";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/css/productdetail/ReviewFormModal.css";
import useProductStore from "../../hooks/useProductStore";

const ReviewFormModal = ({ isOpen, onClose, onReviewSubmit }) => {
  const { user_id } = useUserStore();
  const { mainImage, product_id, product_name} = useProductStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + reviewImages.length > 5) {
      toast.error("이미지는 최대 5장까지 업로드 가능합니다.");
      return;
    }
    setReviewImages([...reviewImages, ...files]);
  };

  useEffect(() => {
    return () => {
      reviewImages.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [reviewImages]);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      toast.dismiss();
      toast.warn("리뷰 내용을 작성해주세요.", { toastId: "reviewWarning" });
      return;
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    try {
      const formData = new FormData();
      // reviews 부분: JSON blob으로 만들어서 전송 (user_id, rating, review_text)
      const reviewData = new Blob(
        [JSON.stringify({ product_id, user_id, rating, review_text: comment })],
        { type: "application/json" }
      );
      formData.append("reviews", reviewData);
  
      // review_img 부분: 이미지가 있으면 파일들을, 없으면 빈 문자열을 전송
      if (reviewImages.length > 0) {
        reviewImages.forEach((image) => {
          formData.append("review_img", image);
        });
      }
  
      const response = await axios.post(
        `http://localhost:8080/products/${product_id}/reviews`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (
        response.data.message &&
        response.data.message.toLowerCase() === "success"
      ) {
        const points = reviewImages.length > 0 ? 500 : 300;
        const toastId = toast.success(
          `🎉 리뷰가 등록되었습니다! (+${points} 포인트 지급)`,
          { autoClose: 1500 }
        );
  
        setTimeout(() => {
          toast.dismiss(toastId);
          setRating(5);
          setComment("");
          setReviewImages([]);
          setIsSubmitting(false);
          onClose();
          onReviewSubmit();
        }, 1500);
      } else if (response.data.message === "noWrite") {
        toast.info("이미 작성한 상품입니다.");
      } else if (response.data.message === "noPay") {
        toast.error("구매 후 작성 가능합니다.");
      } else {
        toast.error("리뷰 등록 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      toast.error("서버 오류로 인해 등록할 수 없습니다.");
    }
    setIsSubmitting(false);
  };
  

  return (
    <div className="review-form-modal-overlay">
      <div className="review-form-modal-content">
        <h2>📝 
          리뷰 작성</h2>
        <ToastContainer
          position="top-center"  // 중앙 배치
          autoClose={1000}  // 1초 후 자동 닫힘
          hideProgressBar={true}  // 진행 바 없애기
          closeOnClick  // 클릭하면 닫히도록
          pauseOnHover={false}  // 마우스 올려도 멈추지 않도록
          draggable={false}  // 드래그 기능 비활성화
          theme="colored"  // 색상 테마 적용
        />

        <div className="review-form-product-info">
          <p><strong>상품명:</strong> {product_name || "상품 정보 없음"}</p>
          {mainImage ? (
            <img src={mainImage} alt="상품 이미지" className="review-form-product-image" />
          ) : (
            <p>이미지가 없습니다.</p>
          )}
        </div>

        <div className="review-form-rating-section">
          <label>⭐ 별점 선택:</label>
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value="5">⭐⭐⭐⭐⭐ (5점)</option>
            <option value="4">⭐⭐⭐⭐ (4점)</option>
            <option value="3">⭐⭐⭐ (3점)</option>
            <option value="2">⭐⭐ (2점)</option>
            <option value="1">⭐ (1점)</option>
          </select>
        </div>

        <textarea
          className="review-form-textarea"
          placeholder="리뷰를 작성해주세요!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="review-form-image-upload">
          <label>📸 이미지 업로드 (최대 5장):</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
        </div>

        <div className="review-form-image-preview">
          {reviewImages.map((img, index) => (
            <img key={index} src={URL.createObjectURL(img)} alt={`업로드 이미지 ${index + 1}`} />
          ))}
        </div>

        <div className="review-form-button-group">
          <button className="review-form-submit-button" onClick={handleSubmit} disabled={isSubmitting}>
            🚀 {isSubmitting ? "제출 중..." : "제출"}
          </button>
          <button className="review-form-cancel-button" onClick={onClose}>❌ 취소</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;