import { useState } from "react";
import "../../assets/css/productlist/SearchFilter.css";

const SearchFilter = ({ setFilters }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search,
    }));
  };

  return (
    <div className="filter-section search-filter">
      <label>검색</label>
      <div className="search-bar">
        <input
          type="text"
          placeholder="상품명 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>🔍</button>
      </div>
    </div>
  );
};

export default SearchFilter;
