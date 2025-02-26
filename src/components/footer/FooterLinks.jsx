import { Link } from "react-router-dom";
import "../../assets/css/footer/FooterLinks.css";

const FooterLinks = () => {
  return (
    <div className="footer-links">
      <div>
        <h4>Support</h4>
        <Link to="/privacy-policy">개인정보 처리 방침</Link>
        <Link to="/terms-of-use">이용약관</Link>
      </div>
      <div>
        <h4>Account</h4>
        <Link to="/mypage/main">마이페이지</Link>
        <span>
          <Link to="/login">로그인</Link>
          <Link to="/terms-agreement">회원가입</Link>
        </span>
      </div>
      <div>
        <h4>Quick Link</h4>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default FooterLinks;
