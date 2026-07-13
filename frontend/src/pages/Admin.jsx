import { useEffect, useState } from "react";
import axios from "axios";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
      const token = localStorage.getItem("token");
      try {
         const response = await axios.get(`${API_URL}/admin/orders`,
          {headers: {Authorization: `Bearer ${token}`,},}
         );
         setOrders(response.data.orders);
       }  
      catch(error) {
          setError(error.response?.data?.message || "Failed to load orders");
       } 
      finally {
          setLoading(false);
       }
   }

  async function updateStatus(id, status) {
      const token = localStorage.getItem("token");
      try{
          await axios.put(`${API_URL}/orders/${id}/status`,{ status },
              {headers: {Authorization: `Bearer ${token}`,},}
            );
          fetchOrders();
        } 
        catch (error) {
          alert(error.response?.data?.message);
        }
    }

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
      <div>
          <h1>Admin Dashboard</h1>
          {orders.map((order) => (
              <div key={order._id}>
                  <h3>{order.userId.username}</h3>
                  <p>{order.userId.email}</p>
                  <p>Status: {order.status}</p>
                  <p>Total: ₹{order.totalPrice}</p>
                  <select value={order.status} onChange={(e) => updateStatus(order._id, e.target.value)}>
                     <option>Pending</option>
                     <option>Processing</option>
                     <option>Shipped</option>
                     <option>Delivered</option>
                     <option>Cancelled</option>
                     <option>Completed</option>
                  </select>
                  <hr />
              </div>
          ))}
      </div>
   );
}

export default Admin;