import { useEffect, useState } from "react";
import axios from "axios";
import ArrowButton from "./ArrowButton"; // 좌우 화살표 버튼 컴포넌트
import "../../assets/css/main/BestProducts.css";

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/products/best-products"
        );
        // API 응답이 배열 형태라고 가정
        const data = Array.isArray(response.data) ? response.data : [];
        setBestProducts(data);
      } catch (error) {
        console.error("베스트 상품 불러오기 실패:", error);
      }
    };
    fetchBestProducts();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bestProducts.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bestProducts.length);
  };

  const product = bestProducts[currentIndex];

  return (
    <section className="best-products-section">
      {/* 상단 헤더: 배지와 타이틀 */}
      <div className="best-products-header">
        <div className="badge">이번 달</div>
        <h2>베스트 상품</h2>
      </div>

      {/* 슬라이더 영역 */}
      <div className="slider-container">
        <ArrowButton direction="left" onClick={handlePrev} />
        <div className="product-slide">
          {product && (
            <div className="best-product-card">
              <img src={product.images} alt={product.product_name} />
              <h3 className="product-name">{product.product_name}</h3>
              <div className="product-price">
                <span className="price">
                  {product.price.toLocaleString()}원
                </span>
              </div>
            </div>
          )}
        </div>
        <ArrowButton direction="right" onClick={handleNext} />
      </div>

      {/* 슬라이더 하단에 View All 버튼 배치 */}
      <button className="view-all-btn">베스트 상품 보기</button>
    </section>
  );
};

export default BestProducts;
