import { Link } from "react-router-dom";
import "../../assets/css/footer/FooterLinks.css";

const FooterLinks = () => {
  return (
    <div className="footer-links">
      <div>
        <h4>Support</h4>
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-use">Terms of Use</Link>
      </div>
      <div>
        <h4>Account</h4>
        <Link to="/my-account">My Account</Link>
        <Link to="/login-register">Login / Register</Link>
      </div>
      <div>
        <h4>Quick Link</h4>
        <Link to="/shop">Shop</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default FooterLinks;
