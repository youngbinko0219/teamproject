import { Link } from "react-router-dom";
import "../style/Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar1">
      <div className="sidebar-item">
        <Link to='/mypageedit'>
        <span className="sidebar-text">계정 정보 수정</span>
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to='/rental'>
        <span className="sidebar-text">대여 내역 조회</span>
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to='/wishlist'>
        <span className="sidebar-text">찜 목록</span>
        </Link>
      </div>
      <div className="sidebar-item">
        
        <Link to='/reverse'>
        <span className="sidebar-text">상품 회수 서비스</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
