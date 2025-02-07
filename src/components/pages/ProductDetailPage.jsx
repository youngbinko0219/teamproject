import React from "react";
import Thumbnail from "../productdetail/Thumbnail";
import ProductInfo from "../productdetail/ProductInfo";
import "../../assets/css/pages/ProductDetailPage.css";

const ProductDetailPage = () => {
  return (
    <div className="product-detail-page">
      {/* 상품이미지 + 정보 */}
      <div className="product-detail-top">
        <Thumbnail />
        <ProductInfo />
      </div>
    </div>
  );
};

export default ProductDetailPage;
