import React, { useState } from "react";
import { FormGroup } from "../components/form";
import { userSchema } from "../lib/schemas";
import { useAPI } from "../hooks/useAPI";
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
} from "../lib/constants";

type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

function defaultRegisterFormData(): RegisterFormData {
  return {
    username: "",
    password: "",
    confirmPassword: "",
  };
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>(
    defaultRegisterFormData()
  );
  const [success, setSuccess] = useState("");

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
    if (formData.username.length > MAX_USERNAME_LENGTH) {
      setError(
        `Username can't be longer than ${MAX_USERNAME_LENGTH} characters`
      );
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
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !validateForm()) return;

    setSuccess("");

    const apiResponse = await fetchData("/api/register", {
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
      setSuccess("Registration successful! You can now log in.");
      setFormData(defaultRegisterFormData());
    }
  }

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit} className="register-form">
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
          <FormGroup
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            disabled={loading}
            placeholder="Confirm your password"
          />

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="login-link">
          Already have an account? <a href="/login">Sign in here</a>
        </div>
      </div>
    </div>
  );
}
