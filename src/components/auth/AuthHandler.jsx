import { useEffect } from "react";
import axios from "axios";

const setAxiosToken = (token) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const AuthHandler = () => {
  useEffect(() => {
    // 1. URL에서 accessToken 추출
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("accessToken");

    // 2. 토큰이 존재하면 localStorage에 저장하고 Axios에 설정
    if (token) {
      localStorage.setItem("accessToken", token); // localStorage 저장
      setAxiosToken(token); // Axios 기본 헤더 설정
      console.log("토큰이 저장되었습니다:", token);

      // 3. URL 정리 (accessToken 제거)
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return null; // UI가 필요 없으므로 아무것도 렌더링하지 않음
};

export default AuthHandler;
