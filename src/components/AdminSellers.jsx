import { useState, useEffect } from "react";
import "./AdminSellers.css";

function AdminSellers({ adminToken }) {
  const [sellers, setSellers] = useState([]);
  const [pendingSellers, setPendingSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      setLoading(true);

      // Fetch pending sellers
      const pendingRes = await fetch(`${baseUrl}/api/admin/sellers/pending-approvals`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      // Fetch all sellers
      const allRes = await fetch(`${baseUrl}/api/admin/sellers`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      if (pendingRes.ok) {
        const pendingData = await pendingRes.json();
        setPendingSellers(pendingData.sellers || []);
      }

      if (allRes.ok) {
        const allData = await allRes.json();
        setSellers(allData.sellers || []);
      }
    } catch (err) {
      setError("Error fetching sellers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSeller = async (sellerId) => {
    try {
      const response = await fetch(
        `${baseUrl}/api/admin/sellers/${sellerId}/approve`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );

      if (response.ok) {
        alert("Seller approved successfully");
        fetchSellers();
        setSelectedSeller(null);
      }
    } catch (err) {
      setError("Error approving seller");
    }
  };

  const handleRejectSeller = async (sellerId) => {
    if (!rejectReason.trim()) {
      alert("Please enter a rejection reason");
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/api/admin/sellers/${sellerId}/reject`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({ reason: rejectReason }),
        }
      );

      if (response.ok) {
        alert("Seller rejected");
        setRejectReason("");
        fetchSellers();
        setSelectedSeller(null);
      }
    } catch (err) {
      setError("Error rejecting seller");
    }
  };

  if (loading) {
    return <div className="sellers-section">Loading...</div>;
  }

  return (
    <div className="sellers-section">
      <div className="sellers-header">
        <h2>Sellers Management</h2>
        <p>Total Sellers: {sellers.length} | Pending Approval: {pendingSellers.length}</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="sellers-tabs">
        <button
          className={`tab ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Approvals ({pendingSellers.length})
        </button>
        <button
          className={`tab ${activeTab === "all" ? "active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All Sellers ({sellers.length})
        </button>
      </div>

      {activeTab === "pending" && (
        <div className="sellers-list">
          {pendingSellers.length === 0 ? (
            <p className="empty-state">No pending seller approvals</p>
          ) : (
            <div className="sellers-table">
              <div className="table-header">
                <div className="col-name">Name</div>
                <div className="col-email">Email</div>
                <div className="col-phone">Phone</div>
                <div className="col-date">Applied Date</div>
                <div className="col-action">Action</div>
              </div>

              {pendingSellers.map((seller) => (
                <div
                  key={seller._id}
                  className="table-row"
                  onClick={() => setSelectedSeller(seller)}
                >
                  <div className="col-name">{seller.name}</div>
                  <div className="col-email">{seller.email}</div>
                  <div className="col-phone">{seller.phone}</div>
                  <div className="col-date">
                    {new Date(seller.createdAt).toLocaleDateString()}
                  </div>
                  <div className="col-action">
                    <button className="btn-view">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "all" && (
        <div className="sellers-list">
          {sellers.length === 0 ? (
            <p className="empty-state">No sellers found</p>
          ) : (
            <div className="sellers-table">
              <div className="table-header">
                <div className="col-name">Name</div>
                <div className="col-email">Email</div>
                <div className="col-status">Status</div>
                <div className="col-earnings">Earnings</div>
                <div className="col-action">Action</div>
              </div>

              {sellers.map((seller) => (
                <div
                  key={seller._id}
                  className="table-row"
                  onClick={() => setSelectedSeller(seller)}
                >
                  <div className="col-name">{seller.name}</div>
                  <div className="col-email">{seller.email}</div>
                  <div className="col-status">
                    <span className={`status-badge ${seller.status}`}>
                      {seller.status}
                    </span>
                  </div>
                  <div className="col-earnings">₹{seller.totalEarnings?.toFixed(2) || "0.00"}</div>
                  <div className="col-action">
                    <button className="btn-view">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Seller Details Modal */}
      {selectedSeller && (
        <div className="modal-overlay" onClick={() => setSelectedSeller(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedSeller(null)}>
              ✕
            </button>

            <h3>{selectedSeller.name}</h3>

            <div className="seller-details">
              <div className="detail-group">
                <h4>Personal Information</h4>
                <p>
                  <strong>Email:</strong> {selectedSeller.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedSeller.phone}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status-badge ${selectedSeller.status}`}>
                    {selectedSeller.status}
                  </span>
                </p>
                <p>
                  <strong>Applied Date:</strong>{" "}
                  {new Date(selectedSeller.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="detail-group">
                <h4>Bank Details</h4>
                <p>
                  <strong>Bank Name:</strong> {selectedSeller.bankDetails?.bankName}
                </p>
                <p>
                  <strong>Account Holder:</strong> {selectedSeller.bankDetails?.accountHolder}
                </p>
                <p>
                  <strong>Account Number:</strong> ****
                  {selectedSeller.bankDetails?.accountNumber?.slice(-4)}
                </p>
                <p>
                  <strong>IFSC Code:</strong> {selectedSeller.bankDetails?.ifscCode}
                </p>
              </div>

              <div className="detail-group">
                <h4>Analytics</h4>
                <p>
                  <strong>Total Earnings:</strong> ₹
                  {selectedSeller.totalEarnings?.toFixed(2) || "0.00"}
                </p>
                <p>
                  <strong>Total Orders:</strong> {selectedSeller.totalOrders || 0}
                </p>
                <p>
                  <strong>Rating:</strong> ⭐ {selectedSeller.rating || "0.0"}
                </p>
              </div>

              {selectedSeller.status === "pending" && (
                <div className="approval-actions">
                  <div className="action-group">
                    <h4>Approval Actions</h4>
                    <button
                      className="btn btn-approve"
                      onClick={() => handleApproveSeller(selectedSeller._id)}
                    >
                      ✓ Approve Seller
                    </button>
                  </div>

                  <div className="action-group">
                    <h4>Rejection</h4>
                    <textarea
                      placeholder="Enter rejection reason (if rejecting)"
                      value={rejectReason}
                      onChange={(e) => setRejectReason(e.target.value)}
                      className="rejection-textarea"
                    />
                    <button
                      className="btn btn-reject"
                      onClick={() => handleRejectSeller(selectedSeller._id)}
                    >
                      ✕ Reject Seller
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminSellers;
