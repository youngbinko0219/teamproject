// import "../../assets/css/admin/StockManagement.css";

const StockManagement = () => {
  return (
    <div className="stock-management">
      <h2>재고 관리</h2>
      <div className="stock-list">
        {/* 재고 데이터 매핑 */}
        <div className="stock-item">
          <span>상품 1: 50개</span>
          <button>알림 설정</button>
        </div>
      </div>
    </div>
  );
};

export default StockManagement;
