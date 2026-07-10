import{ Routes, Route, Link } from "react-router-dom"
import "./App.css";

import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Cart from "./pages/Cart"
import Orders from "./pages/Orders"
import Admin from "./pages/Admin"

function App(){
  return(
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/admin">Admin</Link>
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