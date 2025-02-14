import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/admin/ProductForm.css";
import axios from "axios";

const ProductForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [description, setDescription] = useState("");

  // 메인 상품 이미지 (1장)
  const [mainImage, setMainImage] = useState(null);
  // 서브 상품 이미지 (최대 3장)
  const [subImages, setSubImages] = useState([]);
  // 상세 설명 이미지 (1장)
  const [detailImage, setDetailImage] = useState(null);

  const navigate = useNavigate();

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

  // 메인 상품 이미지 변경 핸들러 (단일 파일)
  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  // 서브 상품 이미지 변경 핸들러 (최대 3개)
  const handleSubImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert("서브 상품 이미지는 최대 3장까지만 업로드할 수 있습니다.");
      return;
    }
    setSubImages(files);
  };

  // 상세 설명 이미지 변경 핸들러 (단일 파일)
  const handleDetailImageChange = (e) => {
    setDetailImage(e.target.files[0]);
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

    // 메인 상품 이미지 추가 (단일 파일)
    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    // 서브 상품 이미지 추가 (최대 3장)
    subImages.forEach((image) => {
      formData.append(`subImages`, image);
    });

    // 상세 설명 이미지 추가 (단일 파일)
    if (detailImage) {
      formData.append("detailImage", detailImage);
    }

    try {
      await axios.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("상품이 성공적으로 등록되었습니다.");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  return (
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

      {/* 메인 상품 이미지 업로드 (1장) */}
      <label>메인 상품 이미지 (1장)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleMainImageChange}
        required
      />

      {/* 서브 상품 이미지 업로드 (최대 3장) */}
      <label>서브 상품 이미지 (최대 3장)</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleSubImagesChange}
      />
      <p>{subImages.length}개 선택됨 (최대 3개 가능)</p>

      {/* 상세 설명 이미지 업로드 (1장) */}
      <label>상세 설명 이미지 (세로로 긴 이미지 한 장)</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleDetailImageChange}
        required
      />

      <button type="submit">상품 등록</button>
    </form>
  );
};

export default ProductForm;
