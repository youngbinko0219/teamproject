// src/components/mypage/MyPageMain.jsx
import React, { useEffect, useState } from "react";
import useUserStore from "../../hooks/useUserStore";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Dashboard from "./Dashboard";
import LoginSection from "./LoginSection"; // LoginSection 컴포넌트 임포트

const MyPageMain = () => {
  const { userInfo } = useUserStore(); // userInfo 가져오기
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    // userInfo가 업데이트되면 로딩을 종료
    if (userInfo) {
      setLoading(false);
    }
  }, [userInfo]); // userInfo가 변경될 때마다 실행

  return (
    <div>
      <Header />
        <Dashboard />
      <Footer />
    </div>
  );
};

export default MyPageMain;
