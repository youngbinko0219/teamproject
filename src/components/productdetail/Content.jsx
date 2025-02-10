import React from "react";
import "../../assets/css/productdetail/Content.css";

const Content = () => {
  return (
    <div className="product-detail-content">
      {/* 임시 텍스트 */}
      <h2 className="temp-title">상품 상세 정보</h2>
      <p className="temp-text">여기에 상품 설명이 들어갈 예정입니다.</p>
      
      {/* 임시 이미지 */}
      <div className="temp-images">
        <img src="/images/temp-product-1.jpg" alt="임시 상품 이미지 1" className="detail-image" />
        <img src="/images/temp-product-2.jpg" alt="임시 상품 이미지 2" className="detail-image" />
      </div>
    </div>
  );
};

export default Content;