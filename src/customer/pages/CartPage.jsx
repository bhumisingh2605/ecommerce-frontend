import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {

  const {
    cart,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  // 🛒 If cart is empty
  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold mb-4">🛒 Your Cart is Empty</h1>

        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ✅ FIXED: Always go to address page first
  const handlePlaceOrder = () => {
    navigate("/checkout/address");
  };

  return (
    <div className="p-5 lg:p-10">

      <h1 className="text-2xl font-bold mb-6">
        🛒 Cart ({cart.length})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* 🧾 Cart Items */}
        <div className="lg:col-span-2 space-y-6">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-white p-4 shadow rounded-lg"
            >

              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-28 h-28 object-contain"
              />

              <div className="flex-1">

                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500 text-sm">{item.brand}</p>

                <p className="font-bold mt-1">
                  ₹{item.discountedPrice}
                </p>

                <div className="flex items-center gap-3 mt-3">

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity === 1}
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-gray-200 rounded"
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm mt-3"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* 💰 Price Section */}
        <div className="bg-white p-6 shadow rounded-lg h-fit">

          <h2 className="font-bold text-lg mb-4">
            Price Details
          </h2>

          <div className="flex justify-between mb-2">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Total Price</span>
            <span className="font-bold">₹{total}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Place Order
          </button>

        </div>

      </div>
    </div>
  );
};

export default CartPage;