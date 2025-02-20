import { Link } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "../../assets/css/pages/notFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="not-found-page-container">
      <Header />
      <main className="not-found-content">
        <h1>404 NOT FOUND</h1>
        <Link to="/" className="home-button">
          홈페이지로 돌아가기
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
