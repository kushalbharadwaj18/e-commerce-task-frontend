import { Link } from "react-router-dom"
import "./Home.css"
function Home() {
  return (
    <div className="home">
      <div className="hero-banner">
        <img src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG24/Smart_Watches/Jupiter25/Newchanges/PC_festive_3000x1200_saleends._CB798863437_.jpg" alt="Hero Banner" />
        {/* <div className="hero-content">
          <h1>Welcome to Amazon</h1>
          <p>Discover millions of products at great prices</p>
          <Link to="/products" className="cta-button">
            Shop Now
          </Link>
        </div> */}
      </div>

      <div className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/products?category=electronics" className="category-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/wireless-headphones-eRY9tSABEssGejqCYQYFPOXmsmCnjD.jpg" alt="Electronics" />
            <h3>Electronics</h3>
          </Link>
          <Link to="/products?category=fashion" className="category-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/diverse-clothing-rack-qh4HLKZhdyWR6AqlCMeZbmiyweiEnO.png" alt="Fashion" />
            <h3>Fashion</h3>
          </Link>
          <Link to="/products?category=books" className="category-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/javascript-book-cd5njRXJWcXwomRaBHhGRfAEYFOAcN.jpg" alt="Books" />
            <h3>Books</h3>
          </Link>
          <Link to="/products?category=home" className="category-card">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/home-decor-zI2HxlWcYiBvwJmB6bgIqwvwacvtm4.jpg" alt="Home & Kitchen" />
            <h3>Home & Kitchen</h3>
          </Link>
        </div>
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
