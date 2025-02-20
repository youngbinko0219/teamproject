import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard"; // 상품 카드 컴포넌트
import "../../assets/css/main/AllProduct.css"; // 컨테이너 관련 CSS
import "../../assets/css/main/AllProductsGrid.css"; // 그리드 관련 CSS

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // API에서 모든 상품을 받아와서 무작위로 8개 선택
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 카테고리 값이 null이면 모든 상품을 가져온다고 가정
        const response = await axios.get("/products/all");
        const allProducts = response.data;
        // 배열을 무작위로 섞고, 8개 항목 선택
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 8);
        setProducts(selectedProducts);
      } catch (error) {
        console.error("상품 불러오기 실패:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="all-products-container">
      <h2>모든 상품</h2>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.product_id}
            product={{
              id: product.product_id,
              name: product.product_name,
              price: product.price,
              image: product.images,
              stock: product.stock,
              category: product.category,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
