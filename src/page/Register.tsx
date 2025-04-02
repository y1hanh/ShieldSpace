import { Box, TextField, Button, Typography, Link as MuiLink, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import bcrypt from 'bcryptjs';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    gender: '',
    birthDate: '',
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError('Please enter a valid email address!');
      return;
    }

    try {
      const hashedPassword = await bcrypt.hash(form.password, 10);

      const payload = {
        email: form.email,
        password: hashedPassword,
        name: form.name || undefined,
        gender: form.gender || undefined,
        birthDate: form.birthDate ? new Date(form.birthDate).toISOString() : undefined,
      };

      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Registration failed');
        return;
      }

      const data = await res.json();
      login(data.email);
      navigate('/');
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
        />
        <TextField label="Name" type="text" name="name" value={form.name} onChange={handleChange} />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <TextField label="Gender" name="gender" select value={form.gender} onChange={handleChange}>
          <MenuItem value="">Prefer not to say</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Birth Date"
          name="birthDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={form.birthDate}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" sx={{ backgroundColor: '#66CCFF' }}>
          Register
        </Button>

        <Typography variant="body2" textAlign="center">
          Already have an account?{' '}
          <MuiLink onClick={() => navigate('/login')} sx={{ cursor: 'pointer', color: '#FF9966' }}>
            Login here
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
