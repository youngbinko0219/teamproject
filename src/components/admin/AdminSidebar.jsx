import { Link } from "react-router-dom";
import "../../assets/css/admin/AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <ul>
        <li>
          <Link to="/admin/dashboard">대시보드</Link>
        </li>
        <li>
          <Link to="/admin/products">상품 관리</Link>
        </li>
        <li>
          <Link to="/admin/stock">재고 관리</Link>
        </li>
        <li>
          <Link to="/admin/users">회원 관리</Link>
        </li>
        <li>
          <Link to="/admin/sales">판매 리포트</Link>
        </li>
        <li>
          <Link to="/admin/analytics">가입 현황</Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
