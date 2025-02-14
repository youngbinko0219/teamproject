import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import MainAd from "../admin/MainAd";
// import "../../assets/css/pages/AdminAdPage.css";

const AdminAdPage = () => {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <AdminSidebar />
        <div className="main-content">
          <MainAd />
        </div>
      </div>
    </div>
  );
};

export default AdminAdPage;
