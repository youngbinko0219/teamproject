import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../hooks/useProductStore";

import Header from "../header/Header";
import Footer from "../footer/Footer";
import CategoryList from "../main/CategoryList";
import FilterBar from "../productlist/FilterBar";
import ProductGrid from "../productlist/ProductGrid";
import RecentViewed from "../productlist/RecentViewed";

import "../../assets/css/pages/ProductListPage.css";

const ProductListPage = () => {
  const { category } = useParams(); // 현재 URL에서 카테고리 가져오기
  const { setCategory } = useProductStore(); // zustand에서 상태업데이트 함수 가져오기

  useEffect(() => {
    if (category) {
      console.log("✅ useParams()로 가져온 category:", category);
      setCategory(category); // Zustand 상태 업데이트
    }
  }, [category, setCategory]);

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
            <ProductGrid />
          </div>
        </main>

        {/* ✅ 오른쪽 영역 (최근 본 상품) */}
        <aside className="right-section">
          <RecentViewed />
        </aside>
      </div>
      <Footer />
    </>
  );
};

export default ProductListPage;
