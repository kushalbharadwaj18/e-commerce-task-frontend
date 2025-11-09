import React from "react";
import "./RefundPolicy.css";

const RefundPolicy = () => {
  return (
    <div className="refund-container">
      <h1>Refund & Cancellation Policy</h1>
      <p className="last-updated">Last Updated: January 2025</p>

      <section>
        <h2>1. Overview</h2>
        <p>
          At <strong>ExpressBuy</strong>, customer satisfaction is our top priority.
          We strive to provide a seamless and transparent shopping experience
          across all our product categories — from electronics and accessories
          to digital products and exclusive deals. This Refund & Cancellation
          Policy outlines your rights and our procedures for handling returns,
          refunds, and cancellations made through <a href="https://expressbuy.page/">expressbuy.page</a>.
        </p>
      </section>

      <section>
        <h2>2. Eligibility for Refunds & Returns</h2>

        <h3>2.1 Physical Products</h3>
        <p>
          You may request a refund or replacement for any physical product under
          the following conditions:
        </p>
        <ul>
          <li>The product was damaged or defective upon delivery.</li>
          <li>You received the wrong item.</li>
          <li>Missing components or accessories as listed in the description.</li>
          <li>The product does not match the website description or images.</li>
        </ul>
        <p>
          <strong>Return Window:</strong> Refund or replacement requests must be
          submitted within <strong>7 days</strong> from the date of delivery.
        </p>

        <h3>2.2 Digital Products</h3>
        <p>
          Due to the instant delivery nature of digital goods (e.g., e-books,
          software keys, digital downloads), refunds are <strong>not applicable</strong> once
          the product has been delivered or downloaded.
        </p>
        <p>Refunds may only be issued if:</p>
        <ul>
          <li>The digital file is corrupted or inaccessible.</li>
          <li>You were charged multiple times for the same order.</li>
          <li>
            The download link or access key is invalid or non-functional and
            remains unresolved after support contact.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Order Cancellation Policy</h2>

        <h3>3.1 Before Dispatch</h3>
        <p>
          You can cancel your order for physical products any time before it has
          been shipped. Once dispatched, cancellation will not be possible. To
          cancel, contact our support team at{" "}
          <a href="mailto:support@expressby.in">support@ExpressBuy.in</a> with
          your order ID.
        </p>

        <h3>3.2 After Dispatch</h3>
        <p>
          If your order has been dispatched, you can refuse delivery. Once the
          shipment returns to our warehouse, your refund will be processed (after
          deducting applicable shipping charges).
        </p>

        <h3>3.3 Digital Products</h3>
        <p>
          Digital orders (software, e-books, codes) cannot be canceled once the
          access key or download link has been sent.
        </p>
      </section>

      <section>
        <h2>4. Refund Process</h2>
        <p>Once your refund request is approved, the process includes:</p>
        <ol>
          <li>Product inspection for condition and validity of claim.</li>
          <li>Email confirmation of refund approval.</li>
          <li>Refund initiation to the original payment method.</li>
        </ol>
        <p><strong>Refund Timelines:</strong></p>
        <ul>
          <li>UPI / Wallets: 3–5 business days</li>
          <li>Net Banking: 5–7 business days</li>
          <li>Credit/Debit Cards: 7–10 business days</li>
        </ul>
      </section>

      <section>
        <h2>5. Non-Refundable Items</h2>
        <ul>
          <li>Gift cards and promotional coupons</li>
          <li>Downloaded digital products</li>
          <li>Items marked as “Final Sale” or “Non-Returnable”</li>
        </ul>
      </section>

      <section>
        <h2>6. Contact Us</h2>
        <p>
          For refund or cancellation requests, please contact our support team:
        </p>
        <p>
          <strong>ExpressBuy – Support Team</strong>
          <br />
          Email: <a href="mailto:support@expressbuy.in">support@ExpressBuy.in</a>
          <br />
          Website: <a href="https://www.expressbuy.in">www.ExpressBuy.in</a>
        </p>
      </section>

      <footer className="policy-footer">
        <p>
          By purchasing on ExpressBuy, you acknowledge that you have read,
          understood, and agree to this Refund & Cancellation Policy.
        </p>
      </footer>
    </div>
  );
};

export default RefundPolicy;
