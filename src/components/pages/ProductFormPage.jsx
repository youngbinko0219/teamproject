import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import ProductForm from "../admin/ProductForm";
import "../../assets/css/pages/ProductFormPage.css";

const ProductFormPage = () => {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <AdminSidebar />
        <div className="main-content">
          <h2>상품 등록</h2>
          <ProductForm />
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;
