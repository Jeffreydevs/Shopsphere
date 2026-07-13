import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login first");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/orders`, {
          headers: {Authorization: `Bearer ${token}`,},
        });
        setOrders(response.data.orders);
        } 
        catch (error) {
          setError(error.response?.data?.message || "Failed to load orders");
        } 
        finally {
         setLoading(false);
        }
   }

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
     <div>
          <h1>My Orders</h1>
          {orders.length === 0 ? (
             <h3>No orders found.</h3>
              ) : (
               orders.map((order) => (
                  <div key={order._id}>
                     <h3>Status: {order.status}</h3>
                      <p>Date:{" "}{new Date(order.createdAt).toLocaleDateString()}</p>
                      {order.products.map((item) => (
                        <div key={item.productId._id}>
                         <img src={item.productId.image} alt={item.productId.name} width="120"/>
                         <h4>{item.productId.name}</h4>
                         <p>₹{item.priceAtPurchase}</p>
                         <p>Quantity: {item.quantity}</p>
                        </div>
                      ))}
                      <h3>Total ₹{order.totalPrice}</h3>
                      <hr />
                 </div>
               ))
            )}
     </div>
   );
}

export default Orders;