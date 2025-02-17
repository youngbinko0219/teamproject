import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; // 상품 카드 컴포넌트
import "../../assets/css/main/AllProduct.css"; // 컨테이너 관련 CSS
import "../../assets/css/main/AllProductsGrid.css"; // 그리드 관련 CSS

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  // 더미 데이터 (나중에 API 호출로 교체 가능)
  useEffect(() => {
    const fetchProducts = async () => {
      const dummyProducts = [
        {
          id: 1,
          name: "유아용 유모차",
          price: 50000,
          image: "/assets/images/stroller.jpg",
        },
        {
          id: 2,
          name: "아기 침대",
          price: 70000,
          image: "/assets/images/crib.jpg",
        },
        {
          id: 3,
          name: "기저귀 세트",
          price: 30000,
          image: "/assets/images/diapers.jpg",
        },
        {
          id: 4,
          name: "아기 의자",
          price: 45000,
          image: "/assets/images/baby-chair.jpg",
        },
        {
          id: 5,
          name: "휴대용 아기 띠",
          price: 20000,
          image: "/assets/images/baby-carrier.jpg",
        },
        {
          id: 6,
          name: "자동차 시트",
          price: 60000,
          image: "/assets/images/car-seat.jpg",
        },
        {
          id: 7,
          name: "자동차 시트",
          price: 60000,
          image: "/assets/images/car-seat.jpg",
        },
        {
          id: 8,
          name: "자동차 시트",
          price: 60000,
          image: "/assets/images/car-seat.jpg",
        },
      ];
      setProducts(dummyProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="all-products-container">
      <h2>모든 상품</h2>
      <div className="all-products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
