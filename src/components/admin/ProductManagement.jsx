import { useEffect, useState } from "react";
import "../../assets/css/admin/ProductManagement.css";
import axios from "axios";

const ProductManagement = () => {
  // useState와 useEffect는 컴포넌트 내부에서 호출해야 합니다.
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/admin/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []); // 빈 배열을 두 번째 인자로 전달해 최초 렌더링 시 한 번만 호출

  return (
    <div className="product-management">
      <h2>상품 관리</h2>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>재고</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {/* fetched products 데이터를 매핑 */}
          {products.map((product) => (
            <tr key={product.id}>
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
