import FooterLinks from "./FooterLinks";
import SocialMedia from "./SocialMedia";
import ContactInfo from "./ContactInfo";
import "../../assets/css/footer/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <FooterLinks />
      <SocialMedia />
      <ContactInfo />
    </footer>
  );
};

export default Footer;
