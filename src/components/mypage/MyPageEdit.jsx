import MyPageEditForm from "./MyPageEditForm";
import "../../assets/css/mypage/MyPageEditLayout.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MyPageLayout from "./MyPageLayout";

function MyPageEdit() {
  return (
    <div className="mypage-edit-layout">
      <Header />
      <MyPageLayout >
      <MyPageEditForm />
      </MyPageLayout>
      <Footer />
    </div>
  );
}

export default MyPageEdit;
