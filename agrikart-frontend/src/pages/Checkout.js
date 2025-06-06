import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Checkout.css";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const clientName = localStorage.getItem("username");

  const handlePlaceOrder = async () => {
    try {
      // Get client ID
      const clientRes = await api.get("clients/");
      const client = clientRes.data.find(c => c.name === clientName);
      if (!client) throw new Error("Client not found");

      // Create orders for each cart item
      for (const item of cart) {
        await api.post("orders/", {
          client: client.id,
          produce: item.id,
          quantity_kg: item.quantity_kg,
          scheduled_time: new Date().toISOString(), // You can enhance this with a time picker
        });
      }

      clearCart();
      alert("Orders placed successfully!");
      navigate("/buyer/orders");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity_kg, 0);

  return (
    <div className="checkout-page">
      <h2>🧾 Checkout</h2>

      {cart.length === 0 ? (
        <div className="empty-checkout">
          <p>Your cart is empty. Add some produce before checking out.</p>
        </div>
      ) : (
        <div className="checkout-summary">
          {cart.map(item => (
            <div className="checkout-item" key={item.id}>
              <h3>{item.crop_name}</h3>
              <p><strong>Quantity:</strong> {item.quantity_kg} kg</p>
            </div>
          ))}
          <div className="checkout-total">
            <p><strong>Total Quantity:</strong> {totalQuantity} kg</p>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
