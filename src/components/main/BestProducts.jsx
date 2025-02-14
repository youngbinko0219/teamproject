import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ArrowButton from "./ArrowButton"; // 좌우 화살표 버튼
import "../../assets/css/main/BestProducts.css"; // CSS 파일 경로

const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 더미 인기 상품 데이터
  useEffect(() => {
    const fetchBestProducts = async () => {
      const dummyBestProducts = [
        {
          id: 1,
          name: "프리미엄 유모차",
          price: 150000,
          image: "/assets/images/premium-stroller.jpg",
        },
        {
          id: 2,
          name: "고급 아기 침대",
          price: 170000,
          image: "/assets/images/luxury-crib.jpg",
        },
        {
          id: 3,
          name: "프리미엄 기저귀 세트",
          price: 90000,
          image: "/assets/images/premium-diapers.jpg",
        },
        {
          id: 4,
          name: "프리미엄 아기 의자",
          price: 125000,
          image: "/assets/images/luxury-baby-chair.jpg",
        },
      ];
      setBestProducts(dummyBestProducts);
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

  return (
    <section className="best-products-section">
      <h2>베스트 상품</h2>
      <div className="slider-container">
        <ArrowButton direction="left" onClick={handlePrev} />
        <div className="product-slide">
          {bestProducts.length > 0 && (
            <ProductCard product={bestProducts[currentIndex]} />
          )}
        </div>
        <ArrowButton direction="right" onClick={handleNext} />
      </div>
    </section>
  );
};

export default BestProducts;
