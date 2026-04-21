import React, { useState } from "react";
import axios from "axios";
import API from "../../api";

const LoginForm = ({ switchToRegister, onLoginSuccess }) => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
         `${API}/api/v1/auth/signin` ,
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log("Login success:", res.data);

      // ✅ Save JWT token
      localStorage.setItem("jwt", res.data.jwt);

      alert("Login successful");

      // ✅ Optional callback (close modal / update UI)
      if (onLoginSuccess) {
        onLoginSuccess();
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div>

      <h2 style={{ marginBottom: "15px" }}>Login</h2>

      <input
        name="email"
        placeholder="Enter email"
        value={form.email}
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="password"
        type="password"
        placeholder="Enter password"
        value={form.password}
        onChange={handleChange}
        style={inputStyle}
      />

      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>

      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          onClick={switchToRegister}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Register
        </span>
      </p>

    </div>
  );
};

// styles
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

export default LoginForm;