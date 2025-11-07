"use client"
import { Link } from "react-router-dom"
import "./Cart.css"

function Cart({ cart, setCart }) {
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId))
    localStorage.setItem("cart", JSON.stringify(cart.filter((item) => item._id !== productId)))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      const updatedCart = cart.map((item) => (item._id === productId ? { ...item, quantity } : item))
      setCart(updatedCart)
      localStorage.setItem("cart", JSON.stringify(updatedCart))
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-items">
          <h2>Shopping Cart ({cart.length} items)</h2>
          {cart.map((item) => (
            <div key={item._id} className="cart-item">
              <img src={item.image || "/placeholder.svg"} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="price">${item.price.toFixed(2)}</p>
              </div>
              <div className="quantity-control">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                <input type="number" value={item.quantity} className="input-quantity" readOnly />
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
              <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%):</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
          <Link to="/products" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
