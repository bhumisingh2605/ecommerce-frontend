import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    const isEmpty = Object.values(form).some((v) => !v || v.trim() === "");

    if (isEmpty) {
      alert("Please fill all fields");
      return;
    }

   const addressData = {
  fullName: form.name,
  phone: form.phone,
  pincode: form.pincode,
  addressLine: form.address,
  city: form.city,
  state: form.state,
};
    localStorage.setItem("address", JSON.stringify(addressData));

    navigate("/checkout/payment");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Delivery Address</h1>

      <div className="space-y-3">

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 w-full"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border p-2 w-full"
        />

        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="border p-2 w-full"
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
          className="border p-2 w-full"
        />

        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="State"
          className="border p-2 w-full"
        />

        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Full Address"
          className="border p-2 w-full"
        />

        <button
          onClick={handleContinue}
          className="bg-black text-white px-5 py-2 w-full rounded"
        >
          Continue to Payment
        </button>

      </div>
    </div>
  );
};

export default CheckoutAddress;