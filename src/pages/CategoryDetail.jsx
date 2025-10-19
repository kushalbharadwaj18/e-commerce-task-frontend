import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import './CategoryDetail.css';

const CategoryDetail = ({ addToCart }) => {
  const { category } = useParams(); // ✅ Get category from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return; // ✅ Prevent empty request

      try {
        const response = await fetch(`http://localhost:5000/api/categories/${category}`);
        const data = await response.json();
        setProducts(data);
        console.log(data); // ✅ Correct logging
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]); // ✅ Run when URL category changes

  return (
    <>
      <div className="products-container">
        <main className="products-main">
          <h2 style={{"marginTop": "20px"}}>{category.substring(0, 1).toUpperCase() + category.substring(1, category.length)} - Products ({products.length})</h2>
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((product) => (
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
                ))
              ) : (
                <div className="no-products">No products found</div>
              )}
            </div>
        </main>
      </div>
    </>
  );
};

export default CategoryDetail;
