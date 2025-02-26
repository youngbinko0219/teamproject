// src/components/mypage/Sidebar.jsx
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
  );
};

export default Sidebar;
