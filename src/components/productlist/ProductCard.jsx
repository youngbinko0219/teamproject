import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../hooks/useProductStore";
import "../../assets/css/productlist/ProductCard.css";
import ReviewSummarySimple from "../productdetail/ReviewSummarySimple"; 

const ProductCard = ({ product }) => {
  console.log("📌 ProductCard로 넘어온 product:", product); // ✅ product 확인
  const navigate = useNavigate(); // 페이지 이동 함수
  const { setMainImage, setProductName, setProductId } = useProductStore();
  const { product_id, product_name, price, images } = product;

  const handleProductClick = () => {
    
    setMainImage(images); 
    setProductName(product_name);
    setProductId(product_id);

    // 최근 본 상품 가져오기 (로컬스토리지)
    const recentViewed = JSON.parse(localStorage.getItem("recentViewed")) || [];
    const filteredProducts = recentViewed.filter(item => item.product_id !== product_id); 
    const updatedProducts = [{ product_id, product_name, price, images }, ...filteredProducts].slice(0, 5); 
    localStorage.setItem("recentViewed", JSON.stringify(updatedProducts)); 

    // 상세 페이지로 이동
    navigate(`/products/view/${product_id}`);
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <img src={images} alt={product_name} className="product-image" />
      <h3 className="product-name">{product_name}</h3>
      <p className="product-price">{Number(price).toLocaleString()}원</p>
      <ReviewSummarySimple product_id={product.product_id} />
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
