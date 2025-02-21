import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../../assets/css/productlist/FilterBar.css";

const FilterBar = ({ filters, setFilters }) => {
  const [price, setPrice] = useState([0, 100000]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const handleSliderChange = (newPrice) => {
    setPrice(newPrice);
    setFilters((prev) => ({
      ...prev,
      minPrice: newPrice[0],
      maxPrice: newPrice[1],
    }));
  };

  const handleInputChange = (index, value) => {
    const updatedPrice = [...price];
    updatedPrice[index] = Number(value) || 0;
    setPrice(updatedPrice);
    setFilters((prev) => ({
      ...prev,
      minPrice: updatedPrice[0],
      maxPrice: updatedPrice[1],
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFilters((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search,
    }));
  };

  return (
    <div className="filter-bar">
      <h3 className="filter-title">필터</h3>

      {/* ✅ 카테고리 선택 */}
      <div className="filter-section">
        <label>카테고리</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="전체">전체</option>
          <option value="아기 가구">아기 가구</option>
          <option value="놀이용품">놀이용품</option>
          <option value="이동 용품">이동 용품</option>
          <option value="이유식">이유식</option>
          <option value="위생 & 건강">위생 & 건강</option>
        </select>
      </div>

      {/* ✅ 가격 범위 슬라이더 */}
      <div className="filter-section">
        <label>가격 범위</label>
        <Slider
          range
          min={0}
          max={100000}
          step={1000}
          value={price}
          onChange={handleSliderChange}
          trackStyle={[{ backgroundColor: "#fa9d9a", height: 6 }]}
          handleStyle={[
            {
              backgroundColor: "#fa9d9a",
              borderColor: "#fa9d9a",
              width: 14,
              height: 14,
            },
            {
              backgroundColor: "#fa9d9a",
              borderColor: "#fa9d9a",
              width: 14,
              height: 14,
            },
          ]}
        />
        <div className="price-range">
          <input
            type="number"
            value={price[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
          />
          <span> ~ </span>
          <input
            type="number"
            value={price[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
          />
        </div>
      </div>

      {/* ✅ 검색 입력 */}
      <div className="search-container">
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
    </div>
  );
};

export default FilterBar;
