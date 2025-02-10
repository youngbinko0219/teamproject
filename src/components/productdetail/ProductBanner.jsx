import React from "react";
import "../../assets/css/productdetail/ProductBanner.css";

const ProductBanner = ({ imageUrl, altText = "배너 이미지", customClass = "" }) => {
  return (
    <div className={`product-banner ${customClass}`}>
      <img src={imageUrl} alt={altText} className="banner-image" />
    </div>
  );
};

export default ProductBanner;
