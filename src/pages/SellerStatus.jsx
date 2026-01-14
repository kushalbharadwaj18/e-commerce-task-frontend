import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerStatus.css";

function SellerStatus() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 5000); // Check every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      console.log("Token from localStorage:", token ? `${token.substring(0, 20)}...` : "missing"); // Debug log
      
      if (!token) {
        console.warn("No token found, redirecting to signup");
        navigate("/seller/signup");
        return;
      }

      console.log(`Fetching status from: ${baseUrl}/api/seller/status`);
      const response = await fetch(`${baseUrl}/api/seller/status`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      console.log("API response status:", response.status); // Debug log
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(`API error: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      console.log("Status response data:", data); // Debug log
      console.log("Status value:", data.status);
      setStatus(data);

      if (data.isApproved && data.status === "approved") {
        localStorage.setItem("sellerStatus", "approved");
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(err.message || "Error fetching status");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("seller");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="status-page">
        <div className="status-container">
          <div className="spinner"></div>
          <p>Loading your status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-page">
        <div className="status-container error-state">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")} className="btn">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (!status) {
    return (
      <div className="status-page">
        <div className="status-container">
          <p>Unable to load status. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="status-page">
      <div className="status-container">
        {status.status === "pending" && (
          <div className="status-pending">
            <div className="icon pending-icon">⏳</div>
            <h2>Application Pending</h2>
            <p>Your seller application is under review by our admin team.</p>
            <p className="submitted-date">
              Submitted on: {new Date(status.createdAt).toLocaleDateString()}
            </p>
            <div className="info-box">
              <p>
                ℹ️ We typically review applications within 24-48 hours. You'll receive an email notification
                once your application is approved or if we need additional information.
              </p>
            </div>
            <button onClick={fetchStatus} className="btn btn-primary">
              Refresh Status
            </button>
          </div>
        )}

        {status.status === "approved" && (
          <div className="status-approved">
            <div className="icon approved-icon">✅</div>
            <h2>Congratulations! You're Approved</h2>
            <p>Your seller account has been approved.</p>
            <div className="info-box success">
              <p>
                🎉 You can now start listing products and managing your seller account. Access your seller
                dashboard to get started.
              </p>
            </div>
            <button onClick={() => navigate("/seller/dashboard")} className="btn btn-success">
              Go to Seller Dashboard
            </button>
          </div>
        )}

        {status.status === "rejected" && (
          <div className="status-rejected">
            <div className="icon rejected-icon">❌</div>
            <h2>Application Rejected</h2>
            <p>Unfortunately, your application was not approved.</p>
            {status.rejectionReason && (
              <div className="rejection-reason">
                <p>
                  <strong>Reason:</strong> {status.rejectionReason}
                </p>
              </div>
            )}
            <div className="info-box error">
              <p>
                📝 You can reapply after addressing the mentioned issues. Please contact support for more
                information.
              </p>
            </div>
            <button onClick={() => navigate("/seller/signup")} className="btn btn-primary">
              Reapply
            </button>
          </div>
        )}

        {status.status === "suspended" && (
          <div className="status-suspended">
            <div className="icon suspended-icon">🚫</div>
            <h2>Account Suspended</h2>
            <p>Your seller account has been suspended.</p>
            <div className="info-box error">
              <p>
                📧 Please contact our support team for more information about the suspension and how to
                resolve it.
              </p>
            </div>
            <button onClick={() => window.location.href = "/contactus"} className="btn">
              Contact Support
            </button>
          </div>
        )}

        {!status.status && (
          <div className="status-unknown">
            <h2>Unable to load status</h2>
            <p>Status information not available. Please try refreshing the page.</p>
            <button onClick={fetchStatus} className="btn btn-primary">
              Refresh
            </button>
          </div>
        )}

        <div className="status-footer">
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerStatus;
