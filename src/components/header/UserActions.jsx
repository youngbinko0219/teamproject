import { Link } from "react-router-dom";
import "../../assets/css/header/UserActions.css";

const UserActions = () => {
  return (
    <div className="user-actions">
      <Link to="/login">로그인</Link>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default UserActions;
