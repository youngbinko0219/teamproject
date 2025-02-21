import { useState } from "react";
import PropTypes from "prop-types";
import "../../assets/css/productdetail/Thumbnail.css";

// 기본 대체 이미지
const DEFAULT_IMAGE = "https://via.placeholder.com/680x510?text=No+Image";

/**
 * `Thumbnail` 컴포넌트
 * - 대표 이미지(`mainImage`)와 서브 이미지(`subImages`).
 * - 서브 이미지에 마우스를 올리면 대표 이미지가 변경됨.
 * - 대표 이미지가 없을 경우 기본 대체 이미지 표시.
 */
const Thumbnail = ({ mainImage, subImages = [] }) => {
  const [hoverImage, setHoverImage] = useState(mainImage || DEFAULT_IMAGE); // ✅ 기본값 설정

  return (
    <div className="thumbnail-container">
      {/* 대표 이미지 (hover 상태 반영) */}
      <div className="main-image">
        <img src={hoverImage} alt="상품 대표 이미지" />
      </div>

      {/* 서브 이미지 리스트 (없을 경우 기본 제공) */}
      <div className="sub-images">
        {(subImages.length > 0
          ? subImages
          : [DEFAULT_IMAGE, DEFAULT_IMAGE, DEFAULT_IMAGE]
        ).map((src, index) => (
          <div
            key={index}
            className="sub-image"
            onMouseEnter={() => setHoverImage(src)} // 마우스 오버 시 대표 이미지 변경
            onMouseLeave={() => setHoverImage(mainImage || DEFAULT_IMAGE)} // 원래 이미지로 복귀
          >
            <img src={src} alt={`서브 이미지 ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * PropTypes 설정 (데이터 타입 검증)
 */
Thumbnail.propTypes = {
  mainImage: PropTypes.string, // ✅ 필수가 아닌 값으로 변경 (대체 이미지 제공)
  subImages: PropTypes.arrayOf(PropTypes.string), // 서브 이미지 배열
};

export default Thumbnail;
