import { Link } from "react-router-dom";
import "../../assets/css/main/CategoryList.css";

const categories = [
  {
    name: "아기가구",
    subcategories: ["바운서", "아기 체육관", "아기 침대", "범퍼 침대"],
  },
  {
    name: "놀이용품",
    subcategories: [
      "쏘서/점퍼루",
      "보행기/러닝홈",
      "트램폴린/미끄럼틀",
      "승용완구",
      "장난감/백일상",
    ],
  },
  {
    name: "이동용품",
    subcategories: ["유모차/웨건", "카시트", "아기띠"],
  },
  {
    name: "유아식사",
    subcategories: ["식탁의자", "유축기/소독기"],
  },
  {
    name: "위생&건강",
    subcategories: ["기저귀 갈이대", "유아욕조", "스팀청소기"],
  },
];

const CategoryList = () => {
  return (
    <aside className="category-list">
      <h2 className="category-title">카테고리</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <h3 className="category-name">{category.name}</h3>
            <ul className="subcategory-list">
              {category.subcategories.map((subcategory, subIndex) => (
                <li key={subIndex} className="subcategory-item">
                  {/* 카테고리 항목을 클릭하면 해당 상세 페이지로 이동 */}
                  <Link
                    to={`/category/${category.name}/${subcategory}`}
                    className="subcategory-link"
                  >
                    {subcategory}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryList;
