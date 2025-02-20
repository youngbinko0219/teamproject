import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import HomePage from "../pages/HomePage";
import MyPageEdit from "../pages/MyPageEdit";
import MyPageMain from "../pages/MyPageMain";
import RentalHistory from "../pages/RentalHistory";
import WishList from "../pages/WishList";
import Reverse from "../pages/Reverse";
import Point from "../pages/Point";
import React from "react";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />{" "}
        <Route path="/" element={<HomePage />} />
        <Route path="/mypageedit" element={<MyPageEdit />} /> 
        <Route path="/mypagemain" element={<MyPageMain />} /> 
        <Route path="/rental" element={<RentalHistory />} /> 
        <Route path="/wishlist" element={<WishList />} /> 
        <Route path="/edit" element={<MyPageEdit />} /> 
        <Route path="/more" element={<RentalHistory />} /> 
        <Route path="/reverse" element={<Reverse />} />
        <Route path="/point" element={<Point />} />
          <Route path="*"
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
