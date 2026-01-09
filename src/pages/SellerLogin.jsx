import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import "./SellerAuth.css";

function SellerLogin({ setSeller }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${baseUrl}/api/seller/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store seller info and token
        localStorage.setItem("sellerToken", data.token);
        localStorage.setItem("seller", JSON.stringify(data.seller));
        setSeller(data.seller);

        // Check approval status
        if (data.seller.isApproved && data.seller.status === "approved") {
          navigate("/seller/dashboard");
        } else {
          navigate("/seller/status");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Error logging in. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="seller-auth-page">
      <div className="seller-login-container">
        <h1>Seller Login</h1>
        <p className="subtitle">Sign in to your seller account</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="seller-form">
          <fieldset className="form-section">
            <legend>Account Credentials</legend>

            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label>Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
                required
              />
            </div>
          </fieldset>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-link">
          Don't have a seller account? <Link to="/seller/signup">Create one</Link>
        </p>

        <p className="back-link">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}

export default SellerLogin;
