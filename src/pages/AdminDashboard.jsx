"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AdminProducts from "../components/AdminProducts"
import AdminOrders from "../components/AdminOrders"
import AdminCategories from "../components/AdminCategories"
import "./AdminDashboard.css"

function AdminDashboard({ adminToken, setAdminToken }) {
  const [activeTab, setActiveTab] = useState("products")
  const navigate = useNavigate()

  useEffect(() => {
    if (!adminToken) {
      navigate("/admin/login")
    }
  }, [adminToken, navigate])

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    setAdminToken(null)
    navigate("/admin/login")
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={`tab-btn ${activeTab === "categories" ? "active" : ""}`}
          onClick={() => setActiveTab("categories")}
        >
          Categories
        </button>
        <button className={`tab-btn ${activeTab === "orders" ? "active" : ""}`} onClick={() => setActiveTab("orders")}>
          Orders
        </button>
      </div>

      <div className="admin-content">
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "categories" && <AdminCategories />}
        {activeTab === "orders" && <AdminOrders />}
      </div>
    </div>
  )
}

export default AdminDashboard
