import React, { useState } from "react";

const ReportModal = ({ isOpen, onClose, review }) => {
  const [selectedReason, setSelectedReason] = useState(""); // 선택한 신고 사유

  if (!isOpen) return null; // ❌ 모달이 닫혀 있으면 렌더링 안 함

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("🚨 신고 사유를 선택해주세요!");
      return;
    }

    console.log(`🛑 신고 접수: 리뷰 ID ${review.id}, 사유: ${selectedReason}`);
    alert("신고가 접수되었습니다.");

    onClose(); // ✅ 신고 후 모달 닫기
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🚨 리뷰 신고하기</h2>
        <p>신고할 리뷰: <strong>{review.user}</strong> ({review.date})</p>

        <label>신고 사유 선택:</label>
        <select value={selectedReason} onChange={(e) => setSelectedReason(e.target.value)}>
          <option value="">사유 선택</option>
          <option value="부적절한 내용">부적절한 내용</option>
          <option value="거짓 정보">거짓 정보</option>
          <option value="광고/스팸">광고/스팸</option>
          <option value="기타">기타</option>
        </select>

        <button className="submit-button" onClick={handleSubmit}>제출</button>
        <button className="cancel-button" onClick={onClose}>취소</button>
      </div>
    </div>
  );
};

export default ReportModal;
