// src/pages/mypage/MyPageEdit.jsx
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "./Sidebar";
import MyPageEditForm from "./MyPageEditForm";
import "../../assets/css/mypage/MyPageEditLayout.css";

function MyPageEdit() {
  return (
    <>
      <Header />
      <div className="my-page-edit-layout">
        <div className="my-page-edit-layout__sidebar">
          <Sidebar />
        </div>
        <div className="my-page-edit-layout__content">
          <MyPageEditForm />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPageEdit;
