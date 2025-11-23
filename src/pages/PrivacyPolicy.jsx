import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p><strong>Last Updated:</strong> November 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          Welcome to <strong>ExpressBuy</strong> (“we,” “our,” or “us”). We are committed to safeguarding 
          your personal information. This Privacy Policy describes how we collect, use, store, and protect 
          your data when you visit our website{" "}
          <a
            href="https://expressbuy.page/"
            target="_blank"
            rel="noreferrer"
          >
            expressbuy.page
          </a>{" "}
          and purchase our physical products or use our online features.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>

        <h3>2.1 Personal Information</h3>
        <p>We collect personal information to process orders and improve customer experience, including:</p>
        <ul>
          <li>Full name and email address</li>
          <li>Phone number and contact preferences</li>
          <li>Shipping and billing address</li>
          <li>Account credentials (encrypted password)</li>
          <li>Order history and transaction details</li>
        </ul>

        <h3>2.2 Automatically Collected Information</h3>
        <ul>
          <li>IP address and browser type</li>
          <li>Device details and operating system</li>
          <li>Pages viewed, time spent, and website interactions</li>
          <li>Cookies and tracking technologies for analytics and personalization</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>Your information is used for the following purposes:</p>
        <ul>
          <li>Processing and delivering your orders</li>
          <li>Creating and managing your ExpressBuy account</li>
          <li>Providing customer support and resolving issues</li>
          <li>Sending order updates, confirmations, and notifications</li>
          <li>Improving website performance and user experience</li>
          <li>Preventing fraud and enhancing security</li>
          <li>Sending promotional communications (optional; you may opt out)</li>
          <li>Meeting legal and regulatory obligations</li>
        </ul>
      </section>

      <section>
        <h2>4. Payment Processing</h2>
        <p>
          All payments are securely handled through our trusted payment gateway, <strong>Razorpay</strong>. 
          We do not store your complete card, UPI, or bank details. Razorpay processes all transactions 
          using industry-standard encryption and is fully compliant with PCI-DSS security requirements.
        </p>
      </section>

      <section>
        <h2>5. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies to maintain your shopping cart, enhance site performance, and understand user 
          behavior. You may disable cookies via your browser settings, but some website functionality 
          may be affected.
        </p>
      </section>

      <section>
        <h2>6. Data Security</h2>
        <p>
          We implement SSL encryption, secure servers, and regular security audits to protect your 
          personal data. While we take strong precautions, no online platform is completely secure. 
          We encourage you to keep your password private and secure.
        </p>
      </section>

      <section>
        <h2>7. Children's Privacy</h2>
        <p>
          ExpressBuy is intended for individuals aged 18 and above. We do not knowingly collect data 
          from children under 18. If you believe a minor has provided information, please contact us 
          immediately so we can remove it.
        </p>
      </section>

      <section>
        <h2>8. Data Retention</h2>
        <p>
          We retain your data only as long as needed to complete orders, provide support, and comply 
          with legal obligations. You may request account or data deletion at any time.
        </p>
      </section>

      <section>
        <h2>9. Your Privacy Rights</h2>
        <ul>
          <li>Access your personal information</li>
          <li>Request corrections or updates</li>
          <li>Request account or data deletion</li>
          <li>Withdraw from marketing communications</li>
          <li>Request a copy of your data</li>
          <li>Opt out of non-essential analytics tracking</li>
        </ul>
        <p>
          To exercise your privacy rights, contact us at{" "}
          <a href="mailto:support@expressbuy.in">support@expressbuy.in</a>.
        </p>
      </section>

      <section>
        <h2>10. Third-Party Services</h2>
        <p>
          We may share limited information with service providers such as payment gateways, courier 
          partners, and analytics tools. These services operate under their own privacy policies, 
          and we advise reviewing them separately.
        </p>
      </section>

      <section>
        <h2>11. International Users</h2>
        <p>
          ExpressBuy operates from India. If you access our platform from outside India, you consent 
          to your data being processed in accordance with Indian data protection laws.
        </p>
      </section>

      <section>
        <h2>12. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be reflected on this page 
          with an updated “Last Updated” date. Continued use of the website after revisions signifies 
          your acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2>13. Contact Us</h2>
        <p>
          <strong>ExpressBuy</strong><br />
          Customer Support Team<br />
          Email:{" "}
          <a href="mailto:support@expressbuy.in">support@expressbuy.in</a><br />
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
          and agree to this Privacy Policy.
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
