import "../../assets/css/productlist/FilterBar.css";
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import SearchFilter from "./SearchFilter";

const categories = [
  { title: "아기 가구", items: ["바운서", "아기체육관", "아기침대"] },
  {
    title: "놀이 용품",
    items: ["쏘서&점퍼루", "보행기&러닝홈", "대형완구", "장난감"],
  },
  { title: "이동 용품", items: ["유모차&웨건", "카시트"] },
  { title: "이유식", items: ["식탁의자", "유축기&소독기"] },
  { title: "위생 & 건강", items: ["기저귀 갈이대", "유아 욕조"] },
];

const FilterBar = ({ filters, setFilters }) => {
  return (
    <div className="filter-bar">
      <h3 className="filter-title">필터</h3>
      <CategoryFilter
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />
      <PriceRangeFilter filters={filters} setFilters={setFilters} />
      <SearchFilter filters={filters} setFilters={setFilters} />
    </div>
  );
};

export default FilterBar;
