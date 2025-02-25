import { useParams } from "react-router-dom";
import useProductStore from "../../hooks/useProductStore";
import Header from "../header/Header";  
import Footer from "../footer/Footer";
import CategoryList from "../main/CategoryList";
import FilterBar from "../productlist/FilterBar";
import RecentViewed from "../productlist/RecentViewed";
import { useState, useEffect } from "react";
import axios from "axios";
import Thumbnail from "../productdetail/Thumbnail";
import ProductInfo from "../productdetail/ProductInfo";
import ProductTabs from "../productdetail/ProductTabs";
import Content from "../productdetail/Content";
import ReviewSection from "../productdetail/ReviewSection";
// import InquirySection from "../productdetail/InquirySection";
import bannerTop from "../../assets/images/productdetail/bannerTop.jpg";
import exchangeGuideImage from "../../assets/images/productdetail/exchangeGuideImage.jpg";
import bannerReview from "../../assets/images/productdetail/bannerReview.jpg"
import "../../assets/css/pages/ProductDetailPage.css";

/* 공통 섹션 컴포넌트 (탭 + 내용) */
const ProductSection = ({ id, children }) => (
  <section className="product-section-detail" id={id}>
    <ProductTabs currentSection={id} />
    {children}
  </section>
);

const ProductDetailPage = () => {
  const { setProductId } = useProductStore();  
  const { product_id } = useParams(); // URL의 product_id 파라미터를 읽어옴
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 페이지가 열릴 때 product_id를 zustand에 저장 */
  useEffect(() => {
    if (product_id) {
      setProductId(product_id);
    }
  }, [product_id, setProductId]);

  return (
    <>
      <Header />
      <div className="product-list-container">
        {/* 왼쪽 영역 (카테고리 + 필터) */}
        <aside className="left-section">
          <CategoryList />
          <FilterBar />
        </aside>

        <main className="center-section">
          {/* 상품 상단 정보 (이미지 & 기본 정보) */}
            <div className="product-detail-top">
              <Thumbnail />   {/* 이미지 컴포넌트 */}
              <ProductInfo />  {/* 상품 정보 컴포넌트 */}
            </div>

          {/* 구분선 */}
          <div className="divider2"></div>

          {/* 상단 배너 */}
          <div className="product-banner banner-top">
            <img src={bannerTop} alt="상품 상세 페이지 상단 배너" />
          </div>

          {/* 상세 정보 섹션 */}
          <ProductSection id="detail">
          <Content />
          </ProductSection>

          {/* 교환 및 반납/연장 안내 섹션 */}
          <ProductSection id="exchange">
            <div className="exchange-guide">
              <img src={exchangeGuideImage} alt="교환 및 반납/연장 안내" />
            </div>
          </ProductSection>

          {/* 상품 후기 섹션 */}
          <ProductSection id="review">
            <div className="product-banner banner-review">
              <img src={bannerReview} alt="상품 후기 배너" />
            </div>
            <ReviewSection /> 
          </ProductSection>

          {/* 상품 문의 섹션 */}
          <ProductSection id="inquiry">
            {/* <InquirySection /> */}
          </ProductSection> 
        </main>


        {/* ✅ 오른쪽 영역 (최근 본 상품) */}
        <aside className="right-section">
          <RecentViewed />
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
