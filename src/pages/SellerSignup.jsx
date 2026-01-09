import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import "./SellerAuth.css";

function SellerSignup({ setSeller }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    aadhaarNumber: "",
    aadhaarDocument: null,
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("Aadhaar document must be less than 5MB");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        aadhaarDocument: file,
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("All personal details are required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (!formData.aadhaarNumber || !formData.aadhaarDocument) {
      setError("Aadhaar number and document are required");
      return false;
    }

    if (formData.aadhaarNumber.length !== 12 || isNaN(formData.aadhaarNumber)) {
      setError("Aadhaar number must be 12 digits");
      return false;
    }

    if (!formData.bankName || !formData.accountHolder || !formData.accountNumber || !formData.ifscCode) {
      setError("All bank details are required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Convert file to base64
      let aadhaarBase64 = "";
      if (formData.aadhaarDocument) {
        aadhaarBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(formData.aadhaarDocument);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }

      const response = await fetch(`${baseUrl}/api/seller/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          aadhaarNumber: formData.aadhaarNumber,
          aadhaarDocument: aadhaarBase64,
          bankName: formData.bankName,
          accountHolder: formData.accountHolder,
          accountNumber: formData.accountNumber,
          ifscCode: formData.ifscCode,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store seller info and token
        localStorage.setItem("sellerToken", data.token);
        localStorage.setItem("seller", JSON.stringify(data.seller));
        setSeller(data.seller);

        // Show success message or redirect
        alert(
          "Registration successful! Please wait for admin approval to access seller features."
        );
        navigate("/seller/status");
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Error during registration. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="seller-auth-page">
      <div className="seller-signup-container">
        <h1>Become a Seller</h1>
        <p className="subtitle">Join thousands of sellers and start selling on ExpressBuy</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="seller-form">
          {/* Personal Details Section */}
          <fieldset className="form-section">
            <legend>Personal Details</legend>

            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit number"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Minimum 6 characters"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Aadhaar Section */}
          <fieldset className="form-section">
            <legend>Aadhaar Verification</legend>

            <div className="form-group">
              <label>Aadhaar Number *</label>
              <input
                type="text"
                name="aadhaarNumber"
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
                placeholder="12-digit Aadhaar number"
                maxLength="12"
                disabled={isLoading}
                required
              />
              <small>Enter exactly 12 digits</small>
            </div>

            <div className="form-group">
              <label>Aadhaar Document Upload *</label>
              <input
                type="file"
                name="aadhaarDocument"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                disabled={isLoading}
                required
              />
              <small>Accepted formats: PDF, JPG, PNG (Max 5MB)</small>
              {formData.aadhaarDocument && (
                <p className="file-selected">
                  ✓ {formData.aadhaarDocument.name} ({(formData.aadhaarDocument.size / 1024).toFixed(2)} KB)
                </p>
              )}
            </div>
          </fieldset>

          {/* Bank Details Section */}
          <fieldset className="form-section">
            <legend>Bank Account Details</legend>

            <div className="form-group">
              <label>Bank Name *</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                placeholder="e.g., ICICI Bank, SBI, HDFC Bank"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Account Holder Name *</label>
                <input
                  type="text"
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleInputChange}
                  placeholder="Name as per bank account"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="form-group">
                <label>Account Number *</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="16-digit account number"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>IFSC Code *</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                placeholder="e.g., ICIC0000123"
                disabled={isLoading}
                required
              />
              <small>11-character IFSC code</small>
            </div>
          </fieldset>

          <div className="agreement">
            <input type="checkbox" required disabled={isLoading} />
            <label>
              I agree to the Seller Terms & Conditions and confirm that all information provided is accurate.
            </label>
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Seller Account"}
          </button>
        </form>

        <p className="auth-link">
          Already a seller? <Link to="/seller/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
}

export default SellerSignup;
