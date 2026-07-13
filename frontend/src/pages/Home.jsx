import { useEffect, useState } from "react";
import axios from "axios";

function Home(){
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    async function fetchProducts(){
      try{
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      }
      catch(error){
        setError(error.response?.data?.message || "Failed to load products");
      }
      finally{
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  async function handleAddToCart(productId){
    const token = localStorage.getItem("token");
    if(!token){
      alert("Please login first");
      return;
    }

    try{
      await axios.post(
        `${API_URL}/cart`, { productId, quantity: 1 },
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      alert("Product added to cart");
    }
    catch(error){
      alert(error.response?.data?.message || "Failed to add product to cart");
    }
  }

  if(loading){
    return <h2>Loading products...</h2>;
  }

  if(error){
    return <h2>{error}</h2>;
  }

  return(
    <main className="page">
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow">The everyday edit</p><h1>Find your next favorite thing.</h1><p>Thoughtfully selected pieces for the life you’re building, delivered simply.</p><a className="button-primary" href="#products">Explore the collection</a></div>
        <div className="hero-image" />
      </section>
      <section id="products"><div className="section-header"><div><p className="eyebrow">Curated for you</p><h2>Fresh finds</h2></div><p className="subtext">{products.length} items to discover</p></div>
      {products.length === 0 ? (
        <div className="empty-state"><h2>No products yet</h2><p>Check back soon for new arrivals.</p></div>
      ) : (
        <div className="product-container">
          {products.map((product) => (
            <article key={product._id} className="card">
              <img src={product.image} alt={product.name} />
              <div className="card-content"><div className="product-meta"><span className="product-category">{product.category}</span><span>{product.stock} in stock</span></div>
              <h2>{product.name}</h2><p className="product-description">{product.description}</p>
              <div className="product-footer"><span className="price">₹{product.price}</span><button onClick={() => handleAddToCart(product._id)}>Add to bag</button></div></div>
            </article>
          ))}
        </div>
      )}
      </section></main>
  )
}

export default Home
