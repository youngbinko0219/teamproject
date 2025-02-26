import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import CategoryList from "../main/CategoryList";
import BestProducts from "../main/BestProducts";
import RecentViewed from "../productlist/RecentViewed";
import "../../assets/css/pages/BestProductsPage.css";

const BestProductsPage = () => {
  return (
    <>
      <Header />
      <div className="best-products-page-container">
        <div className="top-layout">
          {/* 좌측 카테고리 */}
          <aside className="left-section">
            <CategoryList />
          </aside>

          {/* 중앙 베스트 상품 섹션 */}
          <div className="center-section">
            <BestProducts />
          </div>

          {/* 우측 최근 본 상품 섹션 */}
          <aside className="right-section">
            <RecentViewed />
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BestProductsPage;
