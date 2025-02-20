// src/components/mypage/Sidebar.jsx
import { Link } from "react-router-dom";
import "../../assets/css/mypage/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="mypage-sidebar">
      <div className="mypage-sidebar-item">
        <Link to="/mypage/edit">
          <span className="mypage-sidebar-text">계정 정보 수정</span>
        </Link>
      </div>
      <div className="mypage-sidebar-item">
        <Link to="/mypage/rental">
          <span className="mypage-sidebar-text">대여 내역 조회</span>
        </Link>
      </div>
      <div className="mypage-sidebar-item">
        <Link to="/mypage/wishlist">
          <span className="mypage-sidebar-text">찜 목록</span>
        </Link>
      </div>
      <div className="mypage-sidebar-item">
        <Link to="/mypage/reverse">
          <span className="mypage-sidebar-text">상품 회수 서비스</span>
        </Link>
      </div>
      <div className="mypage-sidebar-item">
        <span className="mypage-sidebar-text">적립금 및 회원등급</span>
      </div>
    </div>
  );
};

export default Sidebar;
