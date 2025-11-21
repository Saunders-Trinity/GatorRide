import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginPage.css";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Try to grab the user id from a few common places
      const userId =
        data.user_id ??
        data.id ??
        (data.user && (data.user.user_id ?? data.user.id)) ??
        null;

      const role = data.role || (data.user && data.user.role) || "User";
      const emailFromRes = data.email || (data.user && data.user.email) || email;

      if (!userId) {
        console.warn(
          "Login succeeded but no user_id found in response. Riding posting will fail until backend sends an id.",
          data
        );
      }

      const userData = {
        user_id: userId,
        email: emailFromRes,
        role,
        token: data.token,
      };

      // Save in state (App) and let App do the rest
      onLogin(userData);

      // Also store id in localStorage as a fallback for PostRide
      if (userId) {
        localStorage.setItem("user_id", String(userId));
      }

      navigate("/");
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your UF email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
