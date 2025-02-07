import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "../../assets/css/main/ArrowButton.css"; // CSS 파일 경로

const ArrowButton = ({ direction, onClick }) => {
  return (
    <button className={`arrow-button ${direction}`} onClick={onClick}>
      {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
    </button>
  );
};

export default ArrowButton;
