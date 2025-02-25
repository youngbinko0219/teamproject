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
        const allProducts = Array.isArray(response.data) ? response.data : [];
        const latest12 = allProducts.slice(0, 12);
        setNewProducts(latest12);
      } catch (error) {
        console.error("신상품 불러오기 실패:", error);
        setNewProducts([]);
      }
    };

    fetchNewProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const displayedProducts = Array.isArray(newProducts)
    ? newProducts.slice(currentSlide * 4, currentSlide * 4 + 4)
    : [];

  return (
    <section className="new-products-section">
      <h2 className="new-products-title">새로운 상품</h2>
      <div className="new-products-grid">
        {displayedProducts.map((product, index) => (
          <div
            key={product.product_id || index}
            className={`new-product-card card-${index + 1}`}
            style={{ backgroundImage: `url(${product.images})` }}
          >
            <div className="new-product-overlay">
              <h3>{product.product_name}</h3>
              <p>{product.description || ""}</p>
              <button className="new-product-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewProducts;
