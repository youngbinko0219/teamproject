import { Link } from "react-router-dom";
import "../style/Sidebar.css";

const Sidebar = ({ points, userGrade }) => {
  return (
    <div className="sidebar1">
      <div className="sidebar-item">
        <Link to="/mypageedit">
          <span className="sidebar-text">계정 정보 수정</span>
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/rental">
          <span className="sidebar-text">대여 내역 조회</span>
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/wishlist">
          <span className="sidebar-text">찜 목록</span>
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/reverse">
          <span className="sidebar-text">상품 회수 서비스</span>
        </Link>
      </div>
      
      {/* 포인트 및 회원 등급 추가 */}
      <div className="sidebar-item">
        <span className="sidebar-text">적립금 및 회원등급</span>
      </div>
    </div>
  );
};

export default Sidebar;
