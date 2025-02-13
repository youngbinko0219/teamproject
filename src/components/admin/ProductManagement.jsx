// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../../assets/css/admin/ProductManagement.css";
// import axios from "axios";

// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // 상품 목록 조회 함수
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("/admin/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   // 수정 기능: 예시로 상품명과 가격을 업데이트함
//   const handleUpdate = async (product) => {
//     const newProductName = window.prompt("새로운 상품명:", product.productName);
//     if (newProductName === null) return; // 사용자가 취소한 경우
//     const newPrice = window.prompt("새로운 가격:", product.price);
//     if (newPrice === null) return;

//     const updatedProduct = {
//       ...product,
//       productName: newProductName,
//       price: parseFloat(newPrice),
//     };

//     try {
//       await axios.put("/admin/products/update", updatedProduct);
//       alert("상품이 성공적으로 수정되었습니다.");
//       fetchProducts();
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("상품 수정에 실패했습니다.");
//     }
//   };

//   // 삭제 기능
//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete("/admin/product/delete", { data: { id: productId } });
//       alert("상품이 삭제되었습니다.");
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("상품 삭제에 실패했습니다.");
//     }
//   };

//   return (
//     <div className="product-management">
//       <h2>상품 관리</h2>
//       <Link to="/admin/products/regist" className="add-product-button">
//         상품 등록
//       </Link>
//       <table>
//         <thead>
//           <tr>
//             <th>상품명</th>
//             <th>가격</th>
//             <th>재고</th>
//             <th>카테고리</th>
//             <th>소분류</th>
//             <th>설명</th>
//             <th>이미지</th>
//             <th>수정</th>
//             <th>삭제</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.productName}</td>
//               <td>{product.price}원</td>
//               <td>{product.stock}개</td>
//               <td>{product.category}</td>
//               <td>{product.subCategory}</td>
//               <td>{product.description}</td>
//               <td>
//                 <img
//                   src={`/static/images/${product.image}`}
//                   alt={product.productName}
//                   width="50"
//                 />
//               </td>
//               <td>
//                 <button onClick={() => handleUpdate(product)}>수정</button>
//               </td>
//               <td>
//                 <button onClick={() => handleDelete(product.id)}>삭제</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductManagement;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/admin/ProductManagement.css";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Axios Mock Adapter 설정
const mock = new MockAdapter(axios, { delayResponse: 500 });

// 임시 데이터 (dummy data)
const dummyProducts = [
  {
    id: 1,
    productName: "상품1",
    price: 10000,
    stock: 10,
    category: "카테고리1",
    subCategory: "소분류1",
    description: "상품1 설명",
    image: "product1.jpg",
  },
  {
    id: 2,
    productName: "상품2",
    price: 20000,
    stock: 20,
    category: "카테고리2",
    subCategory: "소분류2",
    description: "상품2 설명",
    image: "product2.jpg",
  },
];

// GET 요청 모킹: 상품 목록 조회
mock.onGet("/admin/products").reply(200, dummyProducts);

// PUT 요청 모킹: 상품 업데이트
mock.onPut("/admin/products/update").reply((config) => {
  const updatedProduct = JSON.parse(config.data);
  // 실제 로직에서는 배열의 해당 상품을 업데이트 해야 하지만 여기서는 성공 응답만 반환
  return [200, updatedProduct];
});

// DELETE 요청 모킹: 상품 삭제
mock.onDelete("/admin/product/delete").reply(200);

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // 상품 목록 조회 함수
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 수정 기능: 상품명과 가격 업데이트 예시
  const handleUpdate = async (product) => {
    const newProductName = window.prompt("새로운 상품명:", product.productName);
    if (newProductName === null) return; // 사용자가 취소한 경우 처리
    const newPrice = window.prompt("새로운 가격:", product.price);
    if (newPrice === null) return;

    const updatedProduct = {
      ...product,
      productName: newProductName,
      price: parseFloat(newPrice),
    };

    try {
      await axios.put("/admin/products/update", updatedProduct);
      alert("상품이 성공적으로 수정되었습니다.");
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("상품 수정에 실패했습니다.");
    }
  };

  // 삭제 기능
  const handleDelete = async (productId) => {
    try {
      await axios.delete("/admin/product/delete", { data: { id: productId } });
      alert("상품이 삭제되었습니다.");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("상품 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="product-management">
      <h2>상품 관리</h2>
      <Link to="/admin/products/regist" className="add-product-button">
        상품 등록
      </Link>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>재고</th>
            <th>카테고리</th>
            <th>소분류</th>
            <th>설명</th>
            <th>이미지</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.price}원</td>
              <td>{product.stock}개</td>
              <td>{product.category}</td>
              <td>{product.subCategory}</td>
              <td>{product.description}</td>
              <td>
                <img
                  src={`/static/images/${product.image}`}
                  alt={product.productName}
                  width="50"
                />
              </td>
              <td>
                <button onClick={() => handleUpdate(product)}>수정</button>
              </td>
              <td>
                <button onClick={() => handleDelete(product.id)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
