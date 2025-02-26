import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Link import 추가
import "../../assets/css/main/NewProducts.css";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchNewProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products/new");
        if (response.data.message === "success") {
          // 최신 상품 12개를 사용
          const latest12 = response.data.data.slice(0, 12);
          setNewProducts(latest12);
        } else {
          setNewProducts([]);
        }
      } catch (error) {
        console.error("신상품 불러오기 실패:", error);
        setNewProducts([]);
      }
    };

    fetchNewProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // 슬라이드 인덱스는 0~2 (각 슬라이드 당 4개 상품)
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 현재 슬라이드에 해당하는 4개 상품 선택
  const displayedProducts = Array.isArray(newProducts)
    ? newProducts.slice(currentSlide * 4, currentSlide * 4 + 4)
    : [];

  return (
    <section className="new-products-section">
      <h2 className="new-products-title">새로운 상품</h2>
      <div className="new-products-grid">
        {displayedProducts.map((product, index) => (
          <Link
            key={product.productId || index}
            to={`/products/view/${product.productId}`}
            className="new-product-link"
          >
            <div
              className={`new-product-card card-${index + 1}`}
              style={{ backgroundImage: `url(${product.mainImage})` }}
            >
              <div className="new-product-overlay">
                <h3>{product.productName}</h3>
                <p>{product.category}</p>
                <button className="new-product-btn">Shop Now</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewProducts;
