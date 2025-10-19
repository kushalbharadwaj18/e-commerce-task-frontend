"use client"

import { useState, useEffect } from "react"
import "./AdminCategories.css"

function AdminCategories() {
  const [categories, setCategories] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
	path: "",
    image: "",
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories")
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingId
        ? `http://localhost:5000/api/categories/${editingId}`
        : "http://localhost:5000/api/categories"

      const method = editingId ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchCategories()
        setFormData({ name: "", description: "", image: "" })
        setShowForm(false)
        setEditingId(null)
      }
    } catch (error) {
      console.error("Error saving category:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (category) => {
    setFormData(category)
    setEditingId(category._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await fetch(`http://localhost:5000/api/categories/${id}`, { method: "DELETE" })
        fetchCategories()
      } catch (error) {
        console.error("Error deleting category:", error)
      }
    }
  }

  return (
    <div className="admin-categories">
      <div className="categories-header">
        <h2>Category Management</h2>
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          {showForm ? "Cancel" : "Add New Category"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="category-form">
          <div className="form-group">
            <label>Category Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" />
          </div>
		
		  <div className="form-group">
            <label>Path</label>
            <input type="text" name="path" value={formData.path} onChange={handleInputChange} required />
          </div>

          <div className="form-group">
            <label>Category Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image || "/placeholder.svg"} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Saving..." : editingId ? "Update Category" : "Add Category"}
          </button>
        </form>
      )}

      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category._id} className="category-card">
            <img src={category.image || "/placeholder.svg"} alt={category.name} />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <div className="card-actions">
              <button onClick={() => handleEdit(category)} className="edit-btn">
                Edit
              </button>
              <button onClick={() => handleDelete(category._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminCategories
