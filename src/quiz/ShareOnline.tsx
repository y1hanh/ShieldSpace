import { useState } from 'react';
import { Box, Typography, Button, LinearProgress } from '@mui/material';
import GameLayOutBox from '../component/GameLayOutBox';
import AvatarSelect from './AvatarSelect';
import PostBully from './PostBully';

interface Avatar {
  emoji: string;
  label: string;
}

interface ShareOnlineProps {
  playerName: string;
  avatar: Avatar;
}

const options = [
  { emoji: '🧍‍♀️', label: 'A Selfie' },
  { emoji: '🍕', label: 'A Photo of Food' },
  { emoji: '🐾', label: 'A Picture of your pet' },
];

export default function ShareOnline({ playerName, avatar }: ShareOnlineProps) {
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

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
            mb: 4,
          }}
        >
          {options.map(({ emoji, label }) => (
            <Box
              key={label}
              onClick={() => setSelected(label)}
              sx={{
                width: { xs: '100%', sm: '30%' },
                textAlign: 'center',
                padding: '1.5rem',
                borderRadius: '1rem',
                border: selected === label ? '2px solid #90caf9' : '1px solid #ddd',
                backgroundColor: selected === label ? '#e3f2fd' : '#fff',
                cursor: 'pointer',
                transition: '0.2s ease',
                boxShadow: selected === label ? 4 : 1,
              }}
            >
              <Typography fontSize="2.5rem">{emoji}</Typography>
              <Typography fontWeight={600}>{label}</Typography>
            </Box>
          ))}
        </Box>

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
