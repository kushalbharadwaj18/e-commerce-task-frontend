"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Orders from "./pages/Orders"
import PaymentHistory from "./pages/PaymentHistory"
import Checkout from "./pages/Checkout"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import CategoryDetail from "./pages/CategoryDetail"
import "./App.css"

// Protected route wrapper for users
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

// Protected route wrapper for admin
const AdminProtectedRoute = ({ adminToken, children }) => {
  if (!adminToken) {
    return <Navigate to="/admin/login" replace />
  }
  return children
}

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [adminToken, setAdminToken] = useState(null)
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  // ✅ Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user")
      const savedCart = localStorage.getItem("cart")
      const savedAdminToken = localStorage.getItem("adminToken")

      if (savedUser) setUser(JSON.parse(savedUser))
      if (savedCart) setCart(JSON.parse(savedCart))
      if (savedAdminToken) setAdminToken(savedAdminToken)
    } catch (error) {
      console.error("Error loading local storage:", error)
    }
  }, [])

  // ✅ Logout handler
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    setCart([])
    localStorage.removeItem("cart")
  }

  // ✅ Add product to cart (both local and backend)
  const addToCart = async (product) => {
    try {
      const existingItem = cart.find((item) => item._id === product._id)
      const updatedCart = existingItem
        ? cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cart, { ...product, quantity: 1 }]

      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))

      // Sync cart with backend if user logged in
      if (user?._id) {
        await fetch(`${baseUrl}/api/cart/${user._id}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product._id, quantity: 1 }),
        })
      }
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* 🔐 Admin Routes */}
          <Route
            path="/admin/login"
            element={<AdminLogin setAdminToken={setAdminToken} />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute adminToken={adminToken}>
                <AdminDashboard
                  adminToken={adminToken}
                  setAdminToken={setAdminToken}
                />
              </AdminProtectedRoute>
            }
          />

          {/* 👤 User Routes */}
          <Route
            path="*"
            element={
              <>
                <Header
                  user={user}
                  onLogout={handleLogout}
                  cartCount={cart.length}
                />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                      path="/products"
                      element={<Products addToCart={addToCart} />}
                    />
                    <Route
                      path="/product/:id"
                      element={<ProductDetail addToCart={addToCart} />}
                    />
                    <Route
                      path="/products/:category"
                      element={<CategoryDetail addToCart={addToCart} />}
                    />
                    <Route
                      path="/cart"
                      element={
                        <ProtectedRoute user={user}>
                          <Cart cart={cart} setCart={setCart} user={user} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/orders"
                      element={
                        <ProtectedRoute user={user}>
                          <Orders user={user} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/payment-history"
                      element={
                        <ProtectedRoute user={user}>
                          <PaymentHistory user={user} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/checkout"
                      element={
                        <ProtectedRoute user={user}>
                          <Checkout user={user} cart={cart} />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/login"
                      element={<Login setUser={setUser} />}
                    />
                    <Route
                      path="/signup"
                      element={<Signup setUser={setUser} />}
                    />
                    {/* Catch-all: redirect unknown routes */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
