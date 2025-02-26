import NewProducts from "../main/NewProducts";
import CategoryList from "../main/CategoryList";
import Header from "../header/Header"; // 헤더 컴포넌트
import Footer from "../footer/Footer"; // 푸터 컴포넌트
import RecentViewed from "../productlist/RecentViewed"; // 최근 본 상품 컴포넌트
import "../../assets/css/pages/NewProductsPage.css"; // 새 CSS 파일

const NewProductsPage = () => {
  return (
    <>
      <Header /> {/* 헤더 컴포넌트 */}
      <div className="new-products-page-container">
        <div className="top-layout">
          {/* 좌측: 카테고리 리스트 */}
          <aside className="left-section">
            <CategoryList />
          </aside>

          {/* 중앙: 신상품 콘텐츠 */}
          <div className="center-section">
            <NewProducts />
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

export default NewProductsPage;
