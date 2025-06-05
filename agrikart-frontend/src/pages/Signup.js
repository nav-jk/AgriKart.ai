import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "buyer", // default role
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("signup/", form);
    const data = res.data;

    alert(`Account created as ${data.role_display}!`);

    // Optional: redirect based on role
    if (data.role_display === "farmer") {
      navigate("/farmer/dashboard");
    } else {
      navigate("/buyer/marketplace");
    }
  } catch (error) {
  const message = error.response?.data?.username?.[0]
    || error.response?.data?.email?.[0]
    || "Signup failed. Please try again.";
  alert(message);
  console.error("Signup error:", error.response?.data || error);
}

};


  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <select
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        required
      >
        <option value="buyer">Buyer</option>
        <option value="farmer">Farmer</option>
      </select>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
