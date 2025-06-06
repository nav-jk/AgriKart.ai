import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (produce) => {
    const exists = cart.find(item => item.id === produce.id);
    if (exists) return; // prevent duplicates
    setCart([...cart, { ...produce, quantity_kg: 1 }]);
  };

  const updateQuantity = (id, qty) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity_kg: qty } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
