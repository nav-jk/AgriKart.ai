import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css"; // Using the new styles matching signup

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      const role = localStorage.getItem("role");

      if (role === "farmer") {
        navigate("/farmer/dashboard");
      } else if (role === "buyer") {
        navigate("/buyer/marketplace");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Welcome Back</h2>
        <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>

        <div className="signup-redirect">
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign up</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
