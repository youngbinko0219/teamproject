import FooterLinks from "./FooterLinks";
import SocialMedia from "./SocialMedia";
import Newsletter from "./Newsletter";
import ContactInfo from "./ContactInfo";
import "../../assets/css/footer/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterLinks />
      <SocialMedia />
      <Newsletter />
      <ContactInfo />
    </footer>
  );
};

export default Footer;
