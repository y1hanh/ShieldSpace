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
  const [token, setToken] = useState<string | null>(null); // 🔐 Show token

  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address!');
      return;
    }

    try {
      const res = await fetch('http://209.38.91.23/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Invalid email or password');
        return;
      }

      login(data.access_token);

      navigate('/');

      setToken(data.access_token);

      // You can navigate after showing the token if needed:
      // navigate('/');
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
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
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: '#66CCFF' }}>
          Log in
        </Button>
        <Typography variant="body2" textAlign="center">
          Don&apos;t have an account?{' '}
          <MuiLink
            onClick={() => navigate('/register')}
            sx={{ cursor: 'pointer', color: '#FF9966' }}
          >
            Register here
          </MuiLink>
        </Typography>

        {token && (
          <Box
            sx={{
              backgroundColor: '#e3f2fd',
              borderRadius: '8px',
              padding: '1rem',
              mt: 2,
              wordBreak: 'break-all',
              fontSize: '0.875rem',
            }}
          >
            <Typography fontWeight={600} color="#3A4559">
              🔐 Your access token (valid for 10 hours):
            </Typography>
            <Typography
              sx={{
                mt: 1,
                fontFamily: 'monospace',
                color: '#1e88e5',
              }}
            >
              {token}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
