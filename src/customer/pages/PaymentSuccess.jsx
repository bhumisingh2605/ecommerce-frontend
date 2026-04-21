import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state?.orderId;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">

      {/* ✅ Success Icon */}
      <div className="text-green-500 text-6xl mb-4">
        ✔
      </div>

      {/* ✅ Heading */}
      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h1>

      {/* ✅ Message */}
      <p className="text-gray-600 mb-2">
        Your order has been placed successfully.
      </p>

      {/* ✅ ORDER ID */}
      {orderId && (
        <p className="text-lg font-semibold text-gray-800 mb-6">
          Order ID: #{orderId}
        </p>
      )}

      {/* ✅ ACTION BUTTONS */}
      <div className="flex gap-4">

        <button
          onClick={() => navigate("/orders")}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          View Orders
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 px-6 py-2 rounded hover:bg-gray-300"
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
};

export default PaymentSuccess;