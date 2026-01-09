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
      if (!token) {
        navigate("/seller/signup");
        return;
      }

      const response = await fetch(`${baseUrl}/api/seller/status`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setStatus(data);

      if (data.isApproved && data.status === "approved") {
        localStorage.setItem("sellerStatus", "approved");
      }
    } catch (err) {
      setError("Error fetching status");
      console.error(err);
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
