import { useState, useEffect } from "react";
import "../../assets/css/productdetail/InquiryModal.css";

const InquiryModal = ({ isOpen, onClose, onSubmit, productName }) => {
  const [inquiry, setInquiry] = useState({ title: "", content: "" });
  const [error, setError] = useState({ title: false, content: false });

  useEffect(() => {
    if (isOpen) {
      setInquiry({ title: "", content: "" });
      setError({ title: false, content: false });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setInquiry({ ...inquiry, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: false }); // 입력 시 오류 해제
  };

  const handleSubmit = () => {
    if (!inquiry.title.trim()) {
      setError({ ...error, title: true });
      document.getElementById("inquiry-title").focus();
      return;
    }
    if (!inquiry.content.trim()) {
      setError({ ...error, content: true });
      document.getElementById("inquiry-content").focus();
      return;
    }

    onSubmit({
      ...inquiry,
      user: "testUser123",
      createdAt: new Date().toISOString().split("T")[0],
      answer: null,
    });

    onClose(); // 모달 닫기
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <h2>문의 작성</h2>

          <label>상품명:</label>
          <input type="text" value={productName} disabled />

          <label>작성자:</label>
          <input type="text" value="testUser123" disabled />

          <label>작성일:</label>
          <input
            type="text"
            value={new Date().toISOString().split("T")[0]}
            disabled
          />

          <label>문의 제목:</label>
          <input
            id="inquiry-title"
            type="text"
            name="title"
            value={inquiry.title}
            onChange={handleChange}
            className={error.title ? "error-input" : ""}
            placeholder="제목을 입력하세요"
          />
          {error.title && <p className="error-message">제목을 입력해주세요.</p>}

          <label>문의 내용:</label>
          <textarea
            id="inquiry-content"
            name="content"
            value={inquiry.content}
            onChange={handleChange}
            className={error.content ? "error-input" : ""}
            placeholder="문의 내용을 입력하세요"
          ></textarea>
          {error.content && (
            <p className="error-message">문의 내용을 입력해주세요.</p>
          )}

          <div className="modal-buttons">
            <button onClick={onClose}>취소</button>
            <button onClick={handleSubmit}>등록</button>
          </div>
        </div>
      </div>
    )
  );
};

export default InquiryModal;
