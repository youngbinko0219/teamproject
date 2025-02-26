import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../../assets/css/main/MainBanner.css";
import axios from "axios";

const MainBanner = () => {
  const [bannerImages, setBannerImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // 백엔드에서 광고 배너 목록 가져오기
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/ad-settings"
        );
        if (response.data.message === "success") {
          setBannerImages(response.data.data.banners || []);
        }
      } catch (error) {
        console.error("배너 불러오기 오류:", error);
      }
    };

    fetchBanners();
  }, []);

  // 3초마다 자동 슬라이드
  useEffect(() => {
    if (bannerImages.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerImages]);

  // 이전 배너
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  // 다음 배너
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  return (
    <section className="main-banner-container">
      {bannerImages.length > 0 ? (
        <>
          {/* 현재 인덱스의 이미지를 표시 */}
          <img
            src={bannerImages[currentIndex]}
            alt={`배너 ${currentIndex + 1}`}
            className="main-banner-image"
          />

          {/* 왼쪽 화살표 버튼 */}
          <button
            className="main-banner-button main-banner-button-prev"
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </button>

          {/* 오른쪽 화살표 버튼 */}
          <button
            className="main-banner-button main-banner-button-next"
            onClick={nextSlide}
          >
            <FaChevronRight />
          </button>

          {/* 인디케이터 (슬라이드 점) */}
          <div className="main-banner-indicators">
            {bannerImages.map((_, index) => (
              <span
                key={index}
                className={`main-banner-indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </>
      ) : (
        <p>배너 이미지가 없습니다.</p>
      )}
    </section>
  );
};

export default MainBanner;
