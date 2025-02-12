import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate import
import "../../assets/css/admin/ProductForm.css";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate(); // navigate 훅 사용

  const categories = {
    아기가구: ["바운서", "아기 체육관", "아기 침대", "범퍼 침대"],
    놀이용품: [
      "쏘서/점퍼루",
      "보행기/러닝홈",
      "트램폴린/미끄럼틀",
      "승용완구",
      "장난감/백일상",
    ],
    이동용품: ["유모차/웨건", "카시트", "아기띠"],
    유아식사: ["식탁의자", "유축기/소독기"],
    위생건강: ["기저귀 갈이대", "유아욕조", "스팀청소기"],
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("상품이 성공적으로 등록되었습니다.");
      navigate("/admin/dashboard"); // 상품 등록 후 대시보드로 이동
    } catch (error) {
      console.error("Error adding product:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
    <div className="admin-dashboard">
      {/* 헤더 */}
      <AdminHeader />

      <div className="dashboard-content">
        {/* 사이드바 */}
        <AdminSidebar />

        <div className="product-form-container">
          <h2>상품 등록</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <input
              type="text"
              placeholder="상품명"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="가격"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="재고 수량"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubCategory("");
              }}
              required
            >
              <option value="">대분류 선택</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {category && (
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                required
              >
                <option value="">소분류 선택</option>
                {categories[category].map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            )}

            <textarea
              placeholder="상품 설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            <button type="submit">상품 등록</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
