import { Link } from "react-router-dom"; // Link 임포트
import "../../assets/css/header/Logo.css";
import logo from "../../assets/images/logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Company Logo" />
      </Link>
    </div>
  );
};

export default Logo;
