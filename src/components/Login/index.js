import React, { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend login endpoint using fetch
      const response = await fetch("https://markanthony-backend-jobstation.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong. Please try again.");
      }

      // Parse the response JSON
      const data = await response.json();

      // Save the JWT token in localStorage or sessionStorage
      localStorage.setItem("token", data.token);

      // Redirect the user to the user dashboard after successful login
      navigate("/userdashboard"); // Navigate to the user dashboard route
    } catch (err) {
      // Handle errors (e.g., invalid credentials, server errors)
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Already have an account?</h1>
        <p>Your personal job finder is here</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit} className="login-form-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
        <p>
          Don’t have an account? <a href="/signup" className="login-form-link">Sign Up</a>
        </p>
      </div>
      <div className="login-image"></div>
    </div>
  );
};

export default Login;
