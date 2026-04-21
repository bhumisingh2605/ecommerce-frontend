import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE LOGIN
  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === formData.email &&
      savedUser.password === formData.password
    ) {
      localStorage.setItem("isLoggedIn", true);
      alert("Login Successful ✅");
      navigate("/");
    } else {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign In
        </h2>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded"
          required
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Sign In
        </button>

        {/* LINK */}
        <p className="text-sm mt-4 text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 cursor-pointer"
          >
            Create account
          </span>
        </p>
      </form>

    </div>
  );
};

export default SignInPage;