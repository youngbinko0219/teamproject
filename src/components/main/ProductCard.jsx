import "../../assets/css/main/ProductCard.css"; // CSS 파일 경로

const ProductCard = ({ product }) => {
  const { name, price, image } = product;

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">{price.toLocaleString()}원</p>
    </div>
  );
};

export default ProductCard;
