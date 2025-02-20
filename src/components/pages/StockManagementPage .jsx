import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import StockManagement from "../admin/StockManagement";
import "../../assets/css/pages/StockManagementPage.css"; // 필요 시 스타일 파일 추가

const StockManagementPage = () => {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <AdminSidebar />
        <div className="main-content">
          <StockManagement />
        </div>
      </div>
    </div>
  );
};

export default StockManagementPage;
