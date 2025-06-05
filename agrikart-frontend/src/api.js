import axios from "axios";

const api = axios.create({
  baseURL: 'https://agricart-ai-db.onrender.com/api/',  // replace with your actual backend URL
});
// Automatically add token if available
api.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
