"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import "./Products.css"

function Products({ addToCart }) {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const category = searchParams.get("category")
    if (category) {
      setIsTransitioning(true)
      setTimeout(() => setIsTransitioning(false), 300)
      setSelectedCategory(category)
    } else {
      setSelectedCategory("")
    }
    fetchProducts()
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products")
      const data = await response.json()
      setProducts(data)
      setFilteredProducts(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    let filtered = products

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    setFilteredProducts(filtered)
  }, [searchTerm, selectedCategory, priceRange, products])

  return (
    <div className="products-page">
      <div className="products-container">
        <aside className="filters-sidebar">
          <h3>Filters</h3>

          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Category</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Kitchen</option>
            </select>
          </div>

          <div className="filter-group">
            <label>
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            />
          </div>
        </aside>

        <main className="products-main">
          <h2>Products ({filteredProducts.length})</h2>
          <div className={`products-grid ${isTransitioning ? "transitioning" : ""}`}>
            {filteredProducts.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`} className="product-card-link">
                <div className="product-card">
                  <img src={product.image || "/placeholder.svg"} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={(e) => {
                      e.preventDefault()
                      addToCart(product)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Products
