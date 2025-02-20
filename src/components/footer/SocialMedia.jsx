import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // 아이콘 임포트
import "../../assets/css/footer/SocialMedia.css";

const SocialMedia = () => {
  return (
    <div className="social-media">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={24} /> {/* Facebook 아이콘 */}
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FaTwitter size={24} /> {/* Twitter 아이콘 */}
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={24} /> {/* Instagram 아이콘 */}
      </a>
    </div>
  );
};

export default SocialMedia;
