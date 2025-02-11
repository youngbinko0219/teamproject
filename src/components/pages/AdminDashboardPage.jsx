import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import ProductManagement from "../admin/ProductManagement";
import StockManagement from "../admin/StockManagement";
import UserManagement from "../admin/UserManagement";
import SalesReport from "../admin/SalesReport";
import UserAnalytics from "../admin/UserAnalytics";
import DashboardOverview from "../admin/DashboardOverview";
import NotificationSettings from "../admin/NotificationSettings";
// import "../../assets/css/admin/AdminDashboardPage.css";

const AdminDashboardPage = () => {
  return (
    <div className="admin-dashboard">
      {/* 헤더 */}
      <AdminHeader />

      <div className="dashboard-content">
        {/* 사이드바 */}
        <AdminSidebar />

        {/* 메인 컨텐츠 */}
        <main className="main-content">
          <DashboardOverview />
          <ProductManagement />
          <StockManagement />
          <UserManagement />
          <SalesReport />
          <UserAnalytics />
          <NotificationSettings />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
