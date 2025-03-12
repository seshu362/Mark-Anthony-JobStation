import React, { useState } from "react";
import "./index.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const Signup= () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if the user agreed to the terms
    if (!agreeToTerms) {
      setError("You must agree to the terms of use and privacy policy.");
      return;
    }

    try {
      // Make a POST request to the backend signup endpoint using fetch
      const response = await fetch("https://markanthony-backend-jobstation.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, mobile, password }),
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong. Please try again.");
      }

      // Redirect the user to the login page after successful signup
      navigate("/login"); // This line navigates the user to the login page
    } catch (err) {
      // Handle errors (e.g., email already exists, server errors)
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h1>Create an account</h1>
        <p>Your personal job finder is here</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="signup-input"
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="tel"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          <input
            className="signup-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Terms & Conditions */}
          <div className="signup-terms-container">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
            />
            <label htmlFor="terms">
              By creating an account, I agree to our{" "}
              {/* Change to button or span */}
              <button
                type="button"
                onClick={() => console.log("Navigate to terms of use")}
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
              >
                terms of use
              </button>{" "}
              and{" "}
              <button
                type="button"
                onClick={() => console.log("Navigate to privacy policy")}
                style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
              >
                privacy policy
              </button>
            </label>
          </div>

          <button className="signup-button" type="submit">
            Create Account
          </button>
        </form>

        <p className="signup-signin-text">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
      <div className="signup-image"></div>
    </div>
  );
};

export default Signup;
