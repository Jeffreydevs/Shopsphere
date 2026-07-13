import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000";
    
  async function handleLogin(){
      if(!email || !password){
        alert("Please fill all fields")
        return
      }
      try{
        const response = await axios.post(`${API_URL}/login`,{email,password});
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigate("/");
      }
      catch(error){
        alert(error.response.data.message);
      }
   }

  return(
      <main className="auth-layout"><section className="auth-story"><div className="story-orbit orbit-one"/><div className="story-orbit orbit-two"/><div className="story-visual"><div className="visual-sun">✦</div><div className="visual-card visual-card-main"><span>THE DAILY EDIT</span><strong>Small finds.<br/>Big feeling.</strong><i>01 — 24</i></div><div className="visual-card visual-card-mini"><span>CURATED</span><b>For your<br/>everyday</b></div><div className="visual-ticket">free shipping<br/><strong>on your first find</strong></div></div><div className="story-content"><p className="eyebrow">Welcome back</p><h2>Good things are waiting in your sphere.</h2><p>Revisit favorites, keep track of orders, and discover your next little delight.</p><div className="story-note"><span>✦</span><p>“A beautifully simple way to shop the everyday.”</p></div></div></section><section className="auth-card"><div className="form-kicker"><span className="form-dot"/> Your personal corner</div><p className="eyebrow">Your account</p><h1>Log in</h1><p className="subtext">Pick up right where you left off.</p><form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}><label>Email<input type="email" placeholder="you@example.com" value={email} onChange={(event)=> setEmail(event.target.value)}/></label><label>Password<input type="password" placeholder="Your password" value={password} onChange={(event)=> setPassword(event.target.value)}/></label><button className="button-primary">Log in <span>→</span></button></form><p className="auth-switch">New here? <Link to="/register">Create an account</Link></p></section></main>
   )     
}
export default Login
