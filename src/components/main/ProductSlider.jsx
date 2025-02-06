import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../assets/css/main/ProductSlider.css";

const sampleProducts = [
  { id: 1, name: "유모차", image: "/assets/images/product1.jpg" },
  { id: 2, name: "카시트", image: "/assets/images/product2.jpg" },
  { id: 3, name: "아기침대", image: "/assets/images/product3.jpg" },
  { id: 4, name: "젖병소독기", image: "/assets/images/product4.jpg" },
  { id: 5, name: "장난감", image: "/assets/images/product5.jpg" },
];

const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleProducts = 3; // 한 번에 보여줄 상품 개수

  const nextSlide = () => {
    if (currentIndex < sampleProducts.length - visibleProducts) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="product-slider">
      <button className="slider-button prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <div className="product-list">
        {sampleProducts
          .slice(currentIndex, currentIndex + visibleProducts)
          .map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <p className="product-name">{product.name}</p>
            </div>
          ))}
      </div>
      <button className="slider-button next" onClick={nextSlide}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ProductSlider;
