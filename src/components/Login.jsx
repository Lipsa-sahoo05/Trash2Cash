import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateAndNavigate = (path) => {
    if (!username.trim() || !password.trim()) {
      setError("Enter the required fields");
      return;
    }
    setError("");
    navigate(path);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        {/* Normal Login */}
        <button
          type="button"
          className="login-btn"
          onClick={() => validateAndNavigate("/body")}
        >
          Login
        </button>

        <div className="login-links">
          <span
            className="fake-link"
            onClick={() => validateAndNavigate("/controller")}
          >
            Collector Login
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
