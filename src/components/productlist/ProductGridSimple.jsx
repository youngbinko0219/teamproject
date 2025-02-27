import ProductCard from "./ProductCard";
import "../../assets/css/productlist/ProductGridSimple.css";

const ProductGridSimple = ({ products = [] }) => {
  return (
    <div className="product-grid-simple-container">
      <div className="product-grid-simple">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        ) : (
          <p>해당 조건에 맞는 상품이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ProductGridSimple;
