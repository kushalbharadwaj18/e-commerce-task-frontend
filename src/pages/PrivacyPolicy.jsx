import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated:</strong> November 7, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>ExpressBuy</strong> (“we,” “our,” or “us”). We
          value your trust and are committed to protecting your personal
          information and your privacy. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our website{" "}
          <a
            href="https://expressbuy.page/"
            target="_blank"
            rel="noreferrer"
          >
            expressbuy.page
          </a>{" "}
          and use our online services or products.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <h3>2.1 Personal Information</h3>
        <p>We may collect the following personal information when you register or interact with our services:</p>
        <ul>
          <li>Full name and email address</li>
          <li>Phone number and contact preferences</li>
          <li>Account credentials (username and encrypted password)</li>
          <li>Billing details processed through our payment gateway</li>
          <li>Order or service history and transaction details</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <ul>
          <li>IP address and browser type</li>
          <li>Device information and operating system</li>
          <li>Pages visited, time spent, and actions taken</li>
          <li>Cookies and tracking technologies for analytics and personalization</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use your information for purposes such as:</p>
        <ul>
          <li>Providing and improving ExpressBuy services</li>
          <li>Responding to inquiries and customer support requests</li>
          <li>Enhancing user experience and personalization</li>
          <li>Sending order confirmations, updates, or notifications</li>
          <li>Maintaining security and preventing fraud</li>
          <li>Sending promotional emails (you may opt out anytime)</li>
          <li>Complying with legal obligations</li>
        </ul>
      </section>

      <section>
        <h2>4. Payment Processing</h2>
        <p>
          All payments are processed securely through trusted third-party gateways such as Razorpay or Paytm. 
          We do not store your full credit/debit card details. All transactions are encrypted and compliant with PCI-DSS standards.
        </p>
      </section>

      <section>
        <h2>5. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies to remember your preferences, track activity, and improve performance. 
          You can manage or disable cookies in your browser settings, but doing so may limit some functionalities.
        </p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We employ SSL encryption, secure servers, and periodic security audits to protect your personal data. 
          While we strive to maintain a high level of security, no system is completely secure, and we encourage users to protect their passwords.
        </p>
      </section>

      <section>
        <h2>7. Children's Privacy</h2>
        <p>
          Our website and services are intended for users above the age of 18. 
          We do not knowingly collect personal data directly from children under 18. 
          If you believe your child has provided personal information, please contact us immediately to have it removed.
        </p>
      </section>

      <section>
        <h2>8. Data Retention</h2>
        <p>
          We retain customer information for as long as necessary to provide services, support, 
          and comply with legal and tax requirements. You may request data deletion at any time.
        </p>
      </section>

      <section>
        <h2>9. Your Privacy Rights</h2>
        <ul>
          <li>Access and review your personal information</li>
          <li>Request corrections or deletion of your account</li>
          <li>Withdraw consent for marketing communications</li>
          <li>Export your data in a readable format</li>
          <li>Opt out of tracking and profiling</li>
        </ul>
        <p>
          To exercise these rights, please contact us at{" "}
          <a href="mailto:support@ExpressBuy.in">support@ExpressBuy.in</a>.
        </p>
      </section>

      <section>
        <h2>10. Third-Party Services</h2>
        <p>
          We may use third-party services such as analytics, shipping partners, or social media integrations. 
          These services operate under their own privacy policies. We encourage you to review them separately.
        </p>
      </section>

      <section>
        <h2>11. International Users</h2>
        <p>
          ExpressBuy operates from India. By accessing our services from outside India, 
          you consent to the transfer and processing of your data in accordance with Indian data protection laws.
        </p>
      </section>

      <section>
        <h2>12. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy periodically. Changes will be reflected on this page with an updated date. 
          Continued use of our services after changes indicates acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>13. Contact Us</h2>
        <p>
          <strong>ExpressBuy</strong><br />
          Online Services & Digital Platform<br />
          Email:{" "}
          <a href="mailto:support@ExpressBuy.in">support@expressbuy.in</a><br />
          Website:{" "}
          <a
            href="https://expressbuy.page/"
            target="_blank"
            rel="noreferrer"
          >
            expressbuy.page
          </a>
        </p>
      </section>

      <footer>
        <p>
          By using ExpressBuy, you acknowledge that you have read, understood,
          and agree to be bound by this Privacy Policy.
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
