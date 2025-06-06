import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleChange = (id, delta) => {
    const item = cart.find(item => item.id === id);
    const newQty = Math.max(1, item.quantity_kg + delta); // Prevent 0 or less
    updateQuantity(id, newQty);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity_kg, 0);

  return (
    <div className="cart-page">
      <h2><FaShoppingCart /> Your Cart</h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <img src="/empty-cart.svg" alt="Empty cart" />
          <p>Your cart is empty. Start adding some fresh produce!</p>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map(item => (
            <div className="cart-card" key={item.id}>
              <div className="cart-details">
                <h3>{item.crop_name}</h3>
                <p><strong>Current Qty:</strong> {item.quantity_kg} kg</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => handleChange(item.id, -1)}><FaMinus /></button>
                <span>{item.quantity_kg}</span>
                <button onClick={() => handleChange(item.id, 1)}><FaPlus /></button>
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                <FaTrashAlt /> Remove
              </button>
            </div>
          ))}

          <div className="cart-footer">
            <p><strong>Total Quantity:</strong> {totalItems} kg</p>
            <button className="checkout-btn" onClick={() => navigate("/buyer/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
