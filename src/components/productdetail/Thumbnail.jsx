import React, { useState, useEffect } from "react";
import axios from "axios";
import useProductStore from "../../zustand/useProductStore";
import useUserStore from "../../zustand/useUserStore";
import "../../assets/css/productdetail/Thumbnail.css";

const Thumbnail = () => {
  const { product_id, mainImage: storedMainImage } = useProductStore();
  const { user_id } = useUserStore();
  const [mainImage, setMainImage] = useState(storedMainImage);
  const [subImages, setSubImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ API 요청해서 서브 이미지 가져오기
  useEffect(() => {
    if (!product_id || !user_id) return;

    const fetchImages = async () => {
      try {
        console.log(`📡 이미지 API 요청: http://localhost:8080/products/view/${product_id}?user_id=${user_id}`);

        const response = await axios.get(`http://localhost:8080/products/view/${product_id}`, {
          params: { user_id },
        });

        console.log("✅ 서버에서 받은 응답:", response.data); // <-- 여기서 확인!
        const sub = response.data.images || []; // ✅ 서브 이미지 배열 가져오기
        console.log("✅ 서브 이미지 리스트 확인:", sub);
        setSubImages(sub);

        if (response.data.images) {
          setMainImage(response.data.images); // ✅ 메인 이미지 설정
        }
      } catch (err) {
        setError("이미지를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [product_id, user_id]);

  useEffect(() => {
    console.log("📸 현재 서브 이미지 개수:", subImages.length);
  }, [subImages]);

  return (
    <div className="thumbnail-container">
      {/* ✅ 대표 이미지 */}
      <div className="main-image">
        <img src={mainImage} alt="상품 대표 이미지" />
      </div>

      {/* ✅ 서브 이미지 리스트 */}
      {subImages.length > 0 && (
        <div className="sub-images">
          {subImages.map((src, index) => (
            <div
              key={index}
              className="sub-image"
              onMouseEnter={() => setMainImage(src)}
              onMouseLeave={() => setMainImage(storedMainImage)}
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
