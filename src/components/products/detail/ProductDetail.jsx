import React from "react";
import ProductInfo from "./info/ProductInfo";
import "./info/ProductInfo.css";
import Thumbnail from "./thumnail/Thumbnail";

const ProductDetail = () => {
  return (
    <div className="product-detail">
      {/* 상품 이미지(섬네일) */}
      <Thumbnail />

      {/* 상품 정보 */}
      <ProductInfo />
    </div>
  );
};

export default ProductDetail;
