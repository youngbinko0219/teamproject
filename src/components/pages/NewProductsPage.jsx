import NewProducts from "../main/NewProducts";
import CategoryList from "../main/CategoryList";
import Header from "../header/Header"; // 헤더 컴포넌트
import Footer from "../footer/Footer"; // 푸터 컴포넌트

const NewProductsPage = () => {
  return (
    <>
      <Header /> {/* 헤더 컴포넌트 */}
      <div className="new-products-page">
        <CategoryList /> {/* 카테고리 리스트 */}
        <div className="new-products-content">
          <NewProducts /> {/* 기존 NewProducts 컴포넌트 사용 */}
        </div>
      </div>
      <Footer /> {/* 푸터 컴포넌트 */}
    </>
  );
};

export default NewProductsPage;
