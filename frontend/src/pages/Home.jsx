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
        `${API_URL}/cart`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
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
    <div>
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product._id}>
              <img src={product.image} alt={product.name} width="180" />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stock}</p>
              <button onClick={() => handleAddToCart(product._id)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
