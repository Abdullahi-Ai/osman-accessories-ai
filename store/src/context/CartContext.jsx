import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('osman_cart');
      if (!savedCart) return [];
      
      const parsed = JSON.parse(savedCart);
      if (!Array.isArray(parsed)) return [];


      return parsed.reduce((acc, savedItem) => {
        if (!savedItem || !savedItem.id) return acc;
        
        const trustedProduct = products.find(p => p.id === savedItem.id);
        if (trustedProduct) {

          let validQty = parseInt(savedItem.quantity, 10);
          if (isNaN(validQty) || validQty < 1) validQty = 1;
          if (validQty > 99) validQty = 99;
          
          acc.push({ ...trustedProduct, quantity: validQty });
        }
        return acc;
      }, []);
    } catch (e) {
      console.error("Failed to parse cart", e);
      return [];
    }
  });

  useEffect(() => {

    const storageCart = cart.map(item => ({ id: item.id, quantity: item.quantity }));
    localStorage.setItem('osman_cart', JSON.stringify(storageCart));
  }, [cart]);

  const addToCart = (product) => {
    if (!product || !product.id) return;
    

    const trustedProduct = products.find(p => p.id === product.id);
    if (!trustedProduct) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === trustedProduct.id);
      if (existing) {

        const newQty = Math.min(existing.quantity + 1, 99);
        return prev.map(item => 
          item.id === trustedProduct.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prev, { ...trustedProduct, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    const validQty = parseInt(quantity, 10);
    if (isNaN(validQty) || validQty < 1 || validQty > 99) return;
    
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: validQty } : item
    ));
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
