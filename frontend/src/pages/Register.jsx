import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000";

  async function handleRegister(){
    if(!username || !email || !password){
       alert("Please fill all fields")
       return
    }
    try{
      await axios.post(`${API_URL}/register`,{username,email,password});
      alert("User registered successful!");
      navigate("/login");
    }
    catch(error){
      alert(error.response.data.message);
    }
  }

  return(
    <main className="auth-layout"><section className="auth-story auth-story-register"><div className="story-orbit orbit-one"/><div className="story-orbit orbit-two"/><div className="story-visual"><div className="visual-sun">✦</div><div className="visual-card visual-card-main"><span>MAKE IT YOURS</span><strong>Your world,<br/>well chosen.</strong><i>NEW — YOU</i></div><div className="visual-card visual-card-mini"><span>WELCOME</span><b>Good taste<br/>starts here</b></div><div className="visual-ticket">save your favourites<br/><strong>in one beautiful place</strong></div></div><div className="story-content"><p className="eyebrow">Your place to browse</p><h2>A little more joy in every cart.</h2><p>Build your own edit, remember the things you love, and make each purchase feel easy.</p><div className="story-stats"><div><strong>24/7</strong><span>your wishlist</span></div><div><strong>∞</strong><span>new discoveries</span></div></div></div></section><section className="auth-card"><div className="form-kicker"><span className="form-dot"/> Begin your collection</div><p className="eyebrow">Create your account</p><h1>Join the sphere</h1><p className="subtext">Save your favorites and make checkout effortless.</p><form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}><label>Your name<input type="text" placeholder="Enter username" value={username} onChange={(event)=> setUsername(event.target.value) }/></label><label>Email<input type="email" placeholder="you@example.com" value={email} onChange={(event)=> setEmail(event.target.value) }/></label><label>Password<input type="password" placeholder="Create a password" value={password} onChange={(event)=> setPassword(event.target.value) }/></label><button className="button-primary">Create account <span>→</span></button></form><p className="auth-switch">Already a member? <Link to="/login">Log in</Link></p></section></main>
  )     
}
export default Register
