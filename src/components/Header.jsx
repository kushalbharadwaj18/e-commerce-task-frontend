"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./Header.css"

function Header({ user, onLogout, cartCount }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          <span className="logo-text">Amazon</span>
        </Link>

        {/* <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button>Search</button>
        </div> */}

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">Hello, {user.name}</span>
              <button onClick={onLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="auth-link">
              Login
            </Link>
          )}
          <Link to="/cart" className="cart-link">
            Cart <span className="cart-count">{cartCount}</span>
          </Link>
        </div>
      </div>

      <nav className="header-nav">
        <Link to="/products">All Products</Link>
        <Link to="/products?category=electronics">Electronics</Link>
        <Link to="/products?category=books">Books</Link>
        <Link to="/products?category=fashion">Fashion</Link>
        <Link to="/products?category=home">Home & Kitchen</Link>
        {user && <Link to="/orders">Orders</Link>}
        {user && <Link to="/payment-history">Payment History</Link>}
      </nav>
    </header>
  )
}

export default Header
