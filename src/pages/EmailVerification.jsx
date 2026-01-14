import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import "./EmailVerification.css";

function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Get email from localStorage or redirect
    const sellerData = localStorage.getItem("seller");
    if (!sellerData) {
      navigate("/seller/signup");
      return;
    }
    const seller = JSON.parse(sellerData);
    setEmail(seller.email);
  }, [navigate]);

  // Resend timer effect
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    if (otp.length !== 6 || isNaN(otp)) {
      setError("OTP must be 6 digits");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/seller/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Email verified successfully! Redirecting...");
        // Update localStorage
        localStorage.setItem("seller", JSON.stringify(data.seller));
        setTimeout(() => {
          navigate("/seller/status");
        }, 2000);
      } else {
        setError(data.message || "Failed to verify OTP");
        if (data.attempts) {
          setAttempts(data.attempts);
        }
      }
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError("");
    setSuccess("");
    setResendLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/seller/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("OTP sent successfully! Check your email.");
        setOtp("");
        setAttempts(0);
        setResendTimer(60); // 60 seconds cooldown
      } else {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Error resending OTP. Please try again.");
      console.error(err);
    } finally {
      setResendLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    if (value === "" || !isNaN(value)) {
      setOtp(value.slice(0, 6));
    }
  };

  return (
    <div className="email-verification-page">
      <div className="verification-container">
        <div className="verification-header">
          <div className="verification-icon">✓</div>
          <h1>Verify Your Email</h1>
          <p className="verification-subtitle">
            We've sent a 6-digit OTP to <strong>{email}</strong>
          </p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleVerifyOTP} className="verification-form">
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={handleInputChange}
              placeholder="000000"
              maxLength="6"
              disabled={isLoading}
              className="otp-input"
              inputMode="numeric"
              autoComplete="off"
            />
            <small>6-digit code</small>
          </div>

          {attempts > 0 && attempts < 5 && (
            <div className="attempts-warning">
              ⚠️ {5 - attempts} attempt(s) remaining
            </div>
          )}

          {attempts >= 5 && (
            <div className="attempts-locked">
              Too many failed attempts. Please request a new OTP.
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading || attempts >= 5}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <div className="resend-section">
          <p className="resend-text">Didn't receive the OTP?</p>
          <button
            type="button"
            onClick={handleResendOTP}
            className="resend-btn"
            disabled={resendLoading || resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
          </button>
        </div>

        <div className="verification-info">
          <p>
            <strong>Important:</strong> The OTP is valid for 10 minutes only. Please
            do not share this code with anyone.
          </p>
        </div>

        <div className="help-section">
          <p>
            Having trouble? <a href="/seller/signup">Go back to registration</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
