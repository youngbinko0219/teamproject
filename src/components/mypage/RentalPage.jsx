// src/pages/rental/RentalPage.jsx
import Footer from "../footer/Footer";
import Header from "../header/Header";
import RentalHistory from "./RentalHistory";
import Sidebar from "./Sidebar";
import "../../assets/css/mypage/RentalPage.css";

function RentalPage() {
  return (
    <>
      <Header />
      <div className="rental-layout">
        <div className="rental-layout__sidebar">
          <Sidebar />
        </div>
        <div className="rental-layout__content">
          <RentalHistory />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RentalPage;
