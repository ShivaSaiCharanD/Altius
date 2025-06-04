import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", { username, password });
      if (res.status === 200) {
        setMsg("Registration successful!");
        setUsername("");
        setPassword("");
      } else {
        setMsg("Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      setMsg("Registration error. Try a different username.");
    }
  };

  return (
    <div
      className="container mt-5 d-flex flex-column align-items-center"
    >
      <div>
        <h2 className="text-center mb-3">Register</h2>
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
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary" onClick={handleRegister}>
            Register
          </button>
        </form>
        {msg && <p className="mt-3 text-center text-info">{msg}</p>}
      </div>
    </div>
  );
}
