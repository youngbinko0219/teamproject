import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import MainPage from "../pages/MainPage";
import ForgotIdPage from "../pages/ForgotIdPage";
import ForgotPwPage from "../pages/ForgotPwPage";
import PrivacyPolicy from "../footer/PrivacyPolicy";
import TodayProductsPage from "../pages/TodayProductsPage";
import NewProductsPage from "../pages/NewProductsPage";
import BestProductsPage from "../pages/BestProductsPage";
import AllProductsPage from "../pages/AllProductsPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />{" "}
        <Route path="/forgotid" element={<ForgotIdPage />} />
        <Route path="/forgotpw" element={<ForgotPwPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/all-products" element={<AllProductsPage />} />
        <Route path="/new-products" element={<NewProductsPage />} />
        <Route path="/today-products" element={<TodayProductsPage />} />
        <Route path="/best-products" element={<BestProductsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route
          path="*"
          element={
            <div className="text-center mt-5">
              404 - 페이지를 찾을 수 없습니다
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
