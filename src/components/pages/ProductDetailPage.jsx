import { useState, useEffect } from "react";
import axios from "axios";
import Thumbnail from "../productdetail/Thumbnail";
import ProductInfo from "../productdetail/ProductInfo";
import ProductTabs from "../productdetail/ProductTabs";
import Content from "../productdetail/Content";
import ReviewSection from "../productdetail/ReviewSection";
import InquirySection from "../productdetail/InquirySection";
import bannerTop from "../../assets/images/banner1.jpg";
import exchangeGuideImage from "../../assets/images/banner1.jpg";
import bannerReview from "../../assets/images/banner1.jpg";
import "../../assets/css/pages/ProductDetailPage.css";

/* 공통 섹션 컴포넌트 (탭 + 내용) */
const ProductSection = ({ id, children }) => (
  <section className="product-section-detail" id={id}>
    <ProductTabs currentSection={id} />
    {children}
  </section>
);

const ProductDetailPage = ({ productId = "1" }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* 상품 데이터를 API에서 가져옴 */
  useEffect(() => {
    const loadProduct = async () => {
      try {
        // 새로운 API 엔드포인트 사용: /products/view/{productId}
        const response = await axios.get(
          `http://localhost:8080/products/view/${productId}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("상품 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  // 로딩 상태 처리
  if (loading)
    return (
      <div className="product-detail-page">상품 정보를 불러오는 중...</div>
    );
  if (error) return <div className="product-detail-page">{error}</div>;
  if (!product)
    return (
      <div className="product-detail-page">상품 데이터를 찾을 수 없습니다.</div>
    );

  // 이미지 배열에서 null 값 제거
  const validImages = product.imgs
    ? product.imgs.filter((img) => img !== null)
    : [];

  return (
    <>
      {/* 상품 상단 정보 (이미지 & 기본 정보) */}
      <div className="product-detail-page">
        <div className="product-detail-top">
          <Thumbnail
            mainImage={validImages.length > 0 ? validImages[0] : ""}
            subImages={validImages}
          />
          <ProductInfo product={product} />
        </div>
      </div>

      {/* 구분선 */}
      <div className="divider2"></div>

      {/* 상단 배너 */}
      <div className="product-banner banner-top">
        <img src={bannerTop} alt="상품 상세 페이지 상단 배너" />
      </div>

      {/* 상세 정보 섹션 */}
      <ProductSection id="detail">
        <Content product={product.description || "상세 정보 없음"} />
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
        <ReviewSection productId={product.product_id} />
      </ProductSection>

      {/* 상품 문의 섹션 */}
      <ProductSection id="inquiry">
        <InquirySection product={product} />
      </ProductSection>
    </>
  );
};

export default ProductDetailPage;
