import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import API from "../../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const AuthModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔐 LOGIN
  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(`${API}/api/v1/auth/signin`, {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("jwt", res.data.jwt);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.jwt,
      });

      alert("Login successful");
      handleClose();
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Invalid credentials");
    }
  };

  // 📝 REGISTER
  const handleRegister = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      // ✅ FIXED: removed unused 'res'
      await axios.post(`${API}/api/v1/auth/signup`, {
        email: form.email,
        password: form.password,
        firstName: form.name,
        lastName: "User",
      });

      alert("Registered successfully! Now login.");
      setIsLogin(true);
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {isLogin ? "Login" : "Register"}
        </Typography>

        {!isLogin && (
          <input
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          />
        )}

        <input
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
        />

        <button
          onClick={isLogin ? handleLogin : handleRegister}
          style={{
            width: "100%",
            padding: "10px",
            background: "#4f46e5",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>
      </Box>
    </Modal>
  );
};

export default AuthModal;