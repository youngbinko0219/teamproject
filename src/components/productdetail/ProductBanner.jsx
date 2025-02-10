import React from "react";
import "../../assets/css/productdetail/ProductBanner.css"; // 배너 스타일 연결

const ProductBanner = ({ imageUrl }) => {
  return (
    <div className="product-banner">
      <img src={imageUrl} alt="Product Banner" />
    </div>
  );
};

export default ProductBanner;
