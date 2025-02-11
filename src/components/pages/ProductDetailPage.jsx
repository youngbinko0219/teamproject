import React  from "react";
import Thumbnail from "../productdetail/Thumbnail";
import ProductInfo from "../productdetail/ProductInfo";
import ProductTabs from "../productdetail/ProductTabs";
import ProductBanner from "../productdetail/ProductBanner";
import Content from "../productdetail/Content";
import ReviewSection from "../productdetail/ReviewSection";
import bannerTop from "../../assets/images/banner1.jpg"; // 상세정보 위 배너
import bannerReview from "../../assets/images/banner1.jpg"; // 상품 후기 안 배너
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
    <ProductBanner imageUrl={bannerTop} customClass="banner-top" />


    {/* 상품 상세정보 섹션 */}
    <div className="product-section" id="detail">
      <ProductTabs currentSection="detail" />
      <Content />
    </div>

    {/* 교환 및 반납/연장 안내 섹션 */}
    <div className="product-section" id="exchange">
      <ProductTabs currentSection="exchange" />
      <div className="placeholder-image"> {/* ✅ 임시 배경 추가 */}
        교환/반납/연장 안내 이미지 (추후 삽입 예정)
      </div>
    </div>

    {/* 상품 후기 섹션 */}
    <div className="product-section" id="review">
      <ProductTabs currentSection="review" />
      <ProductBanner imageUrl={bannerReview} customClass="banner-review" />
      <ReviewSection />
    </div>

    {/* 상품 문의 섹션 */}
    <div className="product-section" id="inquiry">
      <ProductTabs currentSection="inquiry" />
      <div>상품 문의 내용</div>
    </div>


  </>);
};

export default ProductDetailPage;
