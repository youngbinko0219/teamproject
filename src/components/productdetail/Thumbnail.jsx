import React, { useState } from "react";
import "../../assets/css/productdetail/Thumbnail.css";

const Thumbnail = () => {
  const mainImageDefault = "/images/main-placeholder.png"; // 메인 이미지 (기본)
  const subImages = [
    "/images/sub-placeholder1.png",
    "/images/sub-placeholder2.png",
    "/images/sub-placeholder3.png",
  ]; // 서브 이미지 3개

  const [mainImage, setMainImage] = useState(mainImageDefault);

  return (
    <div className="thumbnail-container">
      {/* 메인 이미지 */}
      <div className="main-image">
        <img src={mainImage} alt="상품 메인 이미지" />
      </div>

      {/* 서브 이미지 */}
      <div className="sub-images">
        {subImages.map((src, index) => (
          <div key={index} className="sub-image" onMouseEnter={() => setMainImage(src)}>
            <img src={src} alt={`서브 이미지 ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thumbnail;
