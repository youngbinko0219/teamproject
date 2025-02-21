import React, { useState } from "react";
import "../../assets/css/productdetail/ReportModal.css";

const ReportModal = ({ isOpen, onClose, review }) => {
  const [selectedReason, setSelectedReason] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!selectedReason) {
      alert("🚨 신고 사유를 선택해주세요!");
      return;
    }

    console.log(`🛑 신고 접수: 리뷰 ID ${review.id}, 사유: ${selectedReason}`);
    alert("신고가 접수되었습니다.");
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🚨 리뷰 신고하기</h2>
        <p className="report-info">
          신고할 리뷰: <strong>{review.user}</strong> <span className="report-date">({review.date})</span>
        </p>

        <label className="report-label">신고 사유 선택:</label>
        <select
          value={selectedReason}
          onChange={(e) => setSelectedReason(e.target.value)}
          className="report-select"
        >
          <option value="">사유 선택</option>
          <option value="부적절한 내용">부적절한 내용</option>
          <option value="거짓 정보">거짓 정보</option>
          <option value="광고/스팸">광고/스팸</option>
          <option value="기타">기타</option>
        </select>

        <div className="modal-buttons">
          <button className="submit-button" onClick={handleSubmit}>제출</button>
          <button className="cancel-button" onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
