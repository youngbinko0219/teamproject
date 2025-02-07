import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import MyPageEdit from "../pages/MyPageEdit";
import MyPageMain from "../pages/MyPageMain";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />{" "}
        <Route path="/" element={<HomePage />} />
        <Route path="/mypageedit" element={<MyPageEdit />} /> 
        <Route path="/mypagemain" element={<MyPageMain />} /> 
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
