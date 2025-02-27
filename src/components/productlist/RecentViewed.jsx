import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "../../assets/css/productlist/RecentViewed.css";

const RecentViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const navigate = useNavigate(); 

  // 최근 본 상품 불러오기
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("recentViewed")) || [];
    setRecentProducts(storedProducts);
  }, []);

  // 상품 클릭하면 해당 상세 페이지로 이동
  const handleProductClick = (product_id) => {
    navigate(`/products/view/${product_id}`);
  };

  return (
    <div className="recent-viewed">
      <img src={logo} alt="BabyLoop" className="recent-logo" />

      {/* 최근 본 상품 목록 */}
      <div className="recent-list">
        {recentProducts.length > 0 ? (
          recentProducts.map((product, index) => (
            <div key={index} className="recent-item" onClick={() => handleProductClick(product.product_id)} style={{ cursor: "pointer" }}>
              <img src={product.images} alt={product.product_name} />
            </div>
          ))
        ) : (
          // 기본값 (회색 박스 5개)
          [...Array(5)].map((_, index) => (
            <div key={index} className="recent-placeholder"></div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentViewed;