import TodayProducts from "../main/TodayProducts";
import Header from "../header/Header"; // 헤더 컴포넌트
import Footer from "../footer/Footer"; // 푸터 컴포넌트

const TodayProductsPage = () => {
  return (
    <>
      <Header /> {/* 헤더 컴포넌트 */}
      <TodayProducts /> {/* 기존 TodayProducts 컴포넌트 사용 */}
      <Footer /> {/* 푸터 컴포넌트 */}
    </>
  );
};

export default TodayProductsPage;
