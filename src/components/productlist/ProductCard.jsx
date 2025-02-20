import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../../assets/css/productlist/ProductCard.css";
import ReviewSummarySimple from "../productdetail/ReviewSummarySimple"; // 리뷰 컴포넌트 추가

const ProductCard = ({ product }) => {


  const navigate = useNavigate(); // 페이지 이동 함수
  const { product_id, product_name, price, images, rating, reviews } = product;

  const handleProductClick = () => {
    console.log("🛠 클릭한 상품 데이터:", product);
    console.log("🛠 클릭한 product_id:", product.product_id);

    // 최근 본 상품 가져오기 (로컬스토리지)
    const recentViewed = JSON.parse(localStorage.getItem("recentViewed")) || [];
    // 기존 상품 중복 제거
    const filteredProducts = recentViewed.filter(item => item.product_id !== product_id);
    // 새로운 상품 추가 후, 최대 5개까지만 유지
    const updatedProducts = [{ product_id, product_name, price, images }, ...filteredProducts].slice(0, 5);
    // 업데이트된 리스트를 다시 로컬스토리지에 저장
    localStorage.setItem("recentViewed", JSON.stringify(updatedProducts));

    // 상세 페이지로 이동
    navigate(`/products/view/${product_id}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <img src={images} alt={product_name} className="product-image" />
      <h3 className="product-name">{product_name}</h3>
      <p className="product-price">{Number(price).toLocaleString()}원</p>
      <ReviewSummarySimple averageRating={rating} totalReviews={reviews} /> {/* 리뷰 컴포넌트 추가 */}
    </div>
  );
};

// props 유효성 검사 추가
ProductCard.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    product_name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    images: PropTypes.string.isRequired,
    rating: PropTypes.number, 
    reviews: PropTypes.number, 
  }).isRequired,
};

export default ProductCard;
