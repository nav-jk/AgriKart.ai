import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import Navbar from "./components/Navbar";
import Marketplace from './pages/MarketPlace';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/buyer/marketplace" element={<Marketplace />} />
          <Route path="/buyer/cart" element={<Cart />} />
          <Route path="/buyer/checkout" element={<Checkout />} />
          <Route path="/buyer/orders" element={<Orders />} />
          <Route path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
