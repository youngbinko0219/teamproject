import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa"; // 쪽지함 아이콘
import "../../assets/css/admin/AdminHeader.css";

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin"); // 어드민 로그인 상태 삭제
    navigate("/"); // 메인페이지로 이동
  };

  const handleMessages = () => {
    navigate("/messages"); // 쪽지함 페이지로 이동(라우트는 상황에 맞게 수정)
  };

  return (
    <header className="admin-header">
      <h1>관리자 대시보드</h1>
      <div className="admin-actions">
        {/* 쪽지함 아이콘 버튼 */}
        <button onClick={handleMessages} className="messages-button">
          <FaEnvelope style={{ marginRight: "5px" }} />
          쪽지함
        </button>
        {/* 로그아웃 버튼 */}
        <button onClick={handleLogout}>로그아웃</button>
      </div>
    </header>
  );
};

export default AdminHeader;
