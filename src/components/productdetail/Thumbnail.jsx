import React, { useState, useEffect } from "react";
import axios from "axios";
import useProductStore from "../../hooks/useProductStore";
import "../../assets/css/productdetail/Thumbnail.css";

const Thumbnail = () => {
  const { product_id, mainImage: storedMainImage } = useProductStore();
  const [mainImage, setMainImage] = useState(storedMainImage);
  const [subImages, setSubImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 요청해서 서브 이미지 가져오기
  useEffect(() => {
    if (!product_id) return; // user_id 없이도 API 요청 가능하도록 수정

    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/products/view/${product_id}`);
        const sub = response.data.images || [];

        if (sub.length > 0) {
          setSubImages(sub); // 서브 이미지 배열 설정
        }
      } catch (err) {
        setError("이미지를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [product_id]);

  return (
    <div className="thumbnail-container">
      {/* 대표 이미지 (zustand에서 가져온 값 유지) */}
      <div className="main-image">
        <img src={mainImage} alt="상품 대표 이미지" />
      </div>

      {/* 서브 이미지 리스트 */}
      {subImages.length > 0 && (
        <div className="sub-images">
          {subImages.map((src, index) => (
            <div
              key={index}
              className="sub-image"
              onMouseEnter={() => setMainImage(src)}
              onMouseLeave={() => setMainImage(storedMainImage)} // 원래 이미지로 돌아오도록 수정
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
