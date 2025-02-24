import PropTypes from "prop-types";
import "../../assets/css/productdetail/Content.css";

const Content = ({ descriptionImage }) => {
  return (
    <div className="product-detail-content">
      {/* 상품 상세 이미지 */}
      {descriptionImage ? (
        <img src={descriptionImage} alt="상품 상세 설명 이미지" className="detail-image" />
      ) : (
        <p className="no-image-text">상품 상세 이미지가 없습니다.</p>
      )}
    </div>
  );
};

/* Props 타입 검증 */
Content.propTypes = {
  descriptionImage: PropTypes.string, // 단일 이미지 URL
};

export default Content;
