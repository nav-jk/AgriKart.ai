import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Add useNavigate
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    logout();
    navigate("/signup"); // ✅ Redirect to signup
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="brand">AgriKart</Link>
      </div>

      <div className="navbar-center">
        {user && (
          <>
            <Link to="/buyer/marketplace">Marketplace</Link>
            <Link to="/buyer/cart">
              <FaShoppingCart /> Cart ({cart.length})
            </Link>
            <Link to="/buyer/orders">My Orders</Link>
          </>
        )}
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="user-info">
              <FaUserCircle /> {user} ({role})
            </span>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
