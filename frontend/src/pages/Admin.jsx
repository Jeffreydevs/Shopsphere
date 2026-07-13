import { useEffect, useState } from "react";
import axios from "axios";
function Admin() {
 const [orders,setOrders]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(""); const API_URL="http://localhost:3000";
 async function fetchOrders(){const token=localStorage.getItem("token");try{const response=await axios.get(`${API_URL}/admin/orders`,{headers:{Authorization:`Bearer ${token}`}});setOrders(response.data.orders);}catch(error){setError(error.response?.data?.message||"Failed to load orders");}finally{setLoading(false);}}
 // The initial request intentionally hydrates the order state after mount.
 // eslint-disable-next-line react-hooks/set-state-in-effect
 useEffect(()=>{fetchOrders();},[]);
 async function updateStatus(id,status){const token=localStorage.getItem("token");try{await axios.put(`${API_URL}/orders/${id}/status`,{status},{headers:{Authorization:`Bearer ${token}`}});fetchOrders();}catch(error){alert(error.response?.data?.message||"Failed to update status");}}
 if(loading)return <main className="page"><div className="empty-state"><h2>Loading orders...</h2></div></main>;if(error)return <main className="page"><div className="empty-state"><h2>{error}</h2></div></main>;
 return <main className="page"><div className="page-heading"><p className="eyebrow">Operations</p><h1>Order dashboard</h1><p>Review and update customer orders.</p></div><div className="orders-list">{orders.map(order=><div key={order._id} className="admin-card"><div><h3>{order.userId.username}</h3><p>{order.userId.email}</p><p>Order #{order._id.slice(-6).toUpperCase()} · <strong>₹{order.totalPrice}</strong></p></div><div className="admin-controls"><span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span><select value={order.status} onChange={(e)=>updateStatus(order._id,e.target.value)}><option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></div></div>)}</div></main>;
}
export default Admin;
