import "../../assets/css/main/CategoryList.css";

const categories = [
  "유모차",
  "카시트",
  "아기침대",
  "젖병소독기",
  "장난감",
  "보행기",
  "기저귀 가방",
  "기타",
];

const CategoryList = () => {
  return (
    <aside className="category-list">
      <h2 className="category-title">카테고리</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            {category}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default CategoryList;
