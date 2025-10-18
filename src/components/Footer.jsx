import "./Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Get to Know Us</h4>
          <ul>
            <li>
              <a href="#about">About Amazon</a>
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
          <h4>Make Money with Us</h4>
          <ul>
            <li>
              <a href="#sell">Sell on Amazon</a>
            </li>
            <li>
              <a href="#advertise">Advertise Your Products</a>
            </li>
            <li>
              <a href="#become-affiliate">Become an Affiliate</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Help & Settings</h4>
          <ul>
            <li>
              <a href="#help">Help Center</a>
            </li>
            <li>
              <a href="#account">Your Account</a>
            </li>
            <li>
              <a href="#returns">Returns & Replacements</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Amazon Clone. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
