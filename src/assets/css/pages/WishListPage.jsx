// src/pages/mypage/WishListPage.jsx

import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/mypage/Sidebar";
import WishList from "../../../components/mypage/WishList";
import "../../assets/css/mypage/WishListPage.css";

const WishListPage = () => {
  return (
    <>
      <Header />
      <div className="wishlist-page-layout">
        <div className="wishlist-page-layout__sidebar">
          <Sidebar />
        </div>
        <div className="wishlist-page-layout__content">
          <WishList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishListPage;
