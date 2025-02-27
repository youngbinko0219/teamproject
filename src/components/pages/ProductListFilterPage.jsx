import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ProductGrid from "../productlist/ProductGrid";
import CategoryList from "../main/CategoryList";
import FilterBar from "../productlist/FilterBar";
import RecentViewed from "../productlist/RecentViewed";
import "../../assets/css/pages/ProductListPage.css";

const ProductListFilterPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const location = useLocation(); // 현재 URL에서 필터 값을 가져오기

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filters = {
      sPrice: queryParams.get("sPrice") || 0,
      ePrice: queryParams.get("ePrice") || 300000,
      category: queryParams.get("category") || "",
      searchName: queryParams.get("searchName") || "",
    };

    // API 요청
    const fetchFilteredProducts = async () => {
      setLoading(true); // 로딩 시작
      try {
        const response = await axios.get("http://localhost:8080/products/filter/search", {
          params: filters,
        });

        console.log("필터 검색 API 응답 데이터:", response.data); // ✅ 콘솔에서 데이터 확인

        const validProducts = response.data.filter(product => product !== null);
        setProducts(validProducts); // 검색 결과 업데이트
      } catch (error) {
        console.error("필터 검색 API 오류:", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };
    fetchFilteredProducts();
  }, [location.search]); // URL이 변경될 때마다 실행

  return (
    <>
    	<Header />
      <div className="product-list-container">
        {/* 왼쪽 영역 (카테고리 + 필터) */}
        <aside className="left-section">
        	<CategoryList />
        	<FilterBar />
        </aside>
        <main className="center-section">
          <h1 className="category-title-detail">검색 결과</h1>
					<div className="product-sort-type">
          	<ProductGrid products={products} />
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

export default ProductListFilterPage;
