import { useEffect } from "react";

const AddressSearch = ({ onComplete }) => {
  useEffect(() => {
    // 스크립트 중복 로드 방지
    if (!window.daum || !window.daum.Postcode) {
      const script = document.createElement("script");
      script.src =
        "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.async = true;
      script.onload = () => console.log("Daum Postcode API 로드 완료");
      document.body.appendChild(script);
    }
  }, []);

  const handleSearch = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: (data) => onComplete(data),
      }).open();
    } else {
      console.error("Daum Postcode API가 로드되지 않았습니다.");
    }
  };

  return (
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={handleSearch}
    >
      주소 검색
    </button>
  );
};

export default AddressSearch;
