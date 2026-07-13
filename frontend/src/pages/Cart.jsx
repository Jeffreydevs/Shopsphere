import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = "http://localhost:3000";

  useEffect(() => { fetchCart(); }, []);
  async function fetchCart() {
    const token = localStorage.getItem("token");
    if (!token) { setError("Please login first"); setLoading(false); return; }
    try { const response = await axios.get(`${API_URL}/cart`, { headers: { Authorization: `Bearer ${token}` } }); setCart(response.data.cart); }
    catch (error) { setError(error.response?.data?.message || "Failed to load cart"); }
    finally { setLoading(false); }
  }
  async function handleRemove(productId) { try { await axios.delete(`${API_URL}/cart/${productId}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }); fetchCart(); } catch (error) { alert(error.response?.data?.message || "Failed to remove item"); } }
  async function handleCheckout() { try { await axios.post(`${API_URL}/orders`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }); alert("Order placed successfully!"); fetchCart(); } catch (error) { alert(error.response?.data?.message || "Checkout failed"); } }
  const total = cart.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
  if (loading) return <main className="page"><div className="empty-state"><h2>Loading your bag...</h2></div></main>;
  if (error) return <main className="page"><div className="empty-state"><h2>{error}</h2></div></main>;
  return <main className="page"><div className="page-heading"><p className="eyebrow">Almost yours</p><h1>Your bag</h1><p>Your selected pieces, ready when you are.</p></div>{cart.length === 0 ? <div className="empty-state"><h2>Your bag is empty</h2><p>Browse our latest collection and find something you love.</p></div> : <div className="cart-layout"><div className="cart-list">{cart.map((item) => <div key={item.productId._id} className="cart-item"><img src={item.productId.image} alt={item.productId.name}/><div><h2>{item.productId.name}</h2><p>{item.productId.description}</p><p className="price">₹{item.productId.price} <span>· Qty {item.quantity}</span></p></div><button className="remove-button" onClick={() => handleRemove(item.productId._id)}>Remove</button></div>)}</div><aside className="summary-card"><h2>Order summary</h2><div className="summary-line"><span>Subtotal</span><span>₹{total}</span></div><div className="summary-line"><span>Delivery</span><span>Calculated at checkout</span></div><div className="summary-total"><span>Total</span><span>₹{total}</span></div><button className="checkout-button" onClick={handleCheckout}>Secure checkout</button></aside></div>}</main>;
}
export default Cart;
