import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../api"; // ✅ IMPORTANT

const CheckoutPayment = () => {

  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const [method, setMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const address = JSON.parse(localStorage.getItem("address"));
  const token = localStorage.getItem("jwt");

  // ✅ prevent redirect loop
  useEffect(() => {
    if (!address) {
      navigate("/checkout/address");
    }
  }, []);

  if (!address) return null;

  const totalAmount = (cart || []).reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  // Razorpay loader
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ================= MAIN FUNCTION =================
  const handlePlaceOrder = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (!cart || cart.length === 0) {
        alert("Cart is empty");
        setLoading(false);
        return;
      }

      const orderRequest = {
        address,
        paymentMethod: method,
        items: cart.map((item) => ({
          productId: item.id || item._id,
          title: item.title,
          quantity: item.quantity,
          price: item.discountedPrice,
        })),
        totalAmount,
      };

      // ================= COD =================
      if (method === "COD") {
        const res = await axios.post(
          `${API}/api/orders`,
          orderRequest,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const orderId = res.data?.id;

        // ✅ clear first
        clearCart();
        localStorage.removeItem("address");

        navigate("/payment-success", {
          state: { orderId },
        });

        return;
      }

      // ================= ONLINE =================
      const scriptLoaded = await loadRazorpay();
      if (!scriptLoaded) {
        alert("Razorpay failed to load");
        setLoading(false);
        return;
      }

      const orderRes = await axios.post(
        `${API}/api/payment/create-order`,
        { amount: totalAmount * 100 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { id: razorpayOrderId, amount } = orderRes.data;

      const options = {
        key: "rzp_test_SfkvOKYBWEG8ra",
        amount,
        currency: "INR",
        name: "YourStore",
        description: "Order Payment",
        order_id: razorpayOrderId,

        handler: async function (response) {
          try {
            await axios.post(
              `${API}/api/payment/verify`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const res = await axios.post(
              `${API}/api/orders`,
              orderRequest,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const orderId = res.data?.id;

            // ✅ clear first
            clearCart();
            localStorage.removeItem("address");

            navigate("/payment-success", {
              state: { orderId },
            });

          } catch (err) {
            console.log(err);
            alert("Payment succeeded but order failed");
          }
        },

        prefill: {
          name: address.fullName,
          contact: address.phone,
        },

        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-xl font-bold mb-4">Checkout Payment</h2>

      {/* ADDRESS */}
      <div className="mb-4 p-3 border rounded">
        <h3 className="font-semibold">Deliver To:</h3>
        <p>{address?.fullName}</p>
        <p>{address?.phone}</p>
        <p>{address?.street}, {address?.city}</p>
      </div>

      {/* SUMMARY */}
      <div className="mb-4 border p-3 rounded">
        <h3 className="font-semibold mb-2">Order Summary</h3>

        {(cart || []).map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.title} × {item.quantity}</span>
            <span>₹{item.discountedPrice * item.quantity}</span>
          </div>
        ))}

        <hr className="my-2" />
        <div className="font-bold">Total: ₹{totalAmount}</div>
      </div>

      {/* PAYMENT */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Payment Method</h3>

        <label className="block mb-2">
          <input
            type="radio"
            value="COD"
            checked={method === "COD"}
            onChange={(e) => setMethod(e.target.value)}
            className="mr-2"
          />
          Cash on Delivery
        </label>

        <label className="block">
          <input
            type="radio"
            value="ONLINE"
            checked={method === "ONLINE"}
            onChange={(e) => setMethod(e.target.value)}
            className="mr-2"
          />
          UPI Payment (Razorpay)
        </label>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 w-full rounded disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>

    </div>
  );
};

export default CheckoutPayment;