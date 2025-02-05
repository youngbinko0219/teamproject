import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProductDetailPage from "../pages/ProductDetailPage"; // 상세 페이지 추가

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} /> {/* 상세 페이지 경로 설정 */}
        <Route
          path="*"
          element={<div className="text-center mt-5">404 - 페이지를 찾을 수 없습니다</div>}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;

