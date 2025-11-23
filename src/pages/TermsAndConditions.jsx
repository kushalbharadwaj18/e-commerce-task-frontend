import React from "react";
import "./TermsAndConditions.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>
      <p><strong>Last Updated:</strong> November 2025</p>

      {/* 1. Agreement */}
      <section>
        <h2>1. Agreement to Terms</h2>
        <p>
          Welcome to <strong>ExpressBuy</strong>. By accessing our website at{" "}
          <a href="https://expressbuy.page/" target="_blank" rel="noreferrer">
            expressbuy.page
          </a>{" "}
          and placing an order, you agree to be bound by these Terms & Conditions.
        </p>
        <p>
          If you do not agree with any part of these terms, please stop using our
          website immediately. By making a purchase, you confirm that you are at
          least 18 years old and legally capable of entering into a binding contract.
        </p>
      </section>

      {/* 2. Nature of Business */}
      <section>
        <h2>2. Nature of Business</h2>
        <p>
          ExpressBuy is an e-commerce platform that sells <strong>physical consumer products</strong>
          across multiple categories. All our products are <strong>original</strong> and sourced from
          verified suppliers. We do not sell digital services or digital goods of any kind.
        </p>
      </section>

      {/* 3. Accounts */}
      <section>
        <h2>3. Account Registration and Security</h2>

        <h3>3.1 Account Creation</h3>
        <p>
          You may need to create an account to place an order. You must provide accurate
          details such as your name, email, phone number, and shipping address.
        </p>

        <h3>3.2 Account Security</h3>
        <ul>
          <li>You are responsible for safeguarding your login credentials.</li>
          <li>Notify us immediately if you suspect unauthorized access.</li>
          <li>Account sharing is strictly prohibited.</li>
          <li>We may suspend accounts involved in fraud or policy violations.</li>
        </ul>
      </section>

      {/* 4. Payments */}
      <section>
        <h2>4. Pricing and Payments</h2>
        <p>
          All product prices are listed in Indian Rupees (INR) and include applicable taxes.
          Prices may change based on stock, supplier updates, or promotional offers.
        </p>
        <p>Payments are securely processed through Razorpay using:</p>
        <ul>
          <li>Credit/Debit Cards</li>
          <li>UPI</li>
          <li>Net Banking</li>
          <li>Digital Wallets</li>
        </ul>
        <p>
          After successful payment, you will receive an order confirmation via email or SMS.
        </p>
      </section>

      {/* 5. Product Information */}
      <section>
        <h2>5. Product Information</h2>
        <p>
          We make every effort to display accurate product descriptions and images. However,
          slight variations may occur due to screen differences or manufacturer updates.
        </p>
        <p>ExpressBuy is not responsible for minor visual differences.</p>
      </section>

      {/* 6. Shipping */}
      <section>
        <h2>6. Shipping & Delivery</h2>
        <ul>
          <li>We currently ship only to select states within India.</li>
          <li>Typical delivery time is <strong>3–7 business days</strong>, depending on location.</li>
          <li>Orders are shipped via trusted courier partners.</li>
          <li>Delivery delays may occur due to weather, courier issues, or operational reasons.</li>
        </ul>
      </section>

      {/* 7. Refunds */}
      <section>
        <h2>7. Returns, Refunds & Cancellations</h2>
        <h3>7.1 Return Policy</h3>
        <p>
          You may request a return within <strong>7 days of delivery</strong> ONLY if:
        </p>
        <ul>
          <li>The product is damaged</li>
          <li>The product is defective</li>
          <li>Wrong item was delivered</li>
        </ul>
        <p>The item must be unused and in original packaging.</p>

        <h3>7.2 Refund Process</h3>
        <p>
          After the product is inspected and approved, refunds will be processed within
          <strong> 7-10 business days</strong> to the original payment method.
        </p>

        <h3>7.3 Order Cancellation</h3>
        <p>
          You can cancel your order <strong>before it is shipped</strong>. Once shipped, it
          can only be processed as a return.
        </p>
      </section>

      {/* 8. User Conduct */}
      <section>
        <h2>8. User Conduct</h2>
        <ul>
          <li>Do not engage in fraudulent transactions.</li>
          <li>Provide accurate shipping and contact information.</li>
          <li>Do not use bots, scripts, or automated tools.</li>
          <li>Do not attempt to harm or disrupt the website.</li>
        </ul>
      </section>

      {/* 9. Liability */}
      <section>
        <h2>9. Limitation of Liability</h2>
        <p>
          ExpressBuy is not responsible for indirect or consequential damages caused by delay,
          courier issues, product misuse, or factors beyond our control.
        </p>
        <p>
          Our maximum liability is limited to the amount you paid for the concerned product.
        </p>
      </section>

      {/* 10. IP */}
      <section>
        <h2>10. Intellectual Property Rights</h2>
        <p>
          All content, images, text, and materials on ExpressBuy belong to ExpressBuy or our
          licensors. You may not copy or reuse any content without prior permission.
        </p>
      </section>

      {/* 11. Termination */}
      <section>
        <h2>11. Account Termination</h2>
        <h3>11.1 By the User</h3>
        <p>You may delete your account at any time.</p>

        <h3>11.2 By ExpressBuy</h3>
        <p>We may suspend or terminate accounts involved in fraud or policy violations.</p>
      </section>

      {/* 12. Law */}
      <section>
        <h2>12. Governing Law & Disputes</h2>
        <p>
          These terms are governed by the laws of India. All disputes fall under the
          jurisdiction of Indian courts.
        </p>
      </section>

      {/* 13. Changes */}
      <section>
        <h2>13. Changes to Terms</h2>
        <p>
          We may update these Terms & Conditions anytime. The "Last Updated" date will reflect
          the latest changes.
        </p>
      </section>

      {/* 14. Contact */}
      <section>
        <h2>14. Contact Information</h2>
        <p>
          <strong>ExpressBuy</strong><br />
          Customer Support<br />
          Email:{" "}
          <a href="mailto:support@expressbuy.in">support@expressbuy.in</a><br />
          Website:{" "}
          <a href="https://expressbuy.page/" target="_blank" rel="noreferrer">
            expressbuy.page
          </a>
        </p>
      </section>

      <footer>
        <p>
          By using ExpressBuy or making a purchase, you acknowledge that you have
          read and agree to these Terms & Conditions.
        </p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
