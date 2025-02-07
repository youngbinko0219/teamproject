import { Link } from "react-router-dom";
import "../../assets/css/header/NavMenu.css";

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <Link to="/about">카테고리</Link>
      <Link to="/categories">모든상품</Link>
      <Link to="/popular">인기상품</Link>
      <Link to="/recommended">추천상품</Link>
      <Link to="/notice">새로운상품</Link>
    </nav>
  );
};

export default NavMenu;
