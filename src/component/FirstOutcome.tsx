import {
  Box,
  Typography,
  Button,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import GameLayOutBox from './GameLayOutBox';
import PostBully from './PostBully';
import SecondOutcome from './SecondOutcome';
import { useState } from 'react';

export default function FirstOutcome({ playerName, avatar }) {
  const [backButton, setBackButton] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  if (backButton) {
    return <PostBully playerName={playerName} avatar={avatar} />;
  }
  if (gameStarted) {
    return <SecondOutcome playerName={playerName} avatar={avatar} />;
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
            value={70}
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
            70%
          </Typography>
        </Box>

        {/* Outcome Title */}
        <Typography variant="h6" fontWeight={700} mb={2}>
          Outcome
        </Typography>

        {/* Outcome Box */}
        <Paper
          elevation={1}
          sx={{
            padding: '1.5rem',
            borderLeft: '5px solid #90caf9',
            backgroundColor: '#f9f9f9',
            mb: 4,
          }}
        >
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            You chose to report the bullies
          </Typography>
          <List dense>
            <ListItem sx={{ py: 0 }}>
              <ListItemText primary="✅ The comments get removed." />
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <ListItemText primary="🔷 The users are warned/banned." />
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <ListItemText primary="🔷 You feel safer." />
            </ListItem>
          </List>
        </Paper>

        {/* Navigation Buttons */}
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
