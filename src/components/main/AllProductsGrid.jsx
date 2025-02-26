import ProductCard from "./ProductCard";
import "../../assets/css/main/AllProductsGrid.css";

const AllProductsGrid = ({ products }) => {
  return (
    <div className="all-products-grid">
      {products.map((product) => {
        // API의 상품 데이터를 ProductCard에 맞는 필드로 변환
        const mappedProduct = {
          id: product.productId,
          name: product.productName,
          price: product.price,
          image: product.mainImage,
        };

        return <ProductCard key={mappedProduct.id} product={mappedProduct} />;
      })}
    </div>
  );
};

export default AllProductsGrid;
