import{ Routes, Route, Link, NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Admin from "./pages/Admin"

function App(){
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000";
  const isLoggedIn = !!localStorage.getItem("token");
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if(!token){
      return;
    }

    async function checkAdmin(){
      try{
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = response.data;
        setIsAdminLoggedIn(user.role === "admin");
      }
      catch{
        setIsAdminLoggedIn(false);
      }
    }
    checkAdmin();
  }, [token]); // This only synchronizes the derived admin role after authentication changes.

  function handleLogout() {
    localStorage.removeItem("token")
    setIsAdminLoggedIn(false);
    navigate("/login");
  }

  return(
    <div>
      <header className="site-header">
      <nav className="nav-shell">
        <Link className="brand" to="/" aria-label="Shopshere home"><span className="brand-logo" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M7.5 11.5h17l-1.1 14H8.6l-1.1-14Z" fill="currentColor"/><path d="M11.5 12V9a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"/><path d="M13 18.2c.9 1.3 2 1.9 3.2 1.9 1.2 0 2.2-.6 3-1.9" stroke="#fffdf9" strokeWidth="1.8" strokeLinecap="round"/></svg></span><span className="brand-name">shop<span>shere</span></span></Link>
        <div className="nav-links">
          <NavLink to="/" end>Shop</NavLink>
          {isLoggedIn ? (
            <>
             <NavLink to="/orders">Orders</NavLink>
             <NavLink to="/cart">Cart</NavLink>
             <NavLink to="/profile">Profile</NavLink>
             {isAdminLoggedIn && <NavLink to="/admin">Admin</NavLink>}
             <button className="logout" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
             <NavLink to="/login">Log in</NavLink>
             <NavLink className="nav-cta" to="/register">Join us</NavLink>
            </> 
          )}
       </div>
      </nav></header>
      <Routes>
        <Route path = "/" element = {<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path = "/register" element = {<Register />}/>
        <Route path = "/cart" element = {<Cart />}/>
        <Route path = "/orders" element = {<Orders />}/>
        <Route path = "/profile" element = {<Profile />}/>
        <Route path = "/admin" element = {<Admin />}/>
      </Routes>
   </div>    
  )
}
export default App
