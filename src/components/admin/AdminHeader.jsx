import { useNavigate } from "react-router-dom";
import "../../assets/css/admin/AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // 어드민 로그인 상태 삭제
    navigate("/"); // 메인페이지로 이동
  };

  return (
    <header className="admin-header">
      <h1>관리자 대시보드</h1>
      <div className="admin-actions">
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  );
};

export default AdminHeader;
