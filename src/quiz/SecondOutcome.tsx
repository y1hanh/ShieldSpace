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
import GameLayOutBox from '../component/GameLayOutBox';
import FirstOutcome from './FirstOutcome';
import { useState } from 'react';
import EndReflection from './EndReflection';

interface Avatar {
  emoji: string;
  label: string;
}

interface SecondOutcomeProps {
  playerName: string;
  avatar: Avatar;
}

export default function SecondOutcome({ playerName, avatar }: SecondOutcomeProps) {
  const [backButton, setBackButton] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  if (backButton) {
    return <FirstOutcome playerName={playerName} avatar={avatar} />;
  }
  if (gameStarted) {
    return <EndReflection playerName={playerName} avatar={avatar} />;
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
            value={90}
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
            90%
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
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              You chose to message your friend
            </Typography>
            <List dense>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="✅ Your friend feels supported." />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="✅ They thank you for checking in." />
              </ListItem>
            </List>
          </Box>

          {/* Message bubble */}
          <Box
            sx={{
              backgroundColor: '#e3f2fd',
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              fontStyle: 'italic',
              border: '1px solid #90caf9',
              position: 'relative',
              maxWidth: '300px',
              fontSize: '0.9rem',
            }}
          >
            <Typography>
              Hey, I saw that mean comment. Are you okay? I'm here if you want to talk. 💙
            </Typography>
            <Box
              sx={{
                position: 'absolute',
                bottom: '-10px',
                left: '20px',
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '10px solid #e3f2fd',
              }}
            />
          </Box>
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
