import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/admin/ProductForm.css";
import axios from "axios";

const ProductForm = () => {
  const [product_name, setProductName] = useState("");
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

  // 로딩 상태 변수
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const categories = {
    아기가구: ["바운서", "아기 체육관", "아기 침대"],
    놀이용품: ["쏘서/점퍼루", "보행기/러닝홈", "대형완구", "장난감"],
    이동용품: ["유모차/웨건", "카시트"],
    유아식사: ["식탁의자", "유축기/소독기"],
    위생건강: ["기저귀 갈이대", "유아욕조"],
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
    setLoading(true); // 로딩 시작

    const formData = new FormData();

    // 백엔드에서 `@RequestPart("product")`로 받으므로 JSON 데이터를 변환
    const productData = {
      product_name,
      price,
      stock,
      category,
      subCategory,
      description,
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    // 백엔드가 `@RequestPart(value = "main_img")`로 받으므로 필드명 변경
    if (mainImage) {
      formData.append("main_img", mainImage);
    }

    // `sub_img`는 여러 개의 파일을 배열로 받으므로 반복문 사용
    subImages.forEach((image) => {
      formData.append("sub_img", image);
    });

    // `desc_img`도 단일 파일이므로 필드명 맞추기
    if (detailImage) {
      formData.append("desc_img", detailImage);
    }

    try {
      await axios.post("http://localhost:8080/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("상품이 성공적으로 등록되었습니다.");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("상품 등록에 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <input
        type="text"
        placeholder="상품명"
        value={product_name}
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

      <button type="submit" disabled={loading}>
        {loading ? "로딩중..." : "상품 등록"}
      </button>
    </form>
  );
};

export default ProductForm;
