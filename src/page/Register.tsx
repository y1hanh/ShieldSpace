import { Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate passwords match
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Validate password length
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address!");
      return;
    }

    // Get existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if email already exists
    if (existingUsers.some((user: { email: string; password: string }) => user.email === form.email)) {
      setError("This email is already registered!");
      return;
    }

    // Add new user to localStorage
    existingUsers.push({
      email: form.email,
      password: form.password
    });
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

    // Auto login after successful registration
    login(form.email);
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7f7f7",
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Typography variant="h5" fontWeight={600} textAlign="center" color="#66CCFF">
          Register
        </Typography>

        {error && (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          error={!!error && error.includes("email")}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          error={!!error && error.includes("password")}
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          error={!!error && error.includes("Passwords do not match")}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#66CCFF" }}>
          Register
        </Button>
        <Typography variant="body2" textAlign="center">
          Already have an account?{" "}
          <MuiLink onClick={() => navigate("/login")} sx={{ cursor: "pointer", color: "#FF9966" }}>
            Login here
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
