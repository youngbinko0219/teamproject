import React from "react";
import "../../assets/css/productdetail/ProductTabs.css"; // 탭 스타일 불러오기

const ProductTabs = () => {
  return (
    <div className="product-tabs-container">
      <div className="tab-item active">
        <div>상품상세정보</div>
      </div>
      <div className="tab-item">
        <div>교환 및 반납/연장 안내</div>
      </div>
      <div className="tab-item">
        <div>상품후기</div>
      </div>
      <div className="tab-item">
        <div>상품문의</div>
      </div>
    </div>
  );
};

export default ProductTabs;
