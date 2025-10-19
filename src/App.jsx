"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
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
import "./App.css"
import CategoryDetail from "./pages/CategoryDetail"

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [adminToken, setAdminToken] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedCart = localStorage.getItem("cart")
    const savedAdminToken = localStorage.getItem("adminToken")
    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedAdminToken) setAdminToken(savedAdminToken)
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const addToCart = async (product) => {
    const existingItem = cart.find((item) => item._id === product._id)
    let updatedCart
    if (existingItem) {
      updatedCart = cart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }]
    }
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    if (user) {
      try {
        await fetch(`http://localhost:5000/api/cart/${user._id}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: product._id, quantity: 1 }),
        })
      } catch (error) {
        console.error("Error saving cart to database:", error)
      }
    }
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin setAdminToken={setAdminToken} />} />
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard adminToken={adminToken} setAdminToken={setAdminToken} />}
          />

          {/* Regular user routes */}
          <Route
            path="*"
            element={
              <>
                <Header user={user} onLogout={handleLogout} cartCount={cart.length} />
                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products addToCart={addToCart} />} />
                    <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
                    <Route path="/cart" element={<Cart cart={cart} setCart={setCart} user={user} />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/signup" element={<Signup setUser={setUser} />} />
                    <Route path="/orders" element={<Orders user={user} />} />
                    <Route path="/payment-history" element={<PaymentHistory user={user} />} />
                    <Route path="/checkout" element={<Checkout user={user} cart={cart} />} />
                    <Route path="/products/:category" element={<CategoryDetail addToCart={addToCart} />} />
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
