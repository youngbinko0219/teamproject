import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CategoryList from "../main/CategoryList";
import FilterBar from "../productlist/FilterBar";
import RecentViewed from "../productlist/RecentViewed";
import ProductGridSimple from "../productlist/ProductGridSimple";
import todayp from "../../assets/images/productlist/todayp.jpg";
import "../../assets/css/pages/ProductListPage.css";

const ProductTodayPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodayProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/products/today");
        const formattedProducts = response.data.data.map((product) => ({
          product_id: product.productId,
          product_name: product.productName,
          category: product.category,
          stock: product.stock,
          price: product.price,
          popularityScore: product.popularityScore,
          createdAt: product.createdAt,
          mainImage: product.mainImage,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("상품 목록 불러오기 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodayProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="product-list-container">
        {/* 왼쪽 영역 (카테고리 + 필터) */}
        <aside className="left-section">
          <CategoryList />
          <FilterBar />
        </aside>

        {/* 중앙 영역 (상품 목록 + 정렬 옵션) */}
        <main className="center-section">
          <img className="category-title-detail" src={todayp} />
          <div className="product-sort-type">
            {loading ? (
              <p>상품을 불러오는 중...</p>
            ) : (
              <ProductGridSimple products={products} />
            )}
          </div>
        </main>

        {/* 오른쪽 영역 (최근 본 상품) */}
        <aside className="right-section">
          <RecentViewed />
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default ProductTodayPage;
