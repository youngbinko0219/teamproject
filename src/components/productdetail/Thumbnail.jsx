import React, { useEffect, useState } from "react";
import useProductStore from "../../hooks/useProductStore";
import "../../assets/css/productdetail/Thumbnail.css";

const Thumbnail = ({ product }) => {
  const { mainImage, setMainImage } = useProductStore(); 
  const [originalMainImage, setOriginalMainImage] = useState(mainImage);
  const subImages = product?.images || []; 

  useEffect(() => {
    const storedImage = localStorage.getItem("mainImage");

    // mainImage가 없으면 localStorage에서 가져와서 설정
    if (!mainImage && storedImage) {
      setMainImage(storedImage);
      setOriginalMainImage(storedImage); // 원래 대표 이미지 저장
    }
  }, [mainImage, setMainImage]);

  return (
    <div className="thumbnail-container">
      {/* 대표 이미지 (zustand에서 가져온 값 유지) */}
      <div className="main-image">
        <img src={mainImage || "https://via.placeholder.com/300"} alt="상품 대표 이미지" />
      </div>

      {/* 서브 이미지 리스트 */}
      {subImages.length > 0 && (
        <div className="sub-images">
          {subImages.map((src, index) => (
            <div
              key={index}
              className="sub-image"
              onMouseEnter={() => setMainImage(src)} // 
              onMouseLeave={() => setMainImage(originalMainImage)}
            >
              <img src={src} alt={`서브 이미지 ${index + 1}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Thumbnail;
