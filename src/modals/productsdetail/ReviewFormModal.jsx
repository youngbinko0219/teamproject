import React, { useState } from "react";
import "../../assets/css/productdetail/ReviewFormModal.css"; // ✅ CSS 연결

const ReviewFormModal = ({ isOpen, onClose, addReview }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const productName = "아기용 프리미엄 유모차"; // ✅ 나중에 API 연동 예정
  const userName = "사용자123"; // ✅ 로그인 정보 연동 예정
  const purchaseDate = new Date().toISOString().split("T")[0];
  const [selectedOption, setSelectedOption] = useState("블랙 / L사이즈");

  if (!isOpen) return null; // ✅ 모달이 닫혀있으면 렌더링 X

  const handleSubmit = () => {
    if (!comment.trim()) {
      alert("리뷰 내용을 작성해주세요! ✍️");
      return;
    }

    const newReview = {
      id: Date.now(),
      user: userName,
      date: purchaseDate,
      rating,
      comment,
      product: productName,
      option: selectedOption,
      likes: 0,
      photo: null, 
    };

    addReview(newReview);
    onClose(); // ✅ 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>📝 리뷰 작성</h2>
        <p><strong>상품명:</strong> {productName}</p>
        <p><strong>구매 옵션:</strong> {selectedOption}</p>
        <p><strong>작성자:</strong> {userName}</p>
        <p><strong>작성일:</strong> {purchaseDate}</p>

        <label>별점:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <textarea 
          placeholder="리뷰를 작성해주세요!" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
        />

        <button onClick={handleSubmit}>제출</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default ReviewFormModal;
