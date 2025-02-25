import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SearchResults from "../header/SearchResults"; // 실제 검색 결과를 렌더링하는 컴포넌트

const SearchPage = () => {
  return (
    <div className="search-page-container">
      <Header />
      <main className="search-page-content">
        <SearchResults />
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
