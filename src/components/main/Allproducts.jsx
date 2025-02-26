import { useState, useEffect } from "react";
import axios from "axios";
import AllProductsGrid from "./AllProductsGrid";
import "../../assets/css/main/AllProducts.css"; // CSS 파일 import

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/products/all");
        if (response.data.message === "success") {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("상품 불러오기 오류:", error);
      }
    };

    fetchAllProducts();
  }, []);

  return (
    <div className="all-products-page">
      <h1 className="all-products-page__title">전체 상품</h1>
      <AllProductsGrid products={products} />
    </div>
  );
};

export default AllProductsPage;
