"use client"

import { useState, useEffect } from "react"
import "./Orders.css"

function Orders({ user }) {
  const [orders, setOrders] = useState([])
  const baseUrl = import.meta.env.VITE_API_BASE_URL
  useEffect(() => {
    if (user) fetchOrders()
  }, [user])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${baseUrl}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
      setOrders(mockOrders)
    }
  }

  const mockOrders = [
    {
      _id: "1",
      orderNumber: "AMZ-001",
      date: "2024-01-15",
      total: 199.99,
      status: "Delivered",
      items: [{ name: "Wireless Headphones", quantity: 1, price: 79.99 }],
    },
    {
      _id: "2",
      orderNumber: "AMZ-002",
      date: "2024-01-20",
      total: 49.98,
      status: "Processing",
      items: [{ name: "USB-C Cable", quantity: 2, price: 12.99 }],
    },
  ]

  if (!user) {
    return (
      <div className="orders-page">
        <p>Please log in to view orders</p>
      </div>
    )
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2>Your Orders</h2>
        {orders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.orderNumber}</h3>
                    <p className="order-date">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="order-status">
                    <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </div>
                </div>
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="order-total">Total: ${order.total.toFixed(2)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders
