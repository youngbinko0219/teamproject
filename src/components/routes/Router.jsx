import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import MainPage from "../pages/MainPage";
import ForgotIdPage from "../pages/ForgotIdPage";
import ForgotPwPage from "../pages/ForgotPwPage";
import PrivacyPolicy from "../footer/PrivacyPolicy";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import AdminLoginPage from "../pages/AdminLoginPage";
import ProductManagementPage from "../pages/ProductManagementPage";
import ProductFormPage from "../pages/ProductFormPage";
import StockManagementPage from "../pages/StockManagementPage ";
import SalesReportPage from "../pages/SalesReportPage";
import AdminAdPage from "../pages/AdminAdPage";
import NotFoundPage from "../pages/NotFountPage";
import TermsAgreementPage from "../pages/TermsAgreementPage";
import ProductListPage from "../pages/ProductListPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import ProductListFilterPage from "../pages/ProductListFilterPage";
import ProductAllPage from "../pages/ProductAllPage";
import ProductPopularPage from "../pages/ProductPopularPage";
import ProductTodayPage from "../pages/ProductTodayPage";
import ProductNewPage from "../pages/ProductNewPage";
import MyPageMain from "../mypage/MyPageMain";
import MyPageEdit from "../mypage/MyPageEdit";
import Reverse from "../mypage/Reverse";
import UserManagementPage from "../pages/UserManagementPage";
import AuthHandler from "../auth/AuthHandler";
import { SuccessPage } from "../payment/Success";
import { FailPage } from "../payment/Fail";
import { CheckoutPage } from "../payment/Checkout";
import MessagePage from "../pages/MessagePage";
import RentalHistory from "../mypage/RentalHistory";
import RentalPage from "../mypage/RentalPage";
import CartPage from "../pages/CartPage";
import WishListPage from "../pages/WishListPage";
import GradePage from "../mypage/GradePage";
import TermsOfUse from "../footer/TermsOfUse";
import Contact from "../footer/Contact";
import SearchPage from "../pages/SearchPage";

const AppRouter = () => {
  return (
    <Router>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgotid" element={<ForgotIdPage />} />
        <Route path="/forgotpw" element={<ForgotPwPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/* 푸터 관련 페이지 */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        {/* 마이 페이지 */}
        <Route path="/mypage/edit" element={<MyPageEdit />} />
        <Route path="/mypage/main" element={<MyPageMain />} />
        <Route path="/mypage/rental" element={<RentalPage />} />
        <Route path="/mypage/wishlist" element={<WishListPage />} />
        <Route path="/mypage/more" element={<RentalHistory />} />
        <Route path="/mypage/reverse" element={<Reverse />} />
        <Route path="/mypage/grade" element={<GradePage />} />
        {/* 어드민 로그인 페이지 */}
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/products/regist" element={<ProductFormPage />} />
        <Route path="/admin/products" element={<ProductManagementPage />} />
        <Route path="/admin/stock" element={<StockManagementPage />} />
        <Route path="/admin/users" element={<UserManagementPage />} />
        <Route path="/admin/sales" element={<SalesReportPage />} />
        <Route path="/admin/ad" element={<AdminAdPage />} />
        <Route path="/messages" element={<MessagePage />} />
        {/* 검색 페이지 추가 */}
        <Route path="/search" element={<SearchPage />} />
        {/* 약관 동의 페이지 */}
        <Route path="/terms-agreement" element={<TermsAgreementPage />} />
        {/* 상품 관련 페이지 */}
        <Route path="/products/:category" element={<ProductListPage />} />
        <Route path="/products/view/:product_id" element={<ProductDetailPage />} />
        <Route path="/products/filter/search" element={<ProductListFilterPage />} />
        <Route path="/products/all" element={<ProductAllPage />} />
        <Route path="/products/best" element={<ProductPopularPage />} />
        <Route path="/products/today" element={<ProductTodayPage />} />
        <Route path="/products/new" element={<ProductNewPage />} />
        />
        {/* 토스 샘플 경로 */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<SuccessPage />} />
        <Route path="/checkout/fail" element={<FailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
