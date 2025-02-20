import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/admin/ProductManagement.css";
import axios from "axios";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // 페이지 당 상품 수
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage, pageSize]);

  // 상품 목록 조회 함수 (페이징, 페이지 사이즈 반영)
  const fetchProducts = async (page, size) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/admin/products", {
        params: { page, size }, // ✅ Spring Boot의 페이징 API에 맞게 요청
      });

      console.log("API 응답 데이터:", response.data); // ✅ 데이터 구조 확인

      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products); // ✅ 상품 목록 저장
        setTotalPages(response.data.totalPages || 1); // ✅ 전체 페이지 수 설정
        setCurrentPage(response.data.page || 1); // ✅ 현재 페이지 설정
      } else {
        console.error("API 응답이 예상된 형식이 아닙니다:", response.data);
        setProducts([]);
      }
    } catch (err) {
      console.error("상품 목록 조회 중 오류 발생:", err);
      setError("상품 목록을 불러오는데 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 페이지 사이즈 변경 핸들러
  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // 페이지 사이즈 변경 시 첫 페이지로 리셋
  };

  // 상품 수정 기능
  const handleUpdate = async (product) => {
    const newProductName = window.prompt(
      "새로운 상품명:",
      product.product_name
    );
    if (newProductName === null) return;
    const newPrice = window.prompt("새로운 가격:", product.price);
    if (newPrice === null) return;

    const updatedProduct = {
      ...product,
      product_name: newProductName,
      price: parseFloat(newPrice),
    };

    try {
      await axios.put("/admin/products/update", updatedProduct);
      alert("상품이 성공적으로 수정되었습니다.");
      fetchProducts(currentPage, pageSize);
    } catch (err) {
      console.error("상품 수정 중 오류 발생:", err);
      alert("상품 수정에 실패했습니다.");
    }
  };

  // 상품 삭제 기능
  const handleDelete = async (productId) => {
    try {
      await axios.delete("/admin/product/delete", { data: { id: productId } });
      alert("상품이 삭제되었습니다.");
      fetchProducts(currentPage, pageSize);
    } catch (err) {
      console.error("상품 삭제 중 오류 발생:", err);
      alert("상품 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="product-management">
      <h2>상품 관리</h2>
      <Link to="/admin/products/regist" className="add-product-button">
        상품 등록
      </Link>

      {/* 페이지 사이즈 선택 */}
      <div className="page-size-selector">
        <label htmlFor="pageSize">페이지 당 항목 수: </label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">데이터 로딩 중...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>상품명</th>
                <th>가격</th>
                <th>재고</th>
                <th>카테고리</th>
                <th>설명</th>
                <th>이미지</th>
                <th>수정</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.product_id}>
                  <td>{product.product_name}</td>
                  <td>{product.price}원</td>
                  <td>{product.stock}개</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td>
                    <img src={product.images} width="50" />
                  </td>
                  <td>
                    <button onClick={() => handleUpdate(product)}>수정</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(product.product_id)}>
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          <div className="pagination">
            <button
              disabled={currentPage <= 1} // ✅ 첫 번째 페이지에서 비활성화
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              이전
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>{" "}
            {/* ✅ 현재 페이지 / 전체 페이지 표시 */}
            <button
              disabled={currentPage >= totalPages} // ✅ 마지막 페이지에서 비활성화
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              다음
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductManagement;
