import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // 별 아이콘
import ArrowButton from "./ArrowButton"; // 좌우 화살표 버튼
import "../../assets/css/main/BestProducts.css";

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 더미 데이터
    const dummyBestProducts = [
      {
        id: 1,
        name: "The north coat",
        discount: 20,
        oldPrice: 260,
        newPrice: 240,
        image: "/assets/images/coat.jpg",
        rating: 4.5,
        reviews: 65,
      },
      {
        id: 2,
        name: "Gucci duffle bag",
        discount: 15,
        oldPrice: 960,
        newPrice: 816,
        image: "/assets/images/gucci.jpg",
        rating: 4.0,
        reviews: 45,
      },
      {
        id: 3,
        name: "RGB liquid CPU cooler",
        discount: 30,
        oldPrice: 300,
        newPrice: 210,
        image: "/assets/images/cooler.jpg",
        rating: 4.8,
        reviews: 85,
      },
      {
        id: 4,
        name: "Small BookShelf",
        discount: 5,
        oldPrice: 380,
        newPrice: 361,
        image: "/assets/images/bookshelf.jpg",
        rating: 4.7,
        reviews: 30,
      },
    ];
    setBestProducts(dummyBestProducts);
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
              <img src={product.image} alt={product.name} />
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                <span className="old-price">${product.oldPrice}</span>
                <span className="new-price">${product.newPrice}</span>
                <span className="discount">-{product.discount}%</span>
              </div>
              <div className="rating">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    color={i < Math.round(product.rating) ? "#ff7f7f" : "#ccc"}
                  />
                ))}
                <span className="reviews">({product.reviews})</span>
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
