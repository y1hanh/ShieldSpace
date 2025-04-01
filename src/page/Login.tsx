import { Box, TextField, Button, Typography, Link as MuiLink } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address!');
      return;
    }

    // Get registered users from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

    // Check if user exists and password matches
    const user = registeredUsers.find(
      (u: { email: string; password: string }) =>
        u.email === form.email && u.password === form.password
    );

    if (user) {
      login(form.email);
      navigate('/');
    } else {
      setError('Invalid email or password!');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
        padding: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          padding: 4,
        }}
      >
        <Typography variant="h5" fontWeight={600} textAlign="center" color="#66CCFF">
          Login
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
          error={!!error && error.includes('email')}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          error={!!error && error.includes('password')}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#66CCFF' }}>
          Log in
        </Button>
        <Typography variant="body2" textAlign="center">
          Don't have an account?{' '}
          <MuiLink
            onClick={() => navigate('/register')}
            sx={{ cursor: 'pointer', color: '#FF9966' }}
          >
            Register here
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
