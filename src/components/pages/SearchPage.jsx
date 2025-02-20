import { useSearchQuery } from "../../hooks/useSearchQuery";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SearchResults from "../search/SearchResults";
import "../../assets/css/pages/SearchPage.css";

const SearchPage = () => {
  const queryParams = useSearchQuery();
  const query = queryParams.get("query") || "";

  return (
    <div className="search-page-container">
      <Header />
      <main className="search-main">
        <h1>검색 결과</h1>
        <p>검색어: {query}</p>
        <SearchResults query={query} />
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
