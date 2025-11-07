"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/categories`)
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="home">
      <div className="hero-banner">
        <img
          src="https://wallup.net/wp-content/uploads/2018/03/23/558309-solid_color.jpg"
          alt="Hero Banner"
        />
        <div className="hero-content">
          <h1>Welcome to ExpressBuy</h1>
          <p>Discover millions of products at great prices</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="categories-section">
        <h2>Shop by Category</h2>
        {loading ? (
          <p className="loading">Loading categories...</p>
        ) : categories.length > 0 ? (
          <div className="categories-grid">
            {categories.map((category) => (
              <Link key={category._id} to={`/products/${category.path}`} className="category-card">
                <img src={category.image || "/placeholder.svg"} alt={category.name} />
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        ) : (
          <p className="no-categories">No categories available</p>
        )}
      </div>

      <div className="featured-section">
        <h2>Featured Deals</h2>
        <p>Check out our best offers today</p>
        <Link to="/products" className="view-all-btn">
          View All Deals
        </Link>
      </div>
    </div>
  )
}

export default Home
