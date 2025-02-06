import Logo from "./Logo";
import NavMenu from "./NavMenu";
import SearchBar from "./SearchBar";
import UserActions from "./UserActions";
import "../../assets/css/header/Header.css";

const Header = () => {
  return (
    <header className="header">
      <Logo />
      <NavMenu />
      <SearchBar />
      <UserActions />
    </header>
  );
};

export default Header;
