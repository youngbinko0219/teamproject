import BestProducts from "../main/BestProducts";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CategoryList from "../main/CategoryList";
import "../../assets/css/pages/BestProductsPage.css";

const BestProductsPage = () => {
  return (
    <>
      <Header />
      <div className="best-products-page">
        {/* 좌측 카테고리 */}
        <div className="category-list">
          <CategoryList />
        </div>
        {/* 우측 베스트 상품 섹션 */}
        <div className="best-products-content">
          <BestProducts />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BestProductsPage;
