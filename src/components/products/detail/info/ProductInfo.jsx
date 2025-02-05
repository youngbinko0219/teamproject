import React from "react";
import "./style/ProductInfo.css";
import ProductTitle from "./ProductTitle";
import AverageRating from "./AverageRating";
import ProductDescription from "./ProductDescription";
import RentalPeriod from "./RentalPeriod";
import Dropdown from "../../common/Dropdown";
import PurchaseSection from "./PurchaseSection";
import WishlistButton from "../../common/WishlistButton";

const ProductInfo = () => {
  return (
    <div className="product-info-container">
      <ProductTitle />
      <AverageRating />
      <ProductDescription />
      <RentalPeriod />
      <Dropdown label="옵션 선택" options={["옵션 1", "옵션 2", "옵션 3"]} />
      <Dropdown label="대여 시작" options={["날짜 선택", "즉시 대여", "예약 대여"]} />
      <PurchaseSection />
      <WishlistButton />
    </div>
  );
};

export default ProductInfo;
