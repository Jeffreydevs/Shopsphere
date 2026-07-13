import { useEffect, useState } from "react";
import axios from "axios";
function Profile() {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const API_URL = "http://localhost:3000";
  useEffect(() => { async function fetchProfile() { const token = localStorage.getItem("token"); if (!token) { setError("Please login first"); setLoading(false); return; } try { const response = await axios.get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } }); setUser(response.data); } catch (error) { setError(error.response?.data?.message || "Failed to load profile"); } finally { setLoading(false); } } fetchProfile(); }, []);
  if (loading) return <main className="page"><div className="empty-state"><h2>Loading your profile...</h2></div></main>;
  if (error) return <main className="page"><div className="empty-state"><h2>{error}</h2></div></main>;
  return <main className="page"><div className="profile"><p className="eyebrow">Account</p><h1>My profile</h1><p className="subtext">Your Shopsphere details in one place.</p><div className="profile-details"><div className="profile-row"><span>Name</span><strong>{user.username}</strong></div><div className="profile-row"><span>Email</span><strong>{user.email}</strong></div><div className="profile-row"><span>Account role</span><strong className="role-badge">{user.role}</strong></div></div></div></main>;
}
export default Profile;
