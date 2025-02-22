import { Link, useLocation } from "react-router-dom";
import "../../assets/css/main/CategoryList.css";
import useProductStore from "../../hooks/useProductStore";

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

const CategoryList = () => {
  const { setCategory } = useProductStore();
  const location = useLocation();

  return (
    <aside className="category-list">
      <h2 className="category-title">카테고리</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="category-group">
            <div className="category-header">{category.title}</div>
            <ul className="subcategory-list">
              {category.items.map((item, subIndex) => {
                const isActive =
                  decodeURIComponent(location.pathname) === `/products/${item}`;
                return (
                  <li
                    key={subIndex}
                    className={`category-item ${isActive ? "active" : ""}`}
                  >
                    <Link
                      to={`/products/${item}`}
                      className="category-link"
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryList;
