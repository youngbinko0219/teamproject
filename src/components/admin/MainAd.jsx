import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import "../../assets/css/admin/MainAd.css";

const MainAd = () => {
  const [bannerUrls, setBannerUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 백엔드에서 배너 목록 가져오기
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/admin/ad-settings"
        );
        if (response.data.message === "success") {
          // response.data.data.banners 배열로 받아옴
          setBannerUrls(response.data.data.banners || []);
        }
      } catch (error) {
        console.error("배너 불러오기 오류:", error);
      }
    };
    fetchBanners();
  }, []);

  // 파일 업로드 후 URL 반환
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/admin/ad-settings/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // 응답: { message: "success", data: [ { url: "..." } ] }
      if (
        response.data.message === "success" &&
        response.data.data.length > 0
      ) {
        const newUrl = response.data.data[0].url;
        setBannerUrls((prev) => [...prev, newUrl]);
        toast.success("업로드 성공!");
      } else {
        toast.error("업로드 실패!");
      }
    } catch (error) {
      console.error("배너 업로드 오류:", error);
      toast.error("배너 업로드 중 오류 발생!");
    }
    setLoading(false);
  };

  // 배너 삭제 요청
  const removeBanner = async (url) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/admin/ad-settings/delete?url=${encodeURIComponent(
          url
        )}`
      );
      if (response.data.message === "success" && response.data.data.removed) {
        setBannerUrls((prev) => prev.filter((banner) => banner !== url));
        toast.success("배너 삭제 성공!");
      } else {
        toast.error("배너 삭제 실패!");
      }
    } catch (error) {
      console.error("배너 삭제 오류:", error);
      toast.error("배너 삭제 중 오류 발생!");
    }
  };

  return (
    <div className="main-ad-container">
      <h2>광고 배너 관리</h2>

      <div className="banner-list">
        {bannerUrls.map((url, index) => (
          <div key={index} className="banner-item">
            <img
              src={url}
              alt={`배너 ${index + 1}`}
              className="banner-preview"
            />
            <button onClick={() => removeBanner(url)}>삭제</button>
          </div>
        ))}
      </div>

      <div className="upload-banner">
        <input type="file" accept="image/*" onChange={handleFileUpload} />
        {loading && <p>업로드 중...</p>}
      </div>
    </div>
  );
};

export default MainAd;
