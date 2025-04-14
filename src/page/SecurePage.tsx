import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function SecurePage() {
  const [username, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { useSubmit } = useAuth();

  const submit = async () => {
    try {
      await useSubmit(username, password);
      setError('');
    } catch (error) {
      setError('Wrong username or password');
      console.log('Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '2rem',
      }}
    >
      {error && <Typography color="red">{error}</Typography>}
      <Box>
        <TextField
          id="outlined-controlled"
          label="User Name"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
      </Box>

      <Box>
        <TextField
          id="outlined-controlled"
          label="Password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
      </Box>

      <Box>
        <Button onClick={submit}>Submit</Button>
      </Box>
    </Box>
  );
}
