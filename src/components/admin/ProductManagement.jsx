// import { useEffect, useState } from "react";
// import "../../assets/css/admin/ProductManagement.css";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";

// // Mock 설정
// const mock = new MockAdapter(axios);

// // 초기 상품 데이터 설정
// let mockProducts = [
//   { id: 1, name: "유아용 카시트", price: 150000, stock: 10 },
//   { id: 2, name: "아기 침대", price: 200000, stock: 5 },
//   { id: 3, name: "유모차", price: 300000, stock: 8 },
// ];

// // GET 요청에 대한 Mock 처리 (상품 목록 조회)
// mock.onGet("/admin/products").reply(200, mockProducts);

// // DELETE 요청에 대한 Mock 처리 (상품 삭제)
// mock.onDelete(/\/admin\/products\/\d+/).reply((config) => {
//   const productId = parseInt(config.url.match(/\/admin\/products\/(\d+)/)[1]);
//   mockProducts = mockProducts.filter((product) => product.id !== productId);
//   return [200, { message: "상품이 삭제되었습니다." }];
// });

// // 수정은 UI만 구현하고 API 요청은 생략
// const ProductManagement = () => {
//   const [products, setProducts] = useState([]);

//   // 상품 목록 가져오기
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("/admin/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // 상품 삭제 처리
//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete(`/admin/products/${productId}`);
//       alert("상품이 삭제되었습니다.");
//       const response = await axios.get("/admin/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("상품 삭제에 실패했습니다.");
//     }
//   };

//   return (
//     <div className="product-management">
//       <h2>상품 관리</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>상품명</th>
//             <th>가격</th>
//             <th>재고</th>
//             <th>수정</th>
//             <th>삭제</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.name}</td>
//               <td>{product.price}원</td>
//               <td>{product.stock}개</td>
//               <td>
//                 <button
//                   onClick={() => alert("수정 기능은 아직 구현되지 않았습니다.")}
//                 >
//                   수정
//                 </button>
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
import "../../assets/css/admin/ProductManagement.css";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);

  // 상품 목록 불러오기
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/admin/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 상품 등록 함수
  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image); // 이미지 파일 추가

    try {
      await axios.post("/admin/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("상품이 등록되었습니다.");
      fetchProducts(); // 상품 목록 새로고침
      resetForm(); // 폼 초기화
    } catch (error) {
      console.error("Error adding product:", error);
      alert("상품 등록에 실패했습니다.");
    }
  };

  // 폼 초기화
  const resetForm = () => {
    setProductName("");
    setPrice("");
    setStock("");
    setImage(null);
  };

  return (
    <div className="product-management">
      <h2>상품 관리</h2>

      {/* 상품 등록 폼 */}
      <form onSubmit={handleProductSubmit} className="product-form">
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
          placeholder="재고"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">상품 등록</button>
      </form>

      {/* 상품 목록 */}
      <table>
        <thead>
          <tr>
            <th>이미지</th>
            <th>상품명</th>
            <th>가격</th>
            <th>재고</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={`/images/${product.image}`}
                  alt={product.name}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.price}원</td>
              <td>{product.stock}개</td>
              <td>
                <button>수정</button>
              </td>
              <td>
                <button>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
