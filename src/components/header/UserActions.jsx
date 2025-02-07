import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import "../../assets/css/header/UserActions.css";

const UserActions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // JWT 토큰 존재 여부 체크
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="user-actions">
      {isLoggedIn ? (
        // 로그인 상태: 아이콘 표시
        <div className="logged-in-icons">
          <Link to="/wishlist" className="icon-link">
            <FaHeart className="action-icon" />
          </Link>
          <Link to="/cart" className="icon-link">
            <FaShoppingCart className="action-icon" />
          </Link>
          <Link to="/mypage" className="icon-link">
            <FaUser className="action-icon" />
          </Link>
        </div>
      ) : (
        // 비로그인 상태: 로그인/회원가입 버튼
        <div className="auth-buttons">
          <Link to="/login" className="auth-link">
            로그인
          </Link>
          <Link to="/signup" className="auth-link">
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserActions;
