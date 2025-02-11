// import "../../assets/css/admin/ProductManagement.css";

const ProductManagement = () => {
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
          {/* 상품 데이터 매핑 */}
          <tr>
            <td>상품 1</td>
            <td>10,000원</td>
            <td>50개</td>
            <td>
              <button>수정</button>
            </td>
            <td>
              <button>삭제</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
