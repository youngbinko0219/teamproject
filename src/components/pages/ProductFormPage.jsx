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
        {/* 메인 콘텐츠와 제목을 감싸는 래퍼 */}
        <div className="main-content-wrapper">
          <h2 className="page-title">상품 등록</h2>
          <div className="main-content">
            <ProductForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;
