import React from "react";
import "./Home.css"; // Importing the new themed CSS

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to AgriKart</h1>
        <p>Your trusted platform connecting Farmers and Buyers efficiently.</p>
        <div className="home-actions">
          <a href="/login" className="home-button">Login</a>
          <a href="/signup" className="home-button secondary">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
