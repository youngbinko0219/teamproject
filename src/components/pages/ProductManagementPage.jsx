import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import ProductManagement from "../admin/ProductManagement";
// import "../../assets/css/admin/ProductManagementPage.css"; // 필요 시 별도의 스타일 파일 추가

const ProductManagementPage = () => {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <AdminSidebar />
        <div className="main-content">
          <ProductManagement />
        </div>
      </div>
    </div>
  );
};

export default ProductManagementPage;
