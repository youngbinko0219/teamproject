import React from "react";
import Thumbnail from "../productdetail/Thumbnail";
import ProductInfo from "../productdetail/ProductInfo";
import ProductTabs from "../productdetail/ProductTabs";
import ProductBanner from "../productdetail/ProductBanner";
import "../../assets/css/pages/ProductDetailPage.css";
import bannerImg from "../../assets/images/banner1.jpg";

const ProductDetailPage = () => {
  return (<>
    <div className="product-detail-page">
      {/* 상품이미지 + 정보 */}
      <div className="product-detail-top">
        <Thumbnail />
        <ProductInfo />
      </div>
    </div>

    <ProductBanner imageUrl={bannerImg} />

    {/* 구분선 */}
    <div className="divider"></div>
    
    <div className="product-tabs-wrapper">
        <ProductTabs />
    </div>

  </>);
};

export default ProductDetailPage;
