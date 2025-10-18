const mongoose = require("mongoose")
const Product = require("../models/Product")
require("dotenv").config()

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 79.99,
    category: "electronics",
    image: "/wireless-headphones.jpg",
    stock: 50,
    rating: 4.5,
    reviews: 128,
  },
  {
    name: "USB-C Cable",
    description: "Durable USB-C charging cable, 6ft length",
    price: 12.99,
    category: "electronics",
    image: "/usb-cable.jpg",
    stock: 200,
    rating: 4.2,
    reviews: 89,
  },
  {
    name: "JavaScript Book",
    description: "Learn JavaScript programming from basics to advanced",
    price: 29.99,
    category: "books",
    image: "/javascript-book.jpg",
    stock: 75,
    rating: 4.7,
    reviews: 156,
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt, available in multiple colors",
    price: 19.99,
    category: "clothing",
    image: "/cotton-tshirt.jpg",
    stock: 150,
    rating: 4.3,
    reviews: 203,
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminum laptop stand for better ergonomics",
    price: 39.99,
    category: "electronics",
    image: "/laptop-stand.jpg",
    stock: 80,
    rating: 4.6,
    reviews: 142,
  },
  {
    name: "React Guide",
    description: "Complete guide to React.js with practical examples",
    price: 34.99,
    category: "books",
    image: "/react-book.jpg",
    stock: 60,
    rating: 4.8,
    reviews: 178,
  },
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/amazon-clone")
    console.log("Connected to MongoDB")

    await Product.deleteMany({})
    console.log("Cleared existing products")

    await Product.insertMany(products)
    console.log("Products seeded successfully")

    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
