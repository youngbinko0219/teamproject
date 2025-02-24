import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUserEdit,
  FaHistory,
  FaHeart,
  FaBoxOpen,
  FaCoins,
} from "react-icons/fa"; // 예시 아이콘들
import "../../assets/css/mypage/Sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
<<<<<<< HEAD
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
=======
    <aside className="mypage-sidebar">
      <ul className="mypage-sidebar-list">
        <li className="mypage-sidebar-item">
          <Link to="/mypage/edit" className="mypage-sidebar-link">
            <FaUserEdit className="mypage-sidebar-icon" />
            계정 정보 수정
          </Link>
        </li>
        <li className="mypage-sidebar-item">
          <Link to="/mypage/rental" className="mypage-sidebar-link">
            <FaHistory className="mypage-sidebar-icon" />
            대여 내역 조회
          </Link>
        </li>
        <li className="mypage-sidebar-item">
          <Link to="/mypage/wishlist" className="mypage-sidebar-link">
            <FaHeart className="mypage-sidebar-icon" />찜 목록
          </Link>
        </li>
        <li className="mypage-sidebar-item">
          <Link to="/mypage/reverse" className="mypage-sidebar-link">
            <FaBoxOpen className="mypage-sidebar-icon" />
            상품 회수 서비스
          </Link>
        </li>
        <li className="mypage-sidebar-item">
          <Link to="/mypage/grade" className="mypage-sidebar-link">
            <FaCoins className="mypage-sidebar-icon" />
            적립금 및 회원등급
          </Link>
        </li>
      </ul>
    </aside>
>>>>>>> 5aa5e94b0462cc97334b495313cd51b955cd01b9
  );
};

export default Sidebar;
