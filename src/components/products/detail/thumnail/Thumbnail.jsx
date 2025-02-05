import React from "react";
import "./Thumbnail.css"; // 섬네일 관련 CSS

const Thumbnail = () => {
  return (
    <div className="thumbnail-container">
      {/* 메인 이미지 */}
      <div className="main-image"></div>

      {/* 서브 이미지 */}
      <div className="sub-images">
        <div className="sub-image"></div>
        <div className="sub-image"></div>
        <div className="sub-image"></div>
      </div>
    </div>
  );
};

export default Thumbnail;
