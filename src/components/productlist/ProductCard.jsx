import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../hooks/useProductStore";
import useUserStore from "../../hooks/useUserStore";
import "../../assets/css/productlist/ProductCard.css";
import ReviewSummarySimple from "../productdetail/ReviewSummarySimple"; 

const ProductCard = ({ product }) => {


  const navigate = useNavigate(); // 페이지 이동 함수
  const { setProductId, setMainImage } = useProductStore();
  const { user_id} = useUserStore();

  const { product_id, product_name, price, images, rating, reviews } = product;

  const handleProductClick = () => {
    
    setProductId(product_id); // 상품 클릭 시 zustand에 product_id 저장
    setMainImage(images); // 상품 메인 이미지 저장
    console.log("이미지",images);

    // 최근 본 상품 가져오기 (로컬스토리지)
    const recentViewed = JSON.parse(localStorage.getItem("recentViewed")) || [];
    const filteredProducts = recentViewed.filter(item => item.product_id !== product_id); // 기존 상품 중복 제거
    const updatedProducts = [{ product_id, product_name, price, images }, ...filteredProducts].slice(0, 5); // 새로운 상품 추가 후, 최대 5개까지만 유지
    localStorage.setItem("recentViewed", JSON.stringify(updatedProducts)); // 업데이트된 리스트를 다시 로컬스토리지에 저장

    // 상세 페이지로 이동
    navigate(`/products/view/${product_id}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <img src={images} alt={product_name} className="product-image" />
      <h3 className="product-name">{product_name}</h3>
      <p className="product-price">{Number(price).toLocaleString()}원</p>
      <ReviewSummarySimple averageRating={rating} totalReviews={reviews} /> 
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
