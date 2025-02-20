import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/main/NewProducts.css";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get("/products/all");
        // 반환된 데이터가 배열인지 확인 (배열이 아니면 빈 배열 사용)
        const allProducts = Array.isArray(response.data) ? response.data : [];
        // 최신 상품 12개를 선택 (데이터가 최신순으로 정렬되어 있다고 가정)
        const latest12 = allProducts.slice(0, 12);
        setNewProducts(latest12);
      } catch (error) {
        console.error("신상품 불러오기 실패:", error);
        setNewProducts([]);
      }
    };

    fetchNewProducts();
  }, []);

  // 3초마다 슬라이드 전환 (총 3슬라이드: 12개 / 4개씩)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // newProducts가 배열인지 확인하고, 해당 슬라이드에 해당하는 4개 상품 선택
  const displayedProducts = Array.isArray(newProducts)
    ? newProducts.slice(currentSlide * 4, currentSlide * 4 + 4)
    : [];

  return (
    <section className="new-arrivals-section">
      <div className="featured-badge">Featured</div>
      <h2 className="section-title">새로운 상품</h2>
      <div className="new-arrivals-grid">
        {displayedProducts.map((product, index) => (
          <div
            key={product.product_id || index}
            className={`new-arrival-card card-${index + 1}`}
            style={{ backgroundImage: `url(${product.images})` }}
          >
            <div className="overlay">
              <h3>{product.product_name}</h3>
              <p>{product.description || ""}</p>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewProducts;
