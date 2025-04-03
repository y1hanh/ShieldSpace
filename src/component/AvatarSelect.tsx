import { useState } from 'react';
import { Box, Typography, Button, LinearProgress, Grid, Paper, Alert } from '@mui/material';
import GameLayOutBox from './GameLayOutBox';
import ShareOnline from './ShareOnline';
const avatars = [
  { emoji: '🐱', label: 'Kitten' },
  { emoji: '🐶', label: 'Puppy' },
  { emoji: '🦊', label: 'Fox' },
  { emoji: '🐰', label: 'Bunny' },
];

export default function AvatarSelect({ playerName }) {
  const [selected, setSelected] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!selected) {
      setError(true);
    } else {
      setGameStarted(true);
    }
  };

  if (gameStarted) {
    return <ShareOnline playerName={playerName} avatar={selected} />;
  }

  return (
    <GameLayOutBox>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '100%',
          mx: 'auto',
          boxShadow: 1,
        }}
      >
        {/* Progress */}
        <Typography variant="caption" fontWeight={500} color="#666666" gutterBottom>
          Progress
        </Typography>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{
              height: 25,
              borderRadius: 1,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                background: 'linear-gradient(to right, #62B5E5, #469fd8)',
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: '#666',
              padding: '0.25rem',
            }}
          >
            20%
          </Typography>
        </Box>

        {/* Instructions */}
        <Typography fontWeight={600} mb={1}>
          Choose Your Avatar
        </Typography>
        <Typography variant="body2" mb={3}>
          Select a character to represent you in the digital world:
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Please select an avatar before continuing.
          </Alert>
        )}

        {/* Avatar Grid */}
        <Grid container spacing={5} justifyContent="center" mb={4}>
          {avatars.map(({ emoji, label }) => (
            <Grid item xs={6} sm={3} key={label}>
              <Paper
                onClick={() => {
                  setSelected({ emoji, label });
                  setError(false);
                }}
                elevation={selected?.label === label ? 4 : 1}
                sx={{
                  textAlign: 'center',
                  padding: '3rem',
                  borderRadius: '1rem',
                  border: selected?.label === label ? '2px solid #90caf9' : '1px solid #ddd',
                  backgroundColor: selected?.label === label ? '#e3f2fd' : '#fff',
                  cursor: 'pointer',
                  transition: '0.2s ease',
                }}
              >
                <Typography fontSize="2.5rem">{emoji}</Typography>
                <Typography fontWeight={600}>{label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Next Button */}
        <Box textAlign="right">
          <Button
            onClick={handleNext}
            variant="contained"
            sx={{
              backgroundColor: '#f89b5e',
              borderRadius: '25px',
              paddingX: '2rem',
              paddingY: '0.5rem',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </GameLayOutBox>
  );
}
