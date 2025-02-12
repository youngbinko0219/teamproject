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
import { Link } from "react-router-dom";
import "../../assets/css/admin/ProductManagement.css";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

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
