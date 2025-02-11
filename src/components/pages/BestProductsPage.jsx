import BestProducts from "../main/BestProducts";
import Header from "../header/Header"; // 헤더 컴포넌트
import Footer from "../footer/Footer"; // 푸터 컴포넌트
import CategoryList from "../main/CategoryList";

const BestProductsPage = () => {
  return (
    <>
      <Header /> {/* 헤더 컴포넌트 */}
      <div className="best-products-page">
        <CategoryList /> {/* 카테고리 리스트 */}
        <div className="best-products-content">
          <BestProducts />
        </div>
      </div>
      <Footer /> {/* 푸터 컴포넌트 */}
    </>
  );
};

export default BestProductsPage;
