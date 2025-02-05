import React from "react";
import "./ProductInfo.css";

const ProductInfo = () => {
  return (
    <div className="product-info-container">
      {/* 상품 제목 */}
      <h1 className="product-title">아기용 프리미엄 다기능 점퍼루</h1>

      {/* 가격 정보 */}
      <p className="product-price">25,000원</p>

      {/* 별점 및 리뷰 수 */}
      <div className="product-rating">
        <div className="stars">⭐⭐⭐⭐☆</div>
        <p className="review-count">(150 Reviews)</p>
        <p className="availability">✅ 대여 가능</p>
      </div>

      {/* 상품 설명 */}
      <p className="product-description">
        신나는 음악과 함께 아기의 운동 신경을 발달 시켜주는 다기능 점퍼루!
        다양한 장난감과 안전한 디자인으로 아기의 호기심을 자극합니다.
        엄마, 아빠도 안심하고 사용할 수 있는 안전한 유아용품이에요!
      </p>

      {/* 구분선 */}
      <hr className="divider" />

      {/* 대여 기간 선택 */}
      <div className="rental-period">
        <p>대여 기간</p>
        <div className="rental-buttons">
          <button className="rental-option selected">30일</button>
          <button className="rental-option">60일</button>
          <button className="rental-option">90일</button>
        </div>
      </div>

      {/* 옵션 선택 */}
      <div className="option-select">
        <p>옵션 선택</p>
        <select>
          <option>옵션을 선택해주세요.</option>
        </select>
      </div>

      {/* 대여 시작일 선택 */}
      <div className="start-date">
        <p>대여 시작</p>
        <select>
          <option>옵션을 선택해주세요.</option>
        </select>
      </div>

      {/* 수량 선택 & 장바구니/구매 버튼 */}
      <div className="purchase-section">
        <div className="quantity-selector">
          <button>-</button>
          <span>10</span>
          <button>+</button>
        </div>
        <button className="add-to-cart">🛒 장바구니 추가</button>
        <button className="buy-now">바로 대여하기</button>
      </div>
    </div>
  );
};

export default ProductInfo;
