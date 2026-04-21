import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const order = JSON.parse(localStorage.getItem("order"));

  if (!order) {
    return <h2 className="text-center mt-10">No order found</h2>;
  }

  const { address } = order;

  const goToOrders = () => {
    const existing = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...existing, order]));

    navigate("/orders");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-xl font-bold mb-4">
        Order Placed Successfully 🎉
      </h1>

      <p className="mb-4">Order ID: {order.id}</p>

      {/* ADDRESS */}
      <div className="border p-4 rounded mb-6">
        <h2 className="font-bold">Delivery Address</h2>

        <p><b>{address.name}</b></p>
        <p>{address.phone}</p>
        <p>{address.address}</p>
        <p>{address.city}, {address.state} - {address.pincode}</p>
      </div>

      {/* ITEMS */}
      <div className="border p-4 rounded mb-6">
        <h2 className="font-bold">Items</h2>

        {order.items.map((item, i) => (
          <div key={i}>
            <p>{item.title}</p>
            <p>Qty: {item.quantity}</p>
            <p>₹{item.discountedPrice}</p>
          </div>
        ))}
      </div>

      <h2 className="font-bold mb-4">
        Total Paid: ₹{order.total}
      </h2>

      <button
        onClick={goToOrders}
        className="bg-black text-white px-6 py-2 rounded"
      >
        Go to My Orders
      </button>

    </div>
  );
};

export default OrderSuccess;