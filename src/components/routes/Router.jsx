import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import MainPage from "../pages/MainPage";
import AllProducts from "../main/AllProducts";
import BestProducts from "../main/BestProducts";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />{" "}
        <Route path="/" element={<MainPage />} />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/best-products" element={<BestProducts />} />
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
