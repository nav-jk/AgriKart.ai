import React, { createContext, useState } from "react";
import api from "../api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("username") || null);

const login = async (username, password) => {
  const res = await api.post("token/", { username, password });
  const accessToken = res.data.access;
  const refreshToken = res.data.refresh;
  const role = res.data.role;

  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("username", username);
  localStorage.setItem("role", role); // ✅ Use this role directly

  setUser(username);
};


  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
