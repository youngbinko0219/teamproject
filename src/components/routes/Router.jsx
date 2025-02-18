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
import AdminLoginPage from "../pages/AdminLoginPage";
import ProductManagementPage from "../pages/ProductManagementPage";
import ProductFormPage from "../pages/ProductFormPage";
import StockManagementPage from "../pages/StockManagementPage ";
import UserManagementPage from "../pages/UserManagement";
import SalesReportPage from "../pages/SalesReportPage";
import AdminAdPage from "../pages/AdminAdPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import PaymentReceiptPage from "../pages/PaymentReceiptPage";

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
        <Route path="/admin" element={<AdminLoginPage />} />{" "}
        {/* 어드민 로그인 페이지 */}
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/products/regist" element={<ProductFormPage />} />
        <Route path="/admin/products" element={<ProductManagementPage />} />
        <Route path="/admin/stock" element={<StockManagementPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/sales" element={<SalesReportPage />} />
        <Route path="/admin/ad" element={<AdminAdPage />} />
        {/* 결제 관련 페이지 */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
        <Route path="/payment/receipt" element={<PaymentReceiptPage />} />
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
