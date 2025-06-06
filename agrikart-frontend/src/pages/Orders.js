import React, { useEffect, useState } from "react";
import api from "../api";
import "./Orders.css"; // Import styles

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("clients/")
      .then(res => {
        const username = localStorage.getItem("username");
        const client = res.data.find(c => c.name === username);
        if (client) {
          setClientId(client.id);
          return api.get(`orders/?client=${client.id}`);
        } else {
          throw new Error("Client not found");
        }
      })
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error loading orders", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="orders-page">
      <h2>📦 Your Orders</h2>

      {loading ? (
        <p className="loading">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="empty-orders">
          <img src="/no-orders.svg" alt="No orders" />
          <p>No orders placed yet. Start shopping in the marketplace!</p>
        </div>
      ) : (
        <div className="order-list">
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <div className="order-meta">
                <h3>Order #{order.id}</h3>
                <p><strong>Quantity:</strong> {order.quantity_kg} kg</p>
              </div>
              <div className="order-tags">
                <span className={`status ${order.status}`}>{order.status}</span>
                <span className={`payment ${order.payment_status}`}>{order.payment_status}</span>
              </div>
              <p className="order-date">
                <strong>Scheduled for:</strong> {new Date(order.scheduled_time).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
