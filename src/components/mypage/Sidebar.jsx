import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/mypage/Sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <div className="mypage-sidebar">
      <div
        className={`mypage-sidebar-item ${activeItem === 0 ? "active" : ""}`}
        onClick={() => handleItemClick(0)}
      >
        <Link to="/mypage/edit" className="mypage-link">
          <span className="mypage-sidebar-text">계정 정보 수정</span>
        </Link>
      </div>
      <div
        className={`mypage-sidebar-item ${activeItem === 1 ? "active" : ""}`}
        onClick={() => handleItemClick(1)}
      >
        <Link to="/mypage/rental" className="mypage-link">
          <span className="mypage-sidebar-text">대여 내역 조회</span>
        </Link>
      </div>
      <div
        className={`mypage-sidebar-item ${activeItem === 2 ? "active" : ""}`}
        onClick={() => handleItemClick(2)}
      >
        <Link to="/mypage/wishlist" className="mypage-link">
          <span className="mypage-sidebar-text">찜 목록</span>
        </Link>
      </div>
      <div
        className={`mypage-sidebar-item ${activeItem === 3 ? "active" : ""}`}
        onClick={() => handleItemClick(3)}
      >
        <Link to="/mypage/reverse" className="mypage-link">
          <span className="mypage-sidebar-text">상품 회수 서비스</span>
        </Link>
      </div>
      <div
        className={`mypage-sidebar-item ${activeItem === 4 ? "active" : ""}`}
        onClick={() => handleItemClick(4)}
      >
        <Link to="/mypage/points" className="mypage-link">
          <span className="mypage-sidebar-text">적립금 및 회원등급</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
