import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // 화살표 아이콘
import "../../assets/css/main/ViewAllButton.css"; // CSS 파일 경로

const ViewAllButton = ({ to = "/all-products", label = "모든 상품 보기" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); // 지정된 경로로 이동
  };

  return (
    <button className="view-all-button" onClick={handleClick}>
      {label}
      <FaArrowRight className="arrow-icon" />
    </button>
  );
};

export default ViewAllButton;
