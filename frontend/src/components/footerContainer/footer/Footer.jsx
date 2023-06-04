import lucentLogo from "./lucentLogo.png";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footerLogoContainer">
        <img src={lucentLogo} alt="lucentLogo" className="footerLogo" />
      </div>
      <div className="footerItemsContainer">
        <ul className="footerUl">
          <li className="footerItems">
            <a className="footerListItemAnchor" href="/">
              Blog
            </a>
          </li>
          <li className="footerItems">
            <a className="footerListItemAnchor" href="/">
              Help
            </a>
          </li>
          <li className="footerItems">
            <a className="footerListItemAnchor" href="/">
              Terms and Services
            </a>
          </li>
          <li className="footerItems">
            <a className="footerListItemAnchor" href="/">
              Privacy Policy
            </a>
          </li>
          <li className="footerItems">
            <a className="footerListItemAnchor" href="/">
              Feedback
            </a>
          </li>
        </ul>
        <div className="footerCopyright">&copy; 2023 Lucent Innovation</div>
      </div>
      <div className="footerNewsLetterContainer">
        <h2 className="footerNewsLetterHeading">Join our growing community</h2>
        <div className="footerNewsLetterContentContainer">
          <p className="footerNewsLetterContent">
            Sign up for news and updates about ...
          </p>
        </div>
        <form action="post">
          <input
            autocomplete="off"
            type="email"
            className="footerNewsletterInput"
            placeholder="Enter your email here.."
          />
          <button className="footerNewsletterSubmitButton" type="submit">
            Subscribe
          </button>
        </form>
        <div className="footerNewsLetterContent2">
          <p className="footerContent2">
            I understand I can unsubscribe at any time.{" "}
            <a href="/" className="privacyPolicy">
              {" "}
              Privacy Policy
            </a>
          </p>
          <div className="nav">
            <h4 className="sm-header">Follow us on</h4>
            <div className="line"></div>
            <ul className="nav-list">
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="fab fa-instagram" aria-hidden="true"></i>
                </a>
              </li>

              <li className="nav-item">
                <a href="/" className="nav-link">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
