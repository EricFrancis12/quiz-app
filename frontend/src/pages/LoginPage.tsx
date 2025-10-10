import React, { useState } from "react";
import { FormGroup } from "../components/form";
import { useAPI } from "../hooks/useAPI";
import { userSchema } from "../lib/schemas";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../lib/constants";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginFormData = {
  username: string;
  password: string;
};

function defaultLoginFormData(): LoginFormData {
  return {
    username: "",
    password: "",
  };
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginFormData>(
    defaultLoginFormData()
  );

  const { loading, error, setError, fetchData } = useAPI(userSchema);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  }

  function validateForm(): boolean {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (formData.username.length < MIN_USERNAME_LENGTH) {
      setError(`Username must be at least ${MIN_USERNAME_LENGTH} characters`);
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return false;
    }
    if (formData.password.length > MAX_PASSWORD_LENGTH) {
      setError(
        `Password can't be longer than ${MAX_PASSWORD_LENGTH} characters`
      );
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !validateForm()) return;

    const apiResponse = await fetchData("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });

    if (apiResponse?.success) {
      toast("You are now logged in!");
      setFormData(defaultLoginFormData());
      navigate("/dashboard");
    }
  }

  return (
    <div style={{ padding: "40px 20px", maxWidth: "400px", margin: "0 auto" }}>
      <div>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Login</h1>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <FormGroup
            type="text"
            id="username"
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
            disabled={loading}
            placeholder="Enter your username"
          />
          <FormGroup
            type="password"
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            disabled={loading}
            placeholder="Enter your password"
          />

          {error && (
            <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              margin: "20px 0",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div
          style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}
        >
          Don't have an account? <Link to="/register">Sign up here</Link>
        </div>
      </div>
    </div>
  );
}
