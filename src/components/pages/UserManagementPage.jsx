import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import UserManagement from "../admin/UserManagement";
import "../../assets/css/pages/UserManagementPage.css";

const UserManagementPage = () => {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <AdminSidebar />
        <div className="main-content">
          <UserManagement />
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
