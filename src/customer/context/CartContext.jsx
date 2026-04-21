import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// ✅ SAFE HOOK (prevents undefined crash)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};

const CartProvider = ({ children }) => {

  // CART
  const [cart, setCart] = useState([]);

  // ORDERS
  const [orders, setOrders] = useState([]);

  // LOAD FROM LOCALSTORAGE (ONLY ONCE)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    setCart(storedCart);
    setOrders(storedOrders);
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // SAVE ORDERS
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // UPDATE QTY
  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);
  };

  // PLACE ORDER (SAFE VERSION)
  const placeOrder = (address, paymentMethod) => {
    if (cart.length === 0) return;

    const total = cart.reduce(
      (sum, item) => sum + item.discountedPrice * item.quantity,
      0
    );

    const newOrder = {
      id: Date.now(),
      items: cart,
      address: address || {},
      paymentMethod: paymentMethod || "COD",
      total,
      date: new Date().toLocaleString(),
      status: "PLACED",
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
  };

  // DELETE ORDER
  const deleteOrder = (id) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        deleteOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;