import Header from "../header/Header"; // 헤더 컴포넌트
import Footer from "../footer/Footer"; // 푸터 컴포넌트
import AllProducts from "../main/AllProducts";

const AllProductsPage = () => {
  return (
    <>
      <Header /> {/* 헤더 컴포넌트 */}
      <AllProducts /> {/* 기존 NewProducts 컴포넌트 사용 */}
      <Footer /> {/* 푸터 컴포넌트 */}
    </>
  );
};

export default AllProductsPage;
