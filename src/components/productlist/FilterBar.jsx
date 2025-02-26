import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../../assets/css/productlist/FilterBar.css";
import { toast } from "react-toastify";

const categories = {
  "아기 가구": ["바운서", "아기체육관", "아기침대"],
  "놀이 용품": ["쏘서&점퍼루", "보행기&러닝홈", "대형완구", "장난감"],
  "이동 용품": ["유모차&웨건", "카시트"],
  "이유식": ["식탁의자", "유축기&소독기"],
  "위생 & 건강": ["기저귀 갈이대", "유아욕조"],
};

const FilterBar = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    search: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState([1000, 300000]);
  const [search, setSearch] = useState("");

  // 돋보기 버튼 클릭 시 필터 값 URL에 담아서 이동
  const handleSearch = () => {
    // 필수 검사
    if (!selectedCategory) {
      toast.error("상품 카테고리를 선택해주세요.");
      return;
    }
    if (!search) {
      toast.error("찾으시는 상품명를 입력해주세요.");
      return;
    }

    // 가격이나 검색어가 입력되지 않으면 기본값 적용
    const queryParams = new URLSearchParams({
      sPrice: filters.minPrice || 0,
      ePrice: filters.maxPrice || 500000,
      category: filters.category, // 카테고리는 필수니까 빈값이 아니어야 함.
      searchName: filters.search, // 필수
    }).toString();

    console.log("API 요청 URL:", `products/filter/search?${queryParams}`); // ✅ 요청 URL 확인

    // URL에 쿼리 파라미터를 포함하여 이동
    navigate(`/products/filter/search?${queryParams}`);
    window.location.reload(); // 전체 페이지 새로고침 (필요 시)
  };

  // 카테고리 선택 핸들러
  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    // 선택된 카테고리에 속하는 모든 아이템을 ,로 연결
    const categoryString = selected ? categories[selected].join(",") : "";
    setFilters((prev) => ({ ...prev, category: categoryString }));
  };

  // 가격 슬라이더 핸들러
  const handleSliderChange = (newPrice) => {
    setPrice(newPrice);
    setFilters((prev) => ({
      ...prev,
      minPrice: newPrice[0],
      maxPrice: newPrice[1],
    }));
  };

  // 검색어 입력 핸들러
  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <div className="product-filter-bar">
      <h3 className="product-filter-title">필터</h3>

      {/* 카테고리 필터 */}
      <div className="product-filter-section">
        <label>카테고리</label>
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">카테고리를 선택해주세요.</option>
          {Object.keys(categories).map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* 가격 필터 */}
      <div className="product-filter-section">
        <label>가격 범위</label>
        <Slider
          range
          min={1000}
          max={300000}
          step={1000}
          value={price}
          onChange={handleSliderChange}
        />
        <div className="product-filter-price-range">
          <input
            type="number"
            placeholder="최소 가격"
            value={price[0] || ""}
            onChange={(e) =>
              handleSliderChange([Number(e.target.value) || 0, price[1]])
            }
          />
          <span> ~ </span>
          <input
            type="number"
            placeholder="최대 가격"
            value={price[1] || ""}
            onChange={(e) =>
              handleSliderChange([price[0], Number(e.target.value) || 1000000])
            }
          />
        </div>
      </div>

      {/* 검색 필터 */}
      <div className="product-filter-section">
        <label>검색</label>
        <div className="product-filter-search-bar">
          <input
            type="text"
            placeholder="상품명 검색"
            value={search}
            onChange={handleSearchInputChange}
          />
          <button onClick={handleSearch}>🔍</button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
