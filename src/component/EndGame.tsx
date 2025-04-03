import { Box, Typography, Button, LinearProgress, Paper, Chip } from '@mui/material';
import GameLayOutBox from './GameLayOutBox';
import { useState } from 'react';
import GamePage from '../page/GamePage';
import DigitalDefender from './DigitDefender';

export default function EndGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [backGamePage, setBackGamePage] = useState(false);

  if (backGamePage) {
    return <GamePage />;
  }
  if (gameStarted) {
    return <DigitalDefender />;
  }

  return (
    <GameLayOutBox>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '80%',
          mx: 'auto',
          boxShadow: 1,
        }}
      >
        {/* Progress */}
        <Typography variant="caption" fontWeight={500} gutterBottom>
          Progress
        </Typography>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={100}
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
              right: 8,
              color: '#666',
              padding: '0.25rem',
            }}
          >
            100%
          </Typography>
        </Box>

        {/* Outcome */}
        <Typography variant="h6" fontWeight={700} mb={2}>
          Outcome
        </Typography>

        {/* Center Box */}
        <Paper
          elevation={0}
          sx={{
            border: '1px solid #ddd',
            borderRadius: '1rem',
            textAlign: 'center',
            padding: '2rem',
            mb: 4,
          }}
        >
          <Typography fontSize="3rem" mb={1}>
            🏆
          </Typography>
          <Typography fontWeight={700} fontSize="1.2rem" gutterBottom>
            You've completed Digital Defender!
          </Typography>
          <Typography color="text.secondary">
            You now have the tools to better protect yourself and help others online.
          </Typography>
        </Paper>

        {/* Chapter Stats */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
            textAlign: 'center',
            mb: 5,
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Chip
              label="1"
              sx={{
                backgroundColor: '#f8c4d0',
                color: '#fff',
                fontWeight: 700,
                mb: 1,
              }}
            />
            <Typography fontSize="0.9rem">Chapter Completed</Typography>
          </Box>
          <Box>
            <Chip
              label="3"
              sx={{
                backgroundColor: '#90caf9',
                color: '#fff',
                fontWeight: 700,
                mb: 1,
              }}
            />
            <Typography fontSize="0.9rem">Skills Unlocked</Typography>
          </Box>
          <Box>
            <Chip
              label="1"
              sx={{
                backgroundColor: '#f89b5e',
                color: '#fff',
                fontWeight: 700,
                mb: 1,
              }}
            />
            <Typography fontSize="0.9rem">Badge Earned</Typography>
          </Box>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Button
            onClick={() => setGameStarted(true)}
            variant="contained"
            sx={{
              backgroundColor: '#f89b5e',
              borderRadius: '25px',
              paddingX: '2rem',
              paddingY: '0.6rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            Play Again
          </Button>
          <Button
            onClick={() => setBackGamePage(true)}
            variant="contained"
            sx={{
              backgroundColor: '#f89b5e',
              borderRadius: '25px',
              paddingX: '2rem',
              paddingY: '0.6rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 2,
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            Go back to Game page
          </Button>
        </Box>
      </Box>
    </GameLayOutBox>
  );
}
