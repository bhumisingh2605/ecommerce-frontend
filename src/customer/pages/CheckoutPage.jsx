import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDATION
  const isFormValid = Object.values(form).every(
    (v) => v && v.trim() !== ""
  );

  const goToPayment = () => {
    if (!isFormValid) {
      alert("Please fill all address details");
      return;
    }
    setStep(2);
  };

  // PLACE ORDER
  const handlePlaceOrder = () => {
    const order = {
      id: Date.now(),
      items: cart,

      address: {
        fullName: form.name,
        phone: form.phone,
        pincode: form.pincode,
        addressLine: form.address,
        city: form.city,
        state: form.state,
      },

      paymentMethod,
      orderStatus: "PLACED",
      total: totalPrice,
      date: new Date().toLocaleString(),
    };

    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    alert("Order placed successfully 🎉");

    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Your cart is empty 🛒</h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* STEP INDICATOR */}
      <div className="flex items-center text-sm mb-8">
        <div className={`font-semibold ${step === 1 ? "text-indigo-600" : ""}`}>
          Address
        </div>
        <div className="flex-1 h-[2px] bg-gray-200 mx-3"></div>
        <div className={`font-semibold ${step === 2 ? "text-indigo-600" : ""}`}>
          Payment
        </div>
      </div>

      {/* STEP 1 - ADDRESS */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* FORM */}
          <div className="bg-white shadow rounded p-6 space-y-3">
            <h2 className="text-lg font-bold">Delivery Address</h2>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-2 w-full rounded"
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-2 w-full rounded"
            />

            <input
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="border p-2 w-full rounded"
            />

            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              className="border p-2 w-full rounded"
            />

            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="border p-2 w-full rounded"
            />

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full Address"
              className="border p-2 w-full rounded"
            />

            <button
              onClick={goToPayment}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              Continue
            </button>
          </div>

          {/* CART SUMMARY */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="font-bold mb-4">Cart Summary</h2>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 text-sm">
                <p>{item.title} (x{item.quantity})</p>
                <p>₹{item.discountedPrice * item.quantity}</p>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>₹{totalPrice}</p>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2 - PAYMENT */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* PAYMENT OPTIONS */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>

            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={() => setPaymentMethod("COD")}
              />
              Cash on Delivery
            </label>

            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                value="UPI"
                checked={paymentMethod === "UPI"}
                onChange={() => setPaymentMethod("UPI")}
              />
              UPI Payment
            </label>

            <label className="flex items-center gap-2 mb-2">
              <input
                type="radio"
                value="CARD"
                checked={paymentMethod === "CARD"}
                onChange={() => setPaymentMethod("CARD")}
              />
              Card Payment
            </label>

            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-black text-white py-3 rounded"
            >
              Place Order
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-2 border py-2 rounded"
            >
              Back
            </button>
          </div>

          {/* FINAL SUMMARY */}
          <div className="bg-white shadow rounded p-6">
            <h2 className="font-bold mb-4">Order Summary</h2>

            {cart.map((item) => (
              <div key={item.id} className="flex justify-between mb-2 text-sm">
                <p>{item.title}</p>
                <p>₹{item.discountedPrice * item.quantity}</p>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg">
              <p>Total Payable</p>
              <p>₹{totalPrice}</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CheckoutPage;