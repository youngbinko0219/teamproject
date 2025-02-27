import { Link } from "react-router-dom";
import "../../assets/css/header/NavMenu.css";

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <Link to="/products/all">모든 상품</Link>
      <Link to="/products/best">인기 상품</Link>
      <Link to="/products/today">오늘의 상품</Link>
      <Link to="/products/new">새로운 상품</Link>
    </nav>
  );
};

export default NavMenu;
