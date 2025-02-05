import React, { useState } from "react";
import "./style/PurchaseSection.css"; // 스타일 적용
import CustomButton from "../../common/CustomButton"; // 공통 버튼 컴포넌트

const PurchaseSection = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="purchase-section-container">
      {/* 수량 선택 */}
      <div className="quantity-selector">
        <button onClick={handleDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>

      {/* 장바구니 추가 버튼 */}
      <CustomButton label="장바구니 추가" onClick={() => alert("장바구니에 추가됨")} type="cart" />

      {/* 즉시 대여 버튼 */}
      <CustomButton label="바로 대여하기" onClick={() => alert("즉시 대여 진행")} type="rent" />
    </div>
  );
};

export default PurchaseSection;
