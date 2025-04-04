import { useState } from 'react';
import { Box, Typography, Button, LinearProgress, Alert } from '@mui/material';
import GameLayOutBox from '../component/GameLayOutBox';
import ShareOnline from './ShareOnline';

interface Avatar {
  emoji: string;
  label: string;
}

interface AvatarSelectProps {
  playerName: string;
  avatar?: Avatar;
}

const avatars = [
  { emoji: '🐱', label: 'Kitten' },
  { emoji: '🐶', label: 'Puppy' },
  { emoji: '🦊', label: 'Fox' },
  { emoji: '🐰', label: 'Bunny' },
];

export default function AvatarSelect({ playerName, avatar }: AvatarSelectProps) {
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

        
        <Box
  sx={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
    mb: 4,
  }}
>
  {avatars.map(({ emoji, label }) => (
    <Box
      key={label}
      onClick={() => {
        setSelected({ emoji, label });
        setError(false);
      }}
      sx={{
        width: { xs: '100%', sm: '40%', md: '25%' },
        textAlign: 'center',
        padding: '3rem',
        borderRadius: '1rem',
        border: selected?.label === label ? '2px solid #90caf9' : '1px solid #ddd',
        backgroundColor: selected?.label === label ? '#e3f2fd' : '#fff',
        cursor: 'pointer',
        transition: '0.2s ease',
        boxShadow: selected?.label === label ? 4 : 1,
      }}
    >
      <Typography fontSize="2.5rem">{emoji}</Typography>
      <Typography fontWeight={600}>{label}</Typography>
    </Box>
  ))}
</Box>

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
