import "../../assets/css/mypage/MyPageLayout.css";
import Sidebar from "./Sidebar";

function MyPageLayout({ children }) {
  return (
    <div className="mypage-layout">
      <div className="mypage-layout__sidebar">
        <Sidebar />
      </div>
      <div className="mypage-layout__content">{children}</div>
    </div>
  );
}

export default MyPageLayout;
