import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.png";
import "../../assets/css/productlist/RecentViewed.css";

const RecentViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  // 최근 본 상품 불러오기 (로컬 스토리지 or API 연동)
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("recentProducts")) || [];
    setRecentProducts(storedProducts);
  }, []);

  return (
    <div className="recent-viewed">
      <img src={logo} alt="BabyLoop" className="recent-logo" />

      {/* 최근 본 상품 목록 */}
      <div className="recent-list">
        {recentProducts.length > 0 ? (
          recentProducts.map((product, index) => (
            <div key={index} className="recent-item">
              <img src={product.image} alt={product.name} />
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
