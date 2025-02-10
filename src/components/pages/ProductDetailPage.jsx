import React, {useState} from "react";
import Thumbnail from "../productdetail/Thumbnail";
import ProductInfo from "../productdetail/ProductInfo";
import ProductTabs from "../productdetail/ProductTabs";
import ProductBanner from "../productdetail/ProductBanner";
import bannerImg from "../../assets/images/banner1.jpg";
import Content from "../productdetail/Content";
import "../../assets/css/pages/ProductDetailPage.css";


const ProductDetailPage = () => {

  return (<>
    <div className="product-detail-page">
      {/* 상품 상단 정보 */}
      <div className="product-detail-top">
        <Thumbnail />
        <ProductInfo />
      </div>
    </div>

    {/* 구분선 */}
    <div className="divider"></div>

    {/* 상품 배너 */}
    <ProductBanner imageUrl={bannerImg} />


    {/* 상품 상세정보 섹션 */}
    <div className="product-section" id="detail">
      <ProductTabs currentSection="detail" />
      <Content />
    </div>

    {/* 교환 및 반납/연장 안내 섹션 */}
    <div className="product-section" id="exchange">
      <ProductTabs currentSection="exchange" />
      <div>교환 및 반납/연장 안내 내용</div>
    </div>

    {/* 상품 후기 섹션 */}
    <div className="product-section" id="review">
      <ProductTabs currentSection="review" />
      <div>상품 후기 내용</div>
    </div>

    {/* 상품 문의 섹션 */}
    <div className="product-section" id="inquiry">
      <ProductTabs currentSection="inquiry" />
      <div>상품 문의 내용</div>
    </div>


  </>);
};

export default ProductDetailPage;
