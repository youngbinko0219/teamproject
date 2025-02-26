import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useProductStore from "../../hooks/useProductStore";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CategoryList from "../main/CategoryList";
import FilterBar from "../productlist/FilterBar";
import RecentViewed from "../productlist/RecentViewed";
import ProductGrid from "../productlist/ProductGrid";
import "../../assets/css/pages/ProductListPage.css";

const ProductListPage = () => {
  const { category } = useParams(); // URL 파라미터에서 카테고리 가져오기
  const { setCategory } = useProductStore(); // zustand 상태 업데이트 함수
  const [products, setProducts] = useState([]); // 실제 렌더링할 상품 목록
  const [loading, setLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    if (category) {
      console.log("useParams()로 가져온 category:", category);
      setCategory(category);
      fetchProducts(category);
    }
  }, [category, setCategory]);

  // 카테고리에 맞는 상품 목록을 API로 불러옴
  const fetchProducts = async (cat) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/products/${category}`);
      setProducts(response.data);
    } catch (error) {
      console.error("상품 목록 불러오기 오류:", error);
    }
    setLoading(false);
  };

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
          <h1 className="category-title-detail">{category}</h1>
          <div className="product-sort-type">
            {loading ? (
              <p>상품을 불러오는 중...</p>
            ) : (
              // 로딩이 끝나면 ProductGrid에 products를 넘겨 렌더링
              <ProductGrid products={products} />
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

export default ProductListPage;
