import{ Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
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
  const location = useLocation();
  const API_URL = "http://localhost:3000";
  const [isLoggedIn, setIsLoggedIn] = useState( !!localStorage.getItem("token") );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setIsLoggedIn(!!token);
    if(!token){
      setIsAdminLoggedIn(false);
      return;
    }

    async function checkAdmin(){
      try{
        const response = await axios.get(`${API_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = await response.json();
        setIsAdminLoggedIn(user.role === "admin");
      }
      catch(error){
        setIsAdminLoggedIn(false);
      }
    }
    checkAdmin();
  }, [token]);

  function handleLogout() {
    localStorage.removeItem("token")
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    navigate("/login");
  }

  return(
    <div>
      <nav>
        <div>
          <Link to="/">Home</Link>
          {isLoggedIn ? (
            <>
             <Link to="/profile">Profile</Link>
             <Link to="/cart">Cart</Link>
             <Link to="/orders">Orders</Link>
             {isAdminLoggedIn && <Link to="/admin">Admin</Link>}
             <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
             <Link to="/login">Login</Link>
             <Link to="/register">Register</Link>
            </> 
          )}
       </div>
      </nav>
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
