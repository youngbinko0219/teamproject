import { Link } from "react-router-dom";
import "../../assets/css/header/NavMenu.css";

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <Link to="/">메인화면</Link>
      <Link to="/about">회사소개</Link>
      <Link to="/categories">카테고리</Link>
      <Link to="/popular">인기상품</Link>
      <Link to="/recommended">추천상품</Link>
      <Link to="/notice">공지사항</Link>
    </nav>
  );
};

export default NavMenu;
