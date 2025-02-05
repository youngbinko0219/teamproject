import React from "react";
import ProductDetail from "../products/detail/ProductDetail"
import "../products/detail/style/ProductDetail.css"; // 스타일 연결

const ProductDetailPage = () => {
  return (
    <div className="product-detail-page">
      <ProductDetail />
    </div>
  );
};

export default ProductDetailPage;

