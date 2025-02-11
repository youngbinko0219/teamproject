// import "../../assets/css/admin/AdminHeader.css";

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <h1>관리자 대시보드</h1>
      <div className="admin-actions">
        <button>알림</button>
        <button>로그아웃</button>
      </div>
    </header>
  );
};

export default AdminHeader;
