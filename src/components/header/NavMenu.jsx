import { Link } from "react-router-dom";
import "../../assets/css/header/NavMenu.css";

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <Link to="/all-products">모든 상품</Link>
      <Link to="/best-products">베스트 상품</Link>
      <Link to="/today-products">오늘의 상품</Link>
      <Link to="/new-products">새로운 상품</Link>
    </nav>
  );
};

export default NavMenu;
