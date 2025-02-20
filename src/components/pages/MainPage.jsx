import Header from "../header/Header";
import Footer from "../footer/Footer";
import MainBanner from "../main/MainBanner";
import CategoryList from "../main/CategoryList";
import TodayProducts from "../main/TodayProducts"; // 여기서 'FlashSales'로 이름 변경 가능
import BestProducts from "../main/BestProducts";
import NewProducts from "../main/NewProducts";
import AllProducts from "../main/AllProducts";
import "../../assets/css/main/mainPage.css";
import ProductSection from "../main/ProductSection";

const MainPage = () => {
  return (
    <div className="main-page-container">
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

      {/* 오늘의 상품(Flash Sales) 섹션 */}
      <section className="today-products-section">
        <ProductSection
          buttonProps={{ to: "/today-products", label: "View All Products" }}
        >
          <TodayProducts />
        </ProductSection>
      </section>

      {/* 베스트 상품 섹션 */}
      <section className="best-products-section">
        <ProductSection
          buttonProps={{ to: "/best-products", label: "베스트 상품 보기" }}
        >
          <BestProducts />
        </ProductSection>
      </section>

      {/* 신상품 섹션 */}
      <section className="new-products-section">
        <ProductSection
          buttonProps={{ to: "/new-products", label: "새로운 상품 보기" }}
        >
          <NewProducts />
        </ProductSection>
      </section>

      {/* 모든 상품 섹션 */}
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
