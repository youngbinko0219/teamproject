import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        position="top-center" // 중앙 배치
        autoClose={1000} // 1초 후 자동 닫힘
        hideProgressBar={true} // 진행 바 숨김
        closeOnClick // 클릭 시 닫힘
        pauseOnHover={false} // 마우스 오버 시 일시정지 안함
        draggable={false} // 드래그 기능 비활성화
        theme="colored" // 색상 테마 적용
      />
    </>
  );
};

export default ToastProvider;
