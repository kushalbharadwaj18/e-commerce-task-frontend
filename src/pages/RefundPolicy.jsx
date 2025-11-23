import React from "react";
import "./RefundPolicy.css";

const RefundPolicy = () => {
  return (
    <div className="refund-container">
      <h1>Refund & Cancellation Policy</h1>
      <p className="last-updated">Last Updated: November 2025</p>

      <section>
        <h2>1. Overview</h2>
        <p>
          At <strong>ExpressBuy</strong>, we prioritize customer satisfaction and
          transparency. This Refund & Cancellation Policy explains how refunds,
          returns, and cancellations are handled for orders placed through{" "}
          <a href="https://expressbuy.page/">expressbuy.page</a>. This policy
          applies only to <strong>physical products</strong> sold on our
          platform.
        </p>
      </section>

      <section>
        <h2>2. Eligibility for Refunds & Returns</h2>

        <h3>2.1 Physical Products</h3>
        <p>Customers may request a return, replacement, or refund if:</p>
        <ul>
          <li>The product was damaged or defective upon delivery.</li>
          <li>You received the wrong item.</li>
          <li>Important components or accessories are missing.</li>
          <li>
            The product does not match the description displayed on the website.
          </li>
        </ul>
        <p>
          <strong>Return Window:</strong> Return/refund requests must be
          submitted within <strong>7 days</strong> from the date of delivery.
        </p>

        <p>To qualify for return approval:</p>
        <ul>
          <li>The product must be unused and in its original packaging.</li>
          <li>All accessories, manuals, and tags must be returned.</li>
          <li>Proof of purchase (Order ID or invoice) must be provided.</li>
        </ul>

        <h3>2.2 Digital Products</h3>
        <p>
          <strong>No digital products are sold on ExpressBuy.</strong> All
          purchases made on the website are for physical products only.
        </p>
      </section>

      <section>
        <h2>3. Order Cancellation Policy</h2>

        <h3>3.1 Before Shipment</h3>
        <p>
          You may cancel your order at any time before it has been dispatched.
          To request cancellation, please contact us at{" "}
          <a href="mailto:support@expressbuy.in">support@expressbuy.in</a> with
          your Order ID.
        </p>

        <h3>3.2 After Shipment</h3>
        <p>
          Once shipped, orders cannot be canceled. However, you may refuse the
          delivery. After the product is returned to our warehouse and inspected,
          your refund will be processed. Shipping charges may be deducted where
          applicable.
        </p>
      </section>

      <section>
        <h2>4. Refund Process</h2>
        <p>
          Once your return request is approved, the following steps will take
          place:
        </p>
        <ol>
          <li>The product will undergo a quality inspection.</li>
          <li>
            You will receive an email notification confirming approval or
            rejection.
          </li>
          <li>Refund will be issued to the original payment method.</li>
        </ol>

        <p>
          <strong>Refund Timelines (as per payment gateway and bank
          policies):</strong>
        </p>
        <ul>
          <li>UPI / Wallets: 3–5 business days</li>
          <li>Net Banking: 5–7 business days</li>
          <li>Credit/Debit Cards: 7–10 business days</li>
        </ul>
      </section>

      <section>
        <h2>5. Non-Returnable / Non-Refundable Items</h2>
        <ul>
          <li>Items marked as “Non-Returnable”.</li>
          <li>
            Products damaged due to misuse or handling after delivery.
          </li>
          <li>
            Products returned without complete packaging or missing accessories.
          </li>
          <li>Gift cards or promotional free items (if any).</li>
        </ul>
      </section>

      <section>
        <h2>6. Shipping Costs for Returns</h2>
        <p>
          If the return is due to an error from ExpressBuy (wrong item,
          defective or damaged product), return shipping is free.
        </p>
        <p>
          For customer-initiated returns, return shipping charges may apply.
        </p>
      </section>

      <section>
        <h2>7. Contact Us</h2>
        <p>For refund or cancellation requests, contact:</p>
        <p>
          <strong>ExpressBuy – Support Team</strong>
          <br />
          Email:{" "}
          <a href="mailto:support@expressbuy.in">support@expressbuy.in</a>
          <br />
          Website: <a href="https://expressbuy.page">expressbuy.page</a>
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
