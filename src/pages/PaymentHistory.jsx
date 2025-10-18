"use client"

import { useState, useEffect } from "react"
import "./PaymentHistory.css"

function PaymentHistory({ user }) {
  const [payments, setPayments] = useState([])

  useEffect(() => {
    if (user) fetchPayments()
  }, [user])

  const fetchPayments = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/api/payments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await response.json()
      setPayments(data)
    } catch (error) {
      console.error("Error fetching payments:", error)
      setPayments(mockPayments)
    }
  }

  const mockPayments = [
    {
      _id: "1",
      transactionId: "TXN-001",
      date: "2024-01-15",
      amount: 199.99,
      method: "Credit Card",
      status: "Completed",
    },
    {
      _id: "2",
      transactionId: "TXN-002",
      date: "2024-01-20",
      amount: 49.98,
      method: "Debit Card",
      status: "Completed",
    },
  ]

  if (!user) {
    return (
      <div className="payment-history-page">
        <p>Please log in to view payment history</p>
      </div>
    )
  }

  return (
    <div className="payment-history-page">
      <div className="payment-container">
        <h2>Payment History</h2>
        {payments.length === 0 ? (
          <p className="no-payments">No payment history available.</p>
        ) : (
          <div className="payments-table">
            <table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment.transactionId}</td>
                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                    <td>${payment.amount.toFixed(2)}</td>
                    <td>{payment.method}</td>
                    <td>
                      <span className={`status ${payment.status.toLowerCase()}`}>{payment.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaymentHistory
