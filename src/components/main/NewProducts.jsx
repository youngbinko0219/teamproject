import { useEffect, useState } from "react";
import "../../assets/css/main/NewProducts.css";

const NewProducts = () => {
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    // 더미 신상품 데이터
    const fetchNewProducts = async () => {
      const dummyNewProducts = [
        {
          id: 1,
          name: "PlayStation 5",
          price: 499000,
          image: "/assets/images/ps5.jpg",
          description: "Explore the new generation of PlayStation",
        },
        {
          id: 2,
          name: "Women's Collections",
          price: 200000,
          image: "/assets/images/women-collection.jpg",
          description: "Featured women collections that give you another vibe",
        },
        {
          id: 3,
          name: "Speakers",
          price: 150000,
          image: "/assets/images/speakers.jpg",
          description: "Amazon wireless speaker",
        },
        {
          id: 4,
          name: "Perfume",
          price: 120000,
          image: "/assets/images/perfume.jpg",
          description: "Gucci Intense Oud Perfume",
        },
      ];
      setNewProducts(dummyNewProducts);
    };

    fetchNewProducts();
  }, []);

  return (
    <section className="new-arrivals-section">
      {/* 상단 Featured 배지 + New Arrival 타이틀 */}
      <div className="featured-badge">Featured</div>
      <h2 className="section-title">새로운 상품</h2>

      {/* 2×2 그리드로 상품 배치 */}
      <div className="new-arrivals-grid">
        {newProducts.map((product, index) => (
          <div
            key={product.id}
            className={`new-arrival-card card-${index + 1}`}
            style={{ backgroundImage: `url(${product.image})` }}
          >
            {/* 이미지 오버레이 영역 */}
            <div className="overlay">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button className="shop-now-btn">Shop Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewProducts;
