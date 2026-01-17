import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="helpline">
          <p>Helpline: <a href="tel:+1234567890">+1 234 567 890</a></p>
        </div>

        <div className="contact-us">
          <p>Contact us:</p>
          <div className="social-icons">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Trash2Cash. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
