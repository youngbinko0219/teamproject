import ProductCard from "./ProductCard";
import "../../assets/css/main/AllProductsGrid.css";

const AllProductsGrid = ({ products }) => {
  return (
    <div className="all-products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AllProductsGrid;
