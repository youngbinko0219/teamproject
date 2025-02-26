// src/pages/mypage/GradePage.jsx
import "../../assets/css/mypage/MyPageEditLayout.css";  // 수정 페이지 레이아웃 CSS 임포트
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/mypage/Sidebar";
import Grade from "./Grade";

const GradePage = () => {
  return (
    <>
      <Header />
      <div className="my-page-edit-layout">
        <div className="my-page-edit-layout__sidebar">
          <Sidebar />
        </div>
        <div className="my-page-edit-layout__content">
          <Grade />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GradePage;
