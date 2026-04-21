import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderTimeline from "../components/OrderTimeline";
import API from "../../api";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("jwt");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ================= FETCH USER ORDERS =================
  useEffect(() => {
    axios
      .get(`${API}/api/orders/user`, config) // ✅ FIXED
      .then((res) => {
        setOrders(res.data.reverse());
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  // ================= CANCEL ORDER =================
  const handleCancel = async (id) => {
    try {
      const confirmCancel = window.confirm("Cancel this order?");
      if (!confirmCancel) return;

      await axios.put(
        `${API}/api/orders/${id}/cancel`, // ✅ FIXED
        {},
        config
      );

      // ✅ instant UI update
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? { ...order, orderStatus: "CANCELED" }
            : order
        )
      );
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel order");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {!orders.length && (
        <div className="text-center text-gray-500 p-10">
          No orders found 🛒
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => {
          const addr = order.shippingAddress;

          return (
            <div
              key={order.id}
              className="bg-white border p-5 rounded-xl shadow-sm"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Order ID: {order.id}
                </p>

                {order.orderStatus !== "CANCELED" && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="text-orange-500 border px-3 py-1 rounded hover:bg-orange-50 text-xs"
                  >
                    Cancel
                  </button>
                )}
              </div>

              {/* DATE */}
              <p className="text-sm text-gray-500 mb-2">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "Just now"}
              </p>

              {/* STATUS */}
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  order.orderStatus === "CANCELED"
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.orderStatus || "PLACED"}
              </span>

              {/* TIMELINE */}
              <OrderTimeline order={order} />

              {/* MAIN GRID */}
              <div className="grid md:grid-cols-3 gap-5 mt-6">
                {/* ADDRESS */}
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p className="font-semibold mb-2">Delivery Address</p>

                  {addr ? (
                    <>
                      <p className="font-medium">
                        {addr.firstName || ""} {addr.lastName || ""}
                      </p>
                      <p>{addr.mobile}</p>
                      <p className="text-gray-600 mt-1">
                        {addr.streetAddress}
                        <br />
                        {addr.city}, {addr.state} - {addr.zipCode}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-500">No address found</p>
                  )}
                </div>

                {/* ITEMS */}
                <div className="md:col-span-2">
                  <p className="font-semibold mb-3">Items</p>

                  <div className="flex justify-between border-b pb-2">
                    <div>
                      <p>Product</p>
                      <p className="text-xs text-gray-500">
                        Qty: {order.totalItem}
                      </p>
                    </div>

                    <p>₹{order.totalPrice}</p>
                  </div>

                  <div className="flex justify-between mt-4 font-bold">
                    <p>Total Paid</p>
                    <p>₹{order.totalPrice}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;