import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../slice/authSlice';

export function SecurePage() {
  const [username, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { useSubmit } = useAuth();

  const submit = async () => {
    try {
      await useSubmit('ta30', password);
      setError('');
    } catch (error) {
      setError('Wrong password');
      console.error(error);
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
      <Typography> please input password to access this page</Typography>

      <Box>
        <TextField
          id="outlined-controlled"
          label="Password"
          value={password}
          onKeyDown={e => e.key === 'Enter' && submit()}
          type="password"
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
