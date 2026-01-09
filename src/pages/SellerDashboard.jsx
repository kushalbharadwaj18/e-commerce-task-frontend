import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SellerDashboard.css";

function SellerDashboard() {
  const [seller, setSeller] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showWithdrawal, setShowWithdrawal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "100",
  });
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditBank, setShowEditBank] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: "",
    phone: "",
  });
  const [editBank, setEditBank] = useState({
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchSellerData();
  }, []);

  const fetchSellerData = async () => {
    try {
      const token = localStorage.getItem("sellerToken");
      if (!token) {
        navigate("/seller/login");
        return;
      }

      // Fetch seller profile
      const profileRes = await fetch(`${baseUrl}/api/seller/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (profileRes.status === 403) {
        navigate("/seller/status");
        return;
      }

      if (!profileRes.ok) {
        throw new Error("Failed to load profile");
      }

      const profileData = await profileRes.json();
      setSeller(profileData.seller);

      // Fetch seller's products
      const productsRes = await fetch(`${baseUrl}/api/seller/products/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.products || []);
      }

      // Fetch seller's orders
      const ordersRes = await fetch(`${baseUrl}/api/seller/orders/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      }

      // Fetch withdrawal history
      const withdrawalsRes = await fetch(
        `${baseUrl}/api/seller/withdrawals/history`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (withdrawalsRes.ok) {
        const withdrawalsData = await withdrawalsRes.json();
        setWithdrawals(withdrawalsData.withdrawals || []);
      }
    } catch (err) {
      setError(err.message || "Error fetching data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    if (!productImage) {
      setError("Please upload a product image");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("sellerToken");
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("stock", newProduct.stock);
      formData.append("image", productImage);

      const response = await fetch(`${baseUrl}/api/seller/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "100",
        });
        setProductImage(null);
        setImagePreview(null);
        setShowAddProduct(false);
        setError("");
        await fetchSellerData();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to add product");
      }
    } catch (err) {
      setError("Error adding product");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }

      setProductImage(file);
      setError("");

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const token = localStorage.getItem("sellerToken");
      const response = await fetch(
        `${baseUrl}/api/seller/products/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        await fetchSellerData();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product");
      console.error(err);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("sellerToken");
      const response = await fetch(`${baseUrl}/api/seller/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        await fetchSellerData();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update order");
      }
    } catch (err) {
      setError("Error updating order");
      console.error(err);
    }
  };

  const handleRequestWithdrawal = async (e) => {
    e.preventDefault();

    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("sellerToken");
      const response = await fetch(`${baseUrl}/api/seller/withdrawals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: parseFloat(withdrawalAmount) }),
      });

      if (response.ok) {
        setWithdrawalAmount("");
        setShowWithdrawal(false);
        await fetchSellerData();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to request withdrawal");
      }
    } catch (err) {
      setError("Error requesting withdrawal");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProfileClick = () => {
    setEditProfile({
      name: seller.name,
      phone: seller.phone,
    });
    setShowEditProfile(true);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("sellerToken");
      const response = await fetch(`${baseUrl}/api/seller/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editProfile),
      });

      if (response.ok) {
        const data = await response.json();
        setSeller(data.seller);
        setShowEditProfile(false);
        setError("");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      setError("Error updating profile");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditBankClick = () => {
    setEditBank({
      bankName: seller.bankDetails?.bankName || "",
      accountHolder: seller.bankDetails?.accountHolder || "",
      accountNumber: seller.bankDetails?.accountNumber || "",
      ifscCode: seller.bankDetails?.ifscCode || "",
    });
    setShowEditBank(true);
  };

  const handleSaveBank = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("sellerToken");
      const response = await fetch(`${baseUrl}/api/seller/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editBank),
      });

      if (response.ok) {
        const data = await response.json();
        setSeller(data.seller);
        setShowEditBank(false);
        setError("");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update bank details");
      }
    } catch (err) {
      setError("Error updating bank details");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("sellerToken");
      const response = await fetch(`${baseUrl}/api/seller/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      if (response.ok) {
        setPasswordForm({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setShowChangePassword(false);
        setError("");
        alert("Password changed successfully");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to change password");
      }
    } catch (err) {
      setError("Error changing password");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    localStorage.removeItem("seller");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="seller-dashboard">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error && !seller) {
    return (
      <div className="seller-dashboard">
        <div className="error-state">
          <h2>Error</h2>
          <p>{error || "Unable to load profile"}</p>
          <button onClick={() => navigate("/")} className="btn">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const availableBalance =
    seller.totalEarnings -
    (withdrawals?.reduce((sum, w) => sum + w.amount, 0) || 0);

  return (
    <div className="seller-dashboard">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="seller-info">
            <h3>{seller.name}</h3>
            <p>{seller.email}</p>
          </div>

          <nav className="dashboard-nav">
            <button
              className={`nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              📊 Overview
            </button>
            <button
              className={`nav-item ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              📦 Products
            </button>
            <button
              className={`nav-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              📋 Orders
            </button>
            <button
              className={`nav-item ${activeTab === "earnings" ? "active" : ""}`}
              onClick={() => setActiveTab("earnings")}
            >
              💰 Earnings
            </button>
            <button
              className={`nav-item ${activeTab === "account" ? "active" : ""}`}
              onClick={() => setActiveTab("account")}
            >
              ⚙️ Account Settings
            </button>
          </nav>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={() => setError("")}>✕</button>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="tab-content">
              <h2>Dashboard Overview</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <h4>Total Earnings</h4>
                  <p className="stat-value">
                    ₹{seller.totalEarnings.toFixed(2)}
                  </p>
                </div>
                <div className="stat-card">
                  <h4>Total Orders</h4>
                  <p className="stat-value">{orders.length}</p>
                </div>
                <div className="stat-card">
                  <h4>Total Products</h4>
                  <p className="stat-value">{products.length}</p>
                </div>
                <div className="stat-card">
                  <h4>Seller Rating</h4>
                  <p className="stat-value">⭐ {seller.rating.toFixed(1)}</p>
                </div>
              </div>

              <div className="recent-section">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  {/* <button
                    className="action-btn"
                    onClick={() => setShowAddProduct(true)}
                  >
                    + Add New Product
                  </button> */}
                  <button
                    className="action-btn"
                    onClick={() => setActiveTab("orders")}
                  >
                    View Orders ({orders.length})
                  </button>
                  <button
                    className="action-btn"
                    onClick={() => setActiveTab("earnings")}
                  >
                    Withdraw Earnings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="tab-content">
              <div className="tab-header">
                <h2>My Products</h2>
                <button
                  className="action-btn primary"
                  onClick={() => setShowAddProduct(true)}
                >
                  + Add New Product
                </button>
              </div>

              {showAddProduct && (
                <div className="form-modal">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h3>Add New Product</h3>
                      <button
                        className="close-btn"
                        onClick={() => setShowAddProduct(false)}
                      >
                        ✕
                      </button>
                    </div>
                    <form onSubmit={handleAddProduct}>
                      <div className="form-group">
                        <label>Product Name</label>
                        <input
                          type="text"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          value={newProduct.description}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Price (₹)</label>
                          <input
                            type="number"
                            value={newProduct.price}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                price: e.target.value,
                              })
                            }
                            required
                            min="0"
                            step="0.01"
                          />
                        </div>
                        <div className="form-group">
                          <label>Category</label>
                          <select
                            value={newProduct.category}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                category: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="">Select category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Books">Books</option>
                            <option value="Home">Home</option>
                            <option value="Sports">Sports</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Stock</label>
                          <input
                            type="number"
                            value={newProduct.stock}
                            onChange={(e) =>
                              setNewProduct({
                                ...newProduct,
                                stock: e.target.value,
                              })
                            }
                            min="0"
                          />
                        </div>
                        <div className="form-group">
                          <label>Product Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <div className="image-preview">
                              <img src={imagePreview} alt="Product preview" />
                              <small>{productImage?.name}</small>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-actions">
                        <button
                          type="submit"
                          className="btn primary"
                          disabled={submitting}
                        >
                          {submitting ? "Adding..." : "Add Product"}
                        </button>
                        <button
                          type="button"
                          className="btn secondary"
                          onClick={() => setShowAddProduct(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {products.length === 0 ? (
                <div className="empty-state">
                  <p>No products yet. Click "Add New Product" to get started.</p>
                </div>
              ) : (
                <div className="products-grid">
                  {products.map((product) => (
                    <div key={product._id} className="product-card">
                      {product.image && (
                        <img src={product.image} alt={product.name} />
                      )}
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <p className="category">{product.category}</p>
                        <p className="price">₹{product.price.toFixed(2)}</p>
                        <p className="stock">Stock: {product.stock}</p>
                        <div className="product-actions">
                          <button className="btn sm">Edit</button>
                          <button
                            className="btn sm danger"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="tab-content">
              <h2>My Orders</h2>

              {orders.length === 0 ? (
                <div className="empty-state">
                  <p>No orders yet.</p>
                </div>
              ) : (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order._id} className="order-card">
                      <div className="order-header">
                        <div>
                          <h4>Order #{order.orderNumber}</h4>
                          <p className="order-date">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="order-status">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleUpdateOrderStatus(order._id, e.target.value)
                            }
                            className={`status-select status-${order.status.toLowerCase()}`}
                          >
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="order-items">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <span>{item.name}</span>
                            <span>
                              ₹{item.price.toFixed(2)} x {item.quantity}
                            </span>
                            <span>
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="order-footer">
                        <div>
                          <strong>Customer:</strong> {order.userId.name} (
                          {order.userId.email})
                        </div>
                        <div>
                          <strong>Total:</strong> ₹{order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === "earnings" && (
            <div className="tab-content">
              <h2>Earnings & Settlements</h2>

              <div className="earnings-overview">
                <div className="earning-stat">
                  <h4>Total Earnings</h4>
                  <p>₹{seller.totalEarnings.toFixed(2)}</p>
                </div>
                <div className="earning-stat">
                  <h4>Available Balance</h4>
                  <p>₹{availableBalance.toFixed(2)}</p>
                </div>
                <div className="earning-stat">
                  <h4>Total Withdrawn</h4>
                  <p>
                    ₹
                    {(withdrawals?.reduce((sum, w) => sum + w.amount, 0) || 0).toFixed(
                      2
                    )}
                  </p>
                </div>
              </div>

              <div className="withdrawal-section">
                <div className="withdrawal-header">
                  <h3>Withdrawal History</h3>
                  <button
                    className="action-btn primary"
                    onClick={() => setShowWithdrawal(true)}
                    disabled={availableBalance < 100}
                  >
                    Request Withdrawal
                  </button>
                </div>

                {showWithdrawal && (
                  <div className="form-modal">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3>Request Withdrawal</h3>
                        <button
                          className="close-btn"
                          onClick={() => setShowWithdrawal(false)}
                        >
                          ✕
                        </button>
                      </div>
                      <form onSubmit={handleRequestWithdrawal}>
                        <div className="form-group">
                          <label>Amount (₹)</label>
                          <input
                            type="number"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                            required
                            min="100"
                            step="100"
                            max={availableBalance}
                          />
                          <small>
                            Available: ₹{availableBalance.toFixed(2)}
                          </small>
                        </div>
                        <div className="bank-info">
                          <h4>Withdrawal to:</h4>
                          <p>
                            <strong>{seller.bankDetails.bankName}</strong>
                          </p>
                          <p>{seller.bankDetails.accountHolder}</p>
                          <p>
                            ****
                            {seller.bankDetails.accountNumber.slice(-4)}
                          </p>
                        </div>
                        <div className="form-actions">
                          <button
                            type="submit"
                            className="btn primary"
                            disabled={submitting}
                          >
                            {submitting
                              ? "Processing..."
                              : "Request Withdrawal"}
                          </button>
                          <button
                            type="button"
                            className="btn secondary"
                            onClick={() => setShowWithdrawal(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}

                {withdrawals.length === 0 ? (
                  <div className="empty-state">
                    <p>No withdrawal requests yet.</p>
                  </div>
                ) : (
                  <div className="withdrawals-list">
                    {withdrawals.map((withdrawal, idx) => (
                      <div
                        key={idx}
                        className={`withdrawal-item status-${withdrawal.status}`}
                      >
                        <div>
                          <strong>₹{withdrawal.amount.toFixed(2)}</strong>
                          <span className="status-badge">
                            {withdrawal.status}
                          </span>
                        </div>
                        <div>
                          <small>
                            {new Date(withdrawal.requestDate).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Account Settings Tab */}
          {activeTab === "account" && (
            <div className="tab-content">
              <h2>Account Settings</h2>

              {error && <div className="error-banner">{error}</div>}

              <div className="settings-section">
                <h3>Personal Information</h3>
                <div className="info-group">
                  <div className="info-item">
                    <label>Name</label>
                    <p>{seller.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <p>{seller.email}</p>
                  </div>
                  <div className="info-item">
                    <label>Phone</label>
                    <p>{seller.phone}</p>
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={handleEditProfileClick}
                >
                  Edit Profile
                </button>
              </div>

              <div className="settings-section">
                <h3>Bank Details</h3>
                <div className="info-group">
                  <div className="info-item">
                    <label>Bank Name</label>
                    <p>{seller.bankDetails?.bankName || "Not provided"}</p>
                  </div>
                  <div className="info-item">
                    <label>Account Holder</label>
                    <p>{seller.bankDetails?.accountHolder || "Not provided"}</p>
                  </div>
                  <div className="info-item">
                    <label>Account Number</label>
                    <p>
                      {seller.bankDetails?.accountNumber
                        ? `****${seller.bankDetails.accountNumber.slice(-4)}`
                        : "Not provided"}
                    </p>
                  </div>
                  <div className="info-item">
                    <label>IFSC Code</label>
                    <p>{seller.bankDetails?.ifscCode || "Not provided"}</p>
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={handleEditBankClick}
                >
                  Update Bank Details
                </button>
              </div>

              <div className="settings-section">
                <h3>Security</h3>
                <button
                  className="btn"
                  onClick={() => {
                    setPasswordForm({
                      oldPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setShowChangePassword(true);
                  }}
                >
                  Change Password
                </button>
              </div>
            </div>
          )}

          {/* Edit Profile Modal */}
          {showEditProfile && (
            <div className="modal-overlay" onClick={() => setShowEditProfile(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Edit Profile</h2>
                  <button
                    className="close-btn"
                    onClick={() => setShowEditProfile(false)}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSaveProfile}>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      value={editProfile.name}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={editProfile.phone}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={() => setShowEditProfile(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn primary"
                      disabled={submitting}
                    >
                      {submitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Bank Details Modal */}
          {showEditBank && (
            <div className="modal-overlay" onClick={() => setShowEditBank(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Update Bank Details</h2>
                  <button
                    className="close-btn"
                    onClick={() => setShowEditBank(false)}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleSaveBank}>
                  <div className="form-group">
                    <label>Bank Name</label>
                    <input
                      type="text"
                      value={editBank.bankName}
                      onChange={(e) =>
                        setEditBank({ ...editBank, bankName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Holder Name</label>
                    <input
                      type="text"
                      value={editBank.accountHolder}
                      onChange={(e) =>
                        setEditBank({
                          ...editBank,
                          accountHolder: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Account Number</label>
                    <input
                      type="text"
                      value={editBank.accountNumber}
                      onChange={(e) =>
                        setEditBank({
                          ...editBank,
                          accountNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>IFSC Code</label>
                    <input
                      type="text"
                      value={editBank.ifscCode}
                      onChange={(e) =>
                        setEditBank({ ...editBank, ifscCode: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={() => setShowEditBank(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn primary"
                      disabled={submitting}
                    >
                      {submitting ? "Updating..." : "Update Details"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Change Password Modal */}
          {showChangePassword && (
            <div className="modal-overlay" onClick={() => setShowChangePassword(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <h2>Change Password</h2>
                  <button
                    className="close-btn"
                    onClick={() => setShowChangePassword(false)}
                  >
                    ×
                  </button>
                </div>
                <form onSubmit={handleChangePassword}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          oldPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          newPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="modal-actions">
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={() => setShowChangePassword(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn primary"
                      disabled={submitting}
                    >
                      {submitting ? "Changing..." : "Change Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SellerDashboard;
