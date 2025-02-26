import Header from "../header/Header"; // 헤더 컴포넌트
import Footer from "../footer/Footer"; // 푸터 컴포넌트
import AllProducts from "../main/AllProducts";
import CategoryList from "../main/CategoryList";
import RecentViewed from "../productlist/RecentViewed";
import "../../assets/css/pages/AllProductsPage.css";

const AllProductsPage = () => {
  return (
    <>
      <Header /> {/* 헤더 컴포넌트 */}
      <div className="all-products-page-container">
        <div className="top-layout">
          {/* 좌측: 카테고리 리스트 */}
          <aside className="left-section">
            <CategoryList />
          </aside>

          {/* 중앙: 모든 상품 */}
          <div className="center-section">
            <AllProducts />
          </div>

          {/* 우측: 최근 본 상품 */}
          <aside className="right-section">
            <RecentViewed />
          </aside>
        </div>
      </div>
      <Footer /> {/* 푸터 컴포넌트 */}
    </>
  );
};

export default AllProductsPage;
