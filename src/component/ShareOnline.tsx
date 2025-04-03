import { useState } from 'react';
import { Box, Typography, Button, LinearProgress, Grid, Paper } from '@mui/material';
import GameLayOutBox from './GameLayOutBox';
import AvatarSelect from './AvatarSelect';
import PostBully from './PostBully';
const options = [
  { emoji: '🧍‍♀️', label: 'A Selfie' },
  { emoji: '🍕', label: 'A Photo of Food' },
  { emoji: '🐾', label: 'A Picture of your pet' },
];

export default function ShareSomethingOnline({ playerName, avatar }) {
  const [selected, setSelected] = useState('A Photo of Food');
  const [gameStarted, setGameStarted] = useState(false);
  const [backButton, setBackButton] = useState(false);

  if (backButton) {
    return <AvatarSelect playerName={playerName} avatar={avatar} />;
  }

  if (gameStarted) {
    return <PostBully playerName={playerName} avatar={avatar} />;
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
        {/* Progress Bar */}
        <Typography variant="caption" fontWeight={500} gutterBottom>
          Progress
        </Typography>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={40}
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
            40%
          </Typography>
        </Box>

        {/* Title & Description */}
        <Typography fontWeight={600} mb={1}>
          Share Something Online
        </Typography>
        <Typography variant="body2" mb={3}>
          You're excited about the weekend, so you decide to post something on social media. What
          will you share?
        </Typography>

        {/* Options Grid */}
        <Grid container spacing={2} justifyContent="center" mb={4}>
          {options.map(({ emoji, label }) => (
            <Grid item xs={12} sm={4} key={label}>
              <Paper
                onClick={() => setSelected(label)}
                elevation={selected === label ? 4 : 1}
                sx={{
                  textAlign: 'center',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: selected === label ? '2px solid #90caf9' : '1px solid #ddd',
                  backgroundColor: selected === label ? '#e3f2fd' : '#fff',
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

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => setBackButton(true)}
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
            Previous
          </Button>
          <Button
            onClick={() => setGameStarted(true)}
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
