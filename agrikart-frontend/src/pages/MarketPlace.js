import React, { useEffect, useState, useContext } from "react";
import api from "../api";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import "./MarketPlace.css";

const Marketplace = () => {
  const [produceList, setProduceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    api.get("produce/?status=available")
      .then(res => setProduceList(res.data))
      .catch(err => console.error("Error fetching produce", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="marketplace">
      <header className="marketplace-header">
        <h2>🌾 Fresh Produce Marketplace</h2>
        <p>Find and order fresh produce directly from farmers</p>
      </header>

      {loading ? (
        <div className="loading">Loading produce...</div>
      ) : produceList.length === 0 ? (
        <div className="empty-state">
          <img src="/no-items.svg" alt="No produce" />
          <p>No produce available right now. Check back soon!</p>
        </div>
      ) : (
        <div className="grid">
          {produceList.map(item => (
            <div className="card" key={item.id}>
              <h3>{item.crop_name}</h3>
              <p><strong>Quantity:</strong> {item.quantity_kg} kg</p>
              <span className={`badge status-${item.status}`}>{item.status}</span>
              <button onClick={() => addToCart(item)}>
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
