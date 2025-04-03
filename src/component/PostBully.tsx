import { Box, Typography, Button, LinearProgress, Paper, List, ListItem } from '@mui/material';
import GameLayOutBox from './GameLayOutBox';
import { useState } from 'react';
import ShareOnline from './ShareOnline';
import FirstOutcome from './FirstOutcome';

export default function PostBully({ playerName, avatar }) {
  const [selected, setSelected] = useState('Report');
  const [backButton, setBackButton] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  if (backButton) {
    return <ShareOnline playerName={playerName} avatar={avatar} />;
  }

  if (gameStarted) {
    return <FirstOutcome playerName={playerName} avatar={avatar} />;
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
            value={60}
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
            60%
          </Typography>
        </Box>

        {/* Title */}
        <Typography fontWeight={700} mb={2}>
          Post Bully
        </Typography>

        {/* Social Media Post */}
        <Paper
          elevation={1}
          sx={{
            padding: '1.5rem',
            border: '1px solid #ccc',
            borderRadius: '1rem',
            mb: 4,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography fontSize="1.5rem" mr={1}>
              {avatar?.emoji}
            </Typography>
            <Typography fontWeight={600}>{playerName}</Typography>
          </Box>
          <Typography mb={2}>Just enjoying my weekend! #weekend #fun</Typography>
          <Box
            sx={{
              backgroundColor: '#eee',
              height: '200px',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Typography color="text.secondary">Post photo</Typography>
          </Box>

          {/* Comments */}
          <Typography fontWeight={600} mb={1}>
            Comments:
          </Typography>
          <List>
            <ListItem
              sx={{
                backgroundColor: '#d6ecff',
                borderRadius: '0.5rem',
                mb: 1,
              }}
            >
              FriendlyUser: Looking good! Have a great weekend!
            </ListItem>
            <ListItem
              sx={{
                backgroundColor: '#fddde0',
                borderRadius: '0.5rem',
                mb: 1,
              }}
            >
              Bully1: You're too ugly to post this.
            </ListItem>
            <ListItem
              sx={{
                backgroundColor: '#fddde0',
                borderRadius: '0.5rem',
              }}
            >
              Bully2: Go back to your country.
            </ListItem>
          </List>
        </Paper>

        {/* Prompt */}
        <Typography fontWeight={600} mb={2}>
          You feel hurt and confused. What will you do?
        </Typography>

        {/* Options */}
        {[
          { label: 'Fight Back - Respond with an angry comment', icon: '🥊', value: 'Fight' },
          { label: 'Report - Report the abusive comments', icon: '🚩', value: 'Report' },
          {
            label: 'Talk to a Trusted Adult - Speak to a parent or teacher',
            icon: '🧑‍🏫',
            value: 'Talk',
          },
        ].map(({ label, icon, value }) => (
          <Box
            key={value}
            onClick={() => setSelected(value)}
            sx={{
              padding: '1rem',
              borderRadius: '25px',
              border: selected === value ? '2px solid #90caf9' : '1px solid #ccc',
              backgroundColor: selected === value ? '#e3f2fd' : '#f6f6f6',
              cursor: 'pointer',
              mb: 2,
              transition: '0.2s',
            }}
          >
            <Typography>
              {icon} {label}
            </Typography>
          </Box>
        ))}

        {/* Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
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
