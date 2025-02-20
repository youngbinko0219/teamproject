import React, { useState, useEffect } from "react";
import { fetchInquiries, postNewInquiry } from "./api"; 
import InquiryModal from "./InquiryModal";
import "../../assets/css/productdetail/InquirySection.css";

const InquirySection = ({ product }) => { 
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedInquiry, setExpandedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inquiriesPerPage = 10;
  const pageGroupSize = 5;

  useEffect(() => {
    fetchInquiries().then((data) => setInquiries(data));
  }, []);

  const handleSubmitInquiry = async (inquiry) => {
    const newInquiryData = {
      id: inquiries.length ? Math.max(...inquiries.map(q => q.id)) + 1 : 1,
      createdAt: new Date().toISOString().split("T")[0],
      answer: null,
      ...inquiry,
    };

    setInquiries((prevInquiries) => [newInquiryData, ...prevInquiries]);
    setShowModal(false);
  };

  const sortedInquiries = [...inquiries].sort((a, b) => b.id - a.id);
  const indexOfLastInquiry = currentPage * inquiriesPerPage;
  const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
  const currentInquiries = sortedInquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);

  const totalPages = Math.max(1, Math.ceil(sortedInquiries.length / inquiriesPerPage));
  const currentGroup = Math.ceil(currentPage / pageGroupSize);
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  // ✅ 만약 totalPages가 줄어들었는데 currentPage가 초과된 경우, 마지막 페이지로 조정
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  return (
    <div className="inquiry-container">
      <table className="inquiry-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>문의사항</th>
            <th>아이디</th>
            <th>작성일</th>
            <th>답변상태</th>
          </tr>
        </thead>
        <tbody>
          {currentInquiries.map((inquiry) => (
            <React.Fragment key={inquiry.id}>
              <tr className="inquiry-row" onClick={() => setExpandedInquiry(expandedInquiry === inquiry.id ? null : inquiry.id)}>
                <td>{inquiry.id}</td>
                <td>{inquiry.title}</td>
                <td>{inquiry.user}</td>
                <td>{inquiry.createdAt}</td>
                <td className={`answer-status ${inquiry.answer ? "completed" : "pending"}`}>
                  {inquiry.answer ? "답변완료" : "미답변"}
                </td>
              </tr>
              {expandedInquiry === inquiry.id && (
                <tr className="inquiry-detail">
                <td colSpan="5">
                  <div className="inquiry-content">
                    <p className="inquiry-title"><strong>문의 내용</strong></p>
                    <p className="inquiry-text">{inquiry.content.split("\n").map((line, index) => (
                      <span key={index}>{line}<br /></span>
                    ))}</p>

                    {inquiry.answer ? (
                      <>
                        <p className="answer-title"><strong>운영자 답변</strong></p>
                        <p className="admin-answer">{inquiry.answer.split("\n").map((line, index) => (
                          <span key={index}>{line}<br /></span>
                        ))}</p>
                      </>
                    ) : (
                      <p className="no-answer">답변이 등록되지 않았습니다.</p>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>

      {/* ✅ 문의 작성 버튼 */}
      <div className="inquiry-button-container">
        <button className="write-inquiry" onClick={() => setShowModal(true)}>문의 작성하기</button>
      </div>

      {/* ✅ 페이지네이션 (ReviewSection 방식 적용) */}
      <div className="pagination-container">
        <div className="pagination">
          {/* 🔹 "이전" 버튼 */}
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - pageGroupSize, 1))} 
            disabled={currentPage === 1}
          >
            이전
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (pageNumber >= startPage && pageNumber <= endPage) {
              return (
                <button key={pageNumber} className={currentPage === pageNumber ? "active" : ""}
                  onClick={() => setCurrentPage(pageNumber)}>
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}

          {/* 🔹 "다음" 버튼 */}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + pageGroupSize, totalPages))} 
            disabled={currentPage >= totalPages}
          >
            다음
          </button>
        </div>
      </div>

      {/* ✅ InquiryModal 포함 (누락 방지) */}
      <InquiryModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={handleSubmitInquiry} 
        productName={product.name} 
      />
    </div>
  );
};

export default InquirySection;
