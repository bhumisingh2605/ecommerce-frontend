import React, { useState } from "react";
import axios from "axios";
import API from "../api"; 

const RegisterForm = ({ switchToLogin }) => {
  const dispatch=useDispatch(); 
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${API}/api/v1/auth/signup`,
        {
          email: form.email,
          password: form.password,
          firstName: form.name,
          lastName: "User"
        }
      );

      console.log("Register success:", res.data);

      alert("Registered successfully! Please login.");

      // switch to login form
      switchToLogin();

    } catch (err) {
      console.log("REGISTER ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>

      <h2 style={{ marginBottom: "15px" }}>Register</h2>

      <input
        name="name"
        placeholder="Enter name"
        value={form.name}
        onChange={handleChange}
        style={inputStyle}
      />

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

      <button onClick={handleRegister} style={buttonStyle}>
        Register
      </button>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <span onClick={switchToLogin} style={{ color: "blue", cursor: "pointer" }}>
          Login
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

export default RegisterForm;