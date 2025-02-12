import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import ProductManagement from "../admin/ProductManagement";
import StockManagement from "../admin/StockManagement";
import UserManagement from "../admin/UserManagement";
import SalesReport from "../admin/SalesReport";
import UserAnalytics from "../admin/UserAnalytics";
import DashboardOverview from "../admin/DashboardOverview";
import NotificationSettings from "../admin/NotificationSettings";
import "../../assets/css/pages/AdminDashboardPage.css";

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에서 어드민 로그인 상태 확인
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    if (!isAdmin) {
      navigate("/admin"); // 로그인 페이지로 리다이렉트
    }
  }, [navigate]);

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
