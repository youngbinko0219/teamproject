import { Outlet } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
import "../../assets/css/main/MainLayout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Header />
      <main className="content">
        <Outlet /> {/* Nested routes will render here */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
