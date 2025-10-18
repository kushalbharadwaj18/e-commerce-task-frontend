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
import "./App.css"

function App() {
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    const savedCart = localStorage.getItem("cart")
    if (savedUser) setUser(JSON.parse(savedUser))
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("cart");
  }

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id)
    if (existingItem) {
      setCart(cart.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    localStorage.setItem("cart", JSON.stringify([...cart, { ...product, quantity: 1 }]))
  }

  return (
    <Router>
      <div className="app">
        <Header user={user} onLogout={handleLogout} cartCount={cart.length} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route path="/orders" element={<Orders user={user} />} />
            <Route path="/payment-history" element={<PaymentHistory user={user} />} />
            <Route path="/checkout" element={<Checkout user={user} cart={cart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
