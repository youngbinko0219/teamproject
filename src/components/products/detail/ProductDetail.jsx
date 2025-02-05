import React from "react";
import Thumbnail from "./Thumbnail";
import "./style/ProductDetail.css"; // 스타일 가져오기

const ProductDetail = () => {
  return (
    <div className="product-detail">
      {/* 썸네일 박스 */}
      <Thumbnail />
    </div>
  );
};

export default ProductDetail;
