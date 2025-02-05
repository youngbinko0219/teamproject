import React from "react";
import Thumbnail from "./thumnail/Thumbnail";
import ProductInfo from "./info/ProductInfo";
import "./style/ProductDetail.css"

const ProductDetail = () => {
  return (
    <div className="product-detail">
      <Thumbnail />
      <ProductInfo />
    </div>
  );
};

export default ProductDetail;
