import { useState } from "react";
import "../../assets/css/productlist/CategoryFilter.css";

const CategoryFilter = ({setFilters, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedItem, setSelectedItem] = useState("전체");

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    setSelectedItem("전체");
    setFilters((prev) => ({
      ...prev,
      category: newCategory,
      item: "전체",
    }));
  };

  const handleItemChange = (e) => {
    const newItem = e.target.value;
    setSelectedItem(newItem);
    setFilters((prev) => ({
      ...prev,
      item: newItem,
    }));
  };

  const currentCategory = categories.find((cat) => cat.title === selectedCategory);

  return (
    <div className="filter-section category-filter">
      <label>카테고리</label>
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="전체">전체</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.title}>
            {cat.title}
          </option>
        ))}
      </select>
      {selectedCategory !== "전체" && currentCategory && (
        <select value={selectedItem} onChange={handleItemChange}>
          <option value="전체">전체</option>
          {currentCategory.items.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CategoryFilter;
