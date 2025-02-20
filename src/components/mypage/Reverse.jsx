// src/components/mypage/Reverse.jsx
import MyPageLayout from "./MyPageLayout";
import ReverseForm from "./ReverseForm";
import "../../assets/css/mypage/ReversePage.css";

const Reverse = () => {
  return (
    <MyPageLayout>
      {/* Reverse 페이지의 메인 콘텐츠 */}
      <div className="reverse-page-content">
        <ReverseForm />
      </div>
    </MyPageLayout>
  );
};

export default Reverse;
