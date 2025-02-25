import React, { useEffect, useState } from "react";
import axios from "axios";
import useProductStore from "../../hooks/useProductStore";
import PropTypes from "prop-types";
import "../../assets/css/productdetail/Content.css";

const Content = () => {
  const [descriptionImage, setDescriptionImage] = useState(null);
  const { product_id } = useProductStore();

  useEffect(() => {
    console.log("현재 product_id:", product_id); // 🔍 product_id 값 확인
  
    if (!product_id) {
      console.error("❌ product_id가 없습니다!");
      return; // product_id가 없으면 API 호출 안 함
    }
  
    axios
      .get(`http://localhost:8080/products/${product_id}/desc`)
      .then((response) => {
        console.log("✅ API 응답 데이터:", response.data);
        setDescriptionImage(response.data.images);
      })
      .catch((error) => {
        console.error("❌ API 호출 실패:", error);
      });
  }, [product_id]);
  
  

  return (
    <div className="product-detail-content">
      {descriptionImage ? (
        <img src={descriptionImage} alt="상품 상세 설명 이미지" className="detail-image" />
      ) : (
        <p className="no-image-text">상품 상세 이미지가 없습니다.</p>
      )}
    </div>
  );
};

Content.propTypes = {
  product_id: PropTypes.number.isRequired, 
};

export default Content;
