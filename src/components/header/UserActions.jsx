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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <div className="user-actions">
      {isLoggedIn ? (
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
          <button className="logout-button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login" className="auth-link login-link">
            로그인
          </Link>
          &nbsp;
          <Link to="/signup" className="auth-link signup-link">
            회원가입
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserActions;
