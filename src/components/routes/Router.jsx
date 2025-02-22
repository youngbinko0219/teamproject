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
import SalesReportPage from "../pages/SalesReportPage";
import AdminAdPage from "../pages/AdminAdPage";
import CheckoutPage from "../pages/CheckoutPage";
import PaymentSuccessPage from "../pages/PaymentSuccessPage";
import PaymentReceiptPage from "../pages/PaymentReceiptPage";
import MessagesPage from "../pages/MessagePage";
import NotFoundPage from "../pages/NotFountPage";
import SearchPage from "../pages/SearchPage";
import TermsAgreementPage from "../pages/TermsAgreementPage";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import Point from "../mypage/Point";
import MyPageMain from "../mypage/MyPageMain";
import RentalHistory from "../mypage/RentalHistory1";
import MyPageEdit from "../mypage/MyPageEdit";
import WishList from "../mypage/WishList";
import Reverse from "../mypage/Reverse";
import UserManagementPage from "../pages/UserManagementPage";
import AuthHandler from "../auth/AuthHandler";

const AppRouter = () => {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/mypage/main" element={<MyPageMain />} />
        <Route path="/mypage/rental" element={<RentalHistory />} />
        <Route path="/mypage/wishlist" element={<WishList />} />
        <Route path="/mypage/more" element={<RentalHistory />} />
        <Route path="/mypage/reverse" element={<Reverse />} />
        <Route path="/mypage/point" element={<Point />} />
        <Route path="/forgotid" element={<ForgotIdPage />} />
        <Route path="/forgotpw" element={<ForgotPwPage />} />
        <Route path="/all-products" element={<AllProductsPage />} />
        <Route path="/new-products" element={<NewProductsPage />} />
        <Route path="/today-products" element={<TodayProductsPage />} />
        <Route path="/best-products" element={<BestProductsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* 어드민 로그인 페이지 */}
        <Route path="/admin" element={<AdminLoginPage />} />
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
        <Route path="/messages" element={<MessagesPage />} />
        {/* 검색 페이지 추가 */}
        <Route path="/search" element={<SearchPage />} />
        {/* 약관 동의 페이지 */}
        <Route path="/terms-agreement" element={<TermsAgreementPage />} />
        {/* 상품 관련 페이지 */}
        <Route path="/products/:category" element={<ProductListPage />} />
        <Route path="/products/view/:product_id" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
