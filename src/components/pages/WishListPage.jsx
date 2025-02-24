import Footer from "../footer/Footer";
import Header from "../header/Header";
import Sidebar from "../mypage/Sidebar";
import WishList from "../mypage/WishList";
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
