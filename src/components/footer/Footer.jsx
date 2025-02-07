import FooterLinks from "./FooterLinks";
import SocialMedia from "./SocialMedia";
import Newsletter from "./Newsletter";
import ContactInfo from "./ContactInfo";
import AppDownload from "./AppDownload";
import "../../assets/css/footer/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterLinks />
      <SocialMedia />
      <Newsletter />
      <ContactInfo />
      <AppDownload />
    </footer>
  );
};

export default Footer;
