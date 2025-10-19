"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ user, onLogout, cartCount }) {
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchTerm
      )}`;
      setSearchTerm("");
    }
  };

  return (
    <header className="header">
      <div className="header-top">
        <Link to="/" className="logo">
          <span className="logo-text">Amazon</span>
        </Link>

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

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
          <Link to="/admin/login" className="admin-link">
            Admin
          </Link>
        </div>
      </div>

      {/* <nav className="header-nav">
        <Link to="/products">All Products</Link>
        {categories.map((category) => (
          <Link key={category._id} to={`/products?category=${category.name}`}>
            {category.name}
          </Link>
        ))} 
      </nav>
         */}
      <nav className="header-nav">
        {user && <Link to="/orders">Orders</Link>}
        {user && <Link to="/payment-history">Payment History</Link>}
      </nav>
    </header>
  );
}

export default Header;
