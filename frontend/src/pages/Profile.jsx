import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000";

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
      const token = localStorage.getItem("token");
      if (!token) {
       setError("Please login first");
       setLoading(false);
       return;
      }
      try {
         const response = await axios.get(`${API_URL}/profile`, {
           headers: {Authorization: `Bearer ${token}`,},
          });
          setUser(response.data);
       } 
       catch (error) {
         setError(error.response?.data?.message || "Failed to load profile");
       } 
       finally {
         setLoading(false);
       }
   }

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
     <div>
         <h1>My Profile</h1>
         <h3>Username: {user.username}</h3>
         <h3>Email: {user.email}</h3>
         <h3>Role: {user.role}</h3>
     </div>
   );
}

export default Profile;