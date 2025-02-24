// src/pages/mypage/MyPageEdit.jsx
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Sidebar from "./Sidebar";
import MyPageEditForm from "./MyPageEditForm";
import "../../assets/css/mypage/MyPageEditLayout.css";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import MyPageLayout from "./MyPageLayout";

function MyPageEdit() {
  return (
<<<<<<< HEAD
    <div className="mypage-edit-layout">
      <Header />
      <MyPageLayout >
      <MyPageEditForm />
      </MyPageLayout>
      <Footer />
    </div>
=======
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
>>>>>>> 5aa5e94b0462cc97334b495313cd51b955cd01b9
  );
}

export default MyPageEdit;
