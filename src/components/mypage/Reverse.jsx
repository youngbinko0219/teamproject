// src/components/mypage/Reverse.jsx
import MyPageLayout from "./MyPageLayout";
import ReverseForm from "./ReverseForm";
import "../../assets/css/mypage/ReversePage.css";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Reverse = () => {
  return (
    <>
      <Header />
      <MyPageLayout>
        {/* Reverse 페이지의 메인 콘텐츠 */}
        <div className="reverse-page-content">
          <ReverseForm />
        </div>
      </MyPageLayout>
      <Footer />
    </>
  );
};

export default Reverse;
