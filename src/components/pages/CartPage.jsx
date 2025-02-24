import Footer from "../footer/Footer";
import Header from "../header/Header";
import CartView from "../mypage/CartView";
import Sidebar from "../mypage/Sidebar";
import "../../assets/css/header/CartPage.css"


function CartPage() {
  return (
    <>
      <Header />
      <div className="cart-layout">
        <div className="cart-layout__sidebar">
          <Sidebar />
        </div>
        <div className="cart-layout__content">
          <CartView />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CartPage;
