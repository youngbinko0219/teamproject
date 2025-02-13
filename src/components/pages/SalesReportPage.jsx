import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import SalesReport from "../admin/SalesReport";
import "../../assets/css/pages/SalesReportPage.css";

const SalesReportPage = () => {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <AdminSidebar />
        <div className="main-content">
          <SalesReport />
        </div>
      </div>
    </div>
  );
};

export default SalesReportPage;
