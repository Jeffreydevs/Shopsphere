import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    fetchCart();
  }, []);

  async function fetchCart() {
      const token = localStorage.getItem("token");
      if (!token) {
       setError("Please login first");
       setLoading(false);
       return;
      }
      try {
          const response = await axios.get(`${API_URL}/cart`, {
           headers: {Authorization: `Bearer ${token}`,},
          });
           setCart(response.data.cart);
       } 
      catch (error) {
         setError(error.response?.data?.message || "Failed to load cart");
       }
      finally {
         setLoading(false);
       }
    }

    async function handleRemove(productId) {
      const token = localStorage.getItem("token");
      try {
          await axios.delete(`${API_URL}/cart/${productId}`, {
            headers: {Authorization: `Bearer ${token}`,},
          });
          fetchCart();
       } 
       catch (error) {
         alert(error.response?.data?.message || "Failed to remove item");
       }
   }

   async function handleCheckout() {
      const token = localStorage.getItem("token");
      try {
          await axios.post(`${API_URL}/orders`, {},
           {
             headers: {Authorization: `Bearer ${token}`,},
           }
          );
          alert("Order placed successfully!");
          fetchCart();
       } 
        catch (error) {
          alert(error.response?.data?.message || "Checkout failed");
       }
   }

   const total = cart.reduce((sum, item) => {
      return sum + item.productId.price * item.quantity;
   }, 0);

   if (loading) return <h2>Loading...</h2>;

   if (error) return <h2>{error}</h2>;

   return (
      <div>
          <h1>Your Cart</h1>
          {cart.length === 0 ? ( 
              <h3>Your cart is empty</h3>
              ) : (
               <>
                 {cart.map((item) => (
                    <div key={item.productId._id}>
                        <img src={item.productId.image} alt={item.productId.name} width="150"/>
                        <h2>{item.productId.name}</h2>
                        <p>{item.productId.description}</p>
                        <p>₹{item.productId.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => handleRemove(item.productId._id)}>Remove</button>
                    </div>
                  ))}
                  <hr />
                  <h2>Total: ₹{total}</h2>
                  <button onClick={handleCheckout}>Checkout</button>
               </>
           )}
     </div>
   );
}

export default Cart;