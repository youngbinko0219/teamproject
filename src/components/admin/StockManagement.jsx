import { useEffect, useState } from "react";
import "../../assets/css/admin/StockManagement.css";
import axios from "axios";

const StockManagement = () => {
  const [products, setProducts] = useState([]);
  const [thresholds, setThresholds] = useState({});

  // 백엔드에서 제품 정보를 가져오는 함수
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/admin/products");
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching product information:", error);
      }
    };
    fetchProducts();
  }, []);

  // 각 제품의 알림 임계치 변경 핸들러
  const handleThresholdChange = (productId, value) => {
    setThresholds((prev) => ({ ...prev, [productId]: value }));
  };

  // 알림 설정 버튼 클릭 처리 함수
  const handleSetNotification = async (productId) => {
    const threshold = thresholds[productId];
    if (threshold === undefined || threshold === "") {
      alert("알림 임계치를 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        `/admin/product/${productId}/set-notification`,
        { threshold: parseInt(threshold, 10) }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error setting notification:", error);
      alert("알림 설정에 실패했습니다.");
    }
  };

  return (
    <div className="stock-management">
      <h2>재고 관리</h2>
      <div className="stock-list">
        {products.map((product) => (
          <div key={product.id} className="stock-item">
            <span>
              {product.productName}: {product.stock}개
            </span>
            <input
              type="number"
              placeholder="알림 임계치"
              value={thresholds[product.id] || ""}
              onChange={(e) =>
                handleThresholdChange(product.id, e.target.value)
              }
              style={{ width: "100px", marginRight: "10px" }}
            />
            <button onClick={() => handleSetNotification(product.id)}>
              알림 설정
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockManagement;
