import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainBanner from "../main/MainBanner";
import CategoryList from "../main/CategoryList";
import TodayProducts from "../main/TodayProducts";
import BestProducts from "../main/BestProducts";
import NewProducts from "../main/NewProducts";
import AllProducts from "../main/AllProducts";
import ProductSection from "../main/ProductSection";
import RecentViewed from "../productlist/RecentViewed"; // 우측에 붙일 최근 본 상품
import "../../assets/css/main/mainPage.css";

const MainPage = () => {
  return (
    <div className="main-page-container">
      <Header />

      {/* 상단 레이아웃 (좌: 카테고리 / 중: 메인배너 / 우: 최근 본 상품) */}
      <div className="top-layout">
        <aside className="left-section">
          <CategoryList />
        </aside>

        <div className="center-section">
          <MainBanner />
        </div>

        <aside className="right-section">
          <RecentViewed />
        </aside>
      </div>

      {/* 하단 상품 섹션 */}
      <section className="today-products-section">
        <ProductSection
          buttonProps={{ to: "/today-products", label: "View All Products" }}
        >
          <TodayProducts />
        </ProductSection>
      </section>

      <section className="best-products-section">
        <ProductSection
          buttonProps={{ to: "/best-products", label: "베스트 상품 보기" }}
        >
          <BestProducts />
        </ProductSection>
      </section>

      <section className="new-products-section">
        <ProductSection
          buttonProps={{ to: "/new-products", label: "새로운 상품 보기" }}
        >
          <NewProducts />
        </ProductSection>
      </section>

      <section className="all-products-section">
        <ProductSection
          buttonProps={{ to: "/all-products", label: "모든 상품 보기" }}
        >
          <AllProducts />
        </ProductSection>
      </section>

      <Footer />
    </div>
  );
};

export default MainPage;
