import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){
  const [username, setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:3000";

  async function handleRegister(){
    if(!username || !email || !password){
       alert("Please fill all fields")
       return
    }
    try{
      await axios.post(`${API_URL}/register`,{username,email,password});
      alert("User registered successful!");
      const navigate = useNavigate();
      navigate("/login");
    }
    catch(error){
      alert(error.response.data.message);
    }
  }

  return(
    <div>
      <input type="text" placeholder="Enter username" value={username} onChange={(event)=> setUsername(event.target.value) }/>
      <input type="email" placeholder="Enter email" value={email} onChange={(event)=> setEmail(event.target.value) }/>
      <input type="password" placeholder="Enter password" value={password} onChange={(event)=> setPassword(event.target.value) }/>
      <button onClick={handleRegister}>Register</button>
    </div>
  )     
}
export default Register