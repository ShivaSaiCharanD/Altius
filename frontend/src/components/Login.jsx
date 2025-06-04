import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", { username, password });
    if (res.status !== 200) {
        console.error("Login failed", res);
        setMsg("Login failed. Please check your credentials.");
        return;
    }
    console.log("Logging in with", { username, password });
    localStorage.setItem("token", res.data.token);
    navigate("/");
  };

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-3">Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
      </form>
        {msg && <p  className="">{msg}</p>}
    </div>
  );
}