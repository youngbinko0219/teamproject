import Header from "../header/Header"; // 헤더 임포트
import Footer from "../footer/Footer"; // 푸터 임포트
import MainBanner from "../main/MainBanner";
import CategoryList from "../main/CategoryList";
import TodayProducts from "../main/TodayProducts";
import BestProducts from "../main/BestProducts";
import NewProducts from "../main/NewProducts";
import AllProducts from "../main/AllProducts";
import "../../assets/css/main/mainPage.css";
import ProductSection from "../main/ProductSection";

const MainPage = () => {
  return (
    <div className="main-page-container">
      {/* 헤더 */}
      <Header />

      {/* 메인 배너 & 카테고리 섹션 */}
      <section className="banner-category-section">
        <div className="category-container">
          <CategoryList />
        </div>
        <div className="banner-container">
          <MainBanner />
        </div>
      </section>

      {/* 오늘의 상품 섹션 */}
      <section className="today-products-section">
        <ProductSection
          title="오늘의 상품"
          buttonProps={{ to: "/today-products", label: "오늘의 상품 보기" }}
        >
          <TodayProducts />
        </ProductSection>
      </section>

      {/* 베스트 상품 섹션 */}
      <section className="best-products-section">
        <ProductSection
          title="베스트 상품"
          buttonProps={{ to: "/best-products", label: "베스트 상품 보기" }}
        >
          <BestProducts />
        </ProductSection>
      </section>

      {/* 새로운 상품 섹션 */}
      <section className="new-products-section">
        <ProductSection
          title="신상품"
          buttonProps={{ to: "/new-products", label: "새로운 상품 보기" }}
        >
          <NewProducts />
        </ProductSection>
      </section>

      {/* 모든 상품 섹션 */}
      <section className="all-products-section">
        <ProductSection
          title="모든 상품"
          buttonProps={{ to: "/all-products", label: "모든 상품 보기" }}
        >
          <AllProducts />
        </ProductSection>
      </section>

      {/* 푸터 */}
      <Footer />
    </div>
  );
};

export default MainPage;
