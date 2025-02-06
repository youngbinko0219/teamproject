import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // 화살표 아이콘
import "../../assets/css/main/MainBanner.css";

const bannerImages = [
  "../../assets/images/banner1.jpg",
  "/assets/images/banner2.jpg",
  "/assets/images/banner3.jpg",
];

const MainBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 이전 배너로 이동
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  // 다음 배너로 이동
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  return (
    <section className="main-banner">
      <img
        src={bannerImages[currentIndex]}
        alt={`배너 ${currentIndex + 1}`}
        className="banner-image"
      />

      {/* 좌우 화살표 */}
      <button className="nav-button prev" onClick={prevSlide}>
        <FaChevronLeft />
      </button>
      <button className="nav-button next" onClick={nextSlide}>
        <FaChevronRight />
      </button>

      {/* 인디케이터 */}
      <div className="indicators">
        {bannerImages.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default MainBanner;
