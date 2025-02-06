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
      {/* 메인 배너 */}
      <MainBanner />

      {/* 카테고리 섹션 */}
      <section className="category-section">
        <CategoryList />
      </section>

      {/* 오늘의 상품 섹션 */}
      <section className="today-products-section">
        <ProductSection title="오늘의 상품">
          <TodayProducts />
        </ProductSection>
      </section>

      {/* 베스트 상품 섹션 */}
      <section className="best-products-section">
        <ProductSection title="베스트 상품">
          <BestProducts />
        </ProductSection>
      </section>

      {/* 새로운 상품 섹션 */}
      <section className="new-products-section">
        <ProductSection title="신상품">
          <NewProducts />
        </ProductSection>
      </section>

      {/* 모든 상품 섹션 */}
      <section className="all-products-section">
        <AllProducts />
      </section>
    </div>
  );
};

export default MainPage;
