import React, { useState } from "react";
import "../../assets/css/productdetail/ProductInfo.css";
import ReviewSummarySimple from "./ReviewSummarySimple";
import RentalPeriodSelector from "./RentalPeriodSelector";
import Dropdown from "./Dropdown";
import QuantitySelector from "./QuantitySelector";
import RentalDatePicker from "./RentalDatePicker";
import LikeButton from "./LikeButton";

const ProductInfo = () => {
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState("30일");
  const [selectedOption, setSelectedOption] = useState("옵션을 선택해주세요");
  const [selectedRentalDate, setSelectedRentalDate] = useState(null);

  return (
    <div className="product-info">
      <h1 className="product-name">아기용 프리미엄 다기능 점퍼루</h1>
      <p className="product-price">25,000원</p>
      <div className="product-review">
        <ReviewSummarySimple totalReviews={150} averageRating={4.5} />
        <p className="product-availability available">대여가능</p>
      </div>
      <p className="product-description">
        신나는 음악과 함께 아기의 운동 신경을 발달 시켜주는 다기능 점퍼루! 엄마, 아빠도 안심하고 사용할 수 있는 안전한 유아용품이에요!
        신나는 음악과 함께 아기의 운동 신경을 발달 시켜주는 다기능 점퍼루! 엄마, 아빠도 안심하고 사용할 수 있는 안전한 유아용품이에요!
      </p>
    
      {/* 구분선 추가 */}
      <hr className="divider" />
    
      {/* 대여 기간 선택 */}
      <div className="rental-period-section">
        <h3 className="product-rental-text">대여 기간</h3>
        <RentalPeriodSelector selectedPeriod={selectedRentalPeriod} onSelect={setSelectedRentalPeriod} />
      </div>
    
      {/* 옵션 선택 */}
      <div className="option-selection-section">
        <h3 className="product-option-text">옵션 선택</h3>
        <Dropdown options={["기본형", "고급형", "프리미엄형"]} selected={selectedOption} onSelect={setSelectedOption} />
      </div>
    
      {/* 대여 시작일 선택 */}
      <div className="rental-start-section">
        <h3 className="product-start-text">대여 시작</h3>
        <RentalDatePicker selectedDate={selectedRentalDate} onSelect={setSelectedRentalDate} /> {/* ✅ 적용 */}
      </div>
    
      {/* 장바구니 & 즉시 구매 */}
      <div className="purchase-buttons">
        <QuantitySelector /> {/* 수량 선택 */}
        <button className="add-to-cart">🛒 장바구니 추가</button>
        <button className="buy-now">바로 대여하기</button>
        <LikeButton /> {/* 찜하기 버튼 */}
      </div>
    </div>
  );
};

export default ProductInfo;