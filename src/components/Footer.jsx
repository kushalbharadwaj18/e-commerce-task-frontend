import "./Footer.css"
import { Link } from "react-router-dom"
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Get to Know Us</h4>
          <ul>
            <li>
              <a href="#about">About ExpressBuy</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#press">Press Releases</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Connect with Us</h4>
          <ul>
            <li>
              <a href="#facebook">Facebook</a>
            </li>
            <li>
              <a href="#twitter">Twitter</a>
            </li>
            <li>
              <a href="#instagram">Instagram</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Quick Link</h4>
          <ul>
            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/refund-and-cancellation">Refund & Cancellation</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 ExpressBuy. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
