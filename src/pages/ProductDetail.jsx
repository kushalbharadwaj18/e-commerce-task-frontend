"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import "./ProductDetail.css"

function ProductDetail({ addToCart }) {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`)
      const data = await response.json()
      setProduct(data)
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  }

  if (!product) return <div className="loading">Loading...</div>

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image || "/placeholder.svg"} alt={product.name} />
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="rating">
            <span className="stars">★★★★☆</span>
            <span className="reviews">({product.reviews} reviews)</span>
          </div>

          <div className="price-section">
            <span className="price">${product.price.toFixed(2)}</span>
            <span className="stock">{product.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>

          <p className="description">{product.description}</p>

          <div className="purchase-section">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
              />
            </div>

            <button
              className="buy-now-btn"
              onClick={() => {
                for (let i = 0; i < quantity; i++) {
                  addToCart(product)
                }
              }}
            >
              Add to Cart
            </button>
          </div>

          <div className="product-details">
            <h3>Product Details</h3>
            <ul>
              <li>Category: {product.category}</li>
              <li>Availability: {product.inStock ? "In Stock" : "Out of Stock"}</li>
              <li>Free Shipping on orders over $50</li>
              <li>30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
