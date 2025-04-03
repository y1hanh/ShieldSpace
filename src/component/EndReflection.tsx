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
import { useState } from 'react';
import EndGame from './EndGame';

interface Avatar {
  emoji: string;
  label: string;
}

interface EndReflectionProps {
  playerName: string;
  avatar: Avatar;
}

export default function EndReflection({ playerName, avatar }: EndReflectionProps) {
  const [gameStarted, setGameStarted] = useState(false);

  if (gameStarted) {
    return <EndGame />;
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
            value={95}
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
            95%
          </Typography>
        </Box>

        {/* Title */}
        <Typography variant="h6" fontWeight={700} mb={2}>
          End of Chapter Reflection
        </Typography>

        {/* Reflection Box */}
        <Paper
          sx={{
            backgroundColor: '#fddbb3',
            borderRadius: '1rem',
            padding: '1.5rem',
            mb: 4,
          }}
        >
          <Typography fontWeight={700} gutterBottom color="#333333">
            Think About What You've Learned
          </Typography>
          <List dense sx={{ color: '#333333' }}>
            <ListItem sx={{ py: 0 }}>
              <ListItemText primary="• What strategy made you feel empowered?" />
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <ListItemText primary="• How can you help yourself or others online?" />
            </ListItem>
            <ListItem sx={{ py: 0 }}>
              <ListItemText primary="• What will you do differently next time?" />
            </ListItem>
          </List>
        </Paper>

        {/* Key Takeaways + Skills Badge */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            mb: 4,
          }}
        >
          {/* Takeaways */}
          <Box sx={{ flex: 1, minWidth: '250px' }}>
            <Typography fontWeight={700} mb={1} color="#333333">
              Key Takeaways:
            </Typography>
            <List dense sx={{ color: '#666666' }}>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Don't reply or respond — bullies thrive on the reactions they get from their victims." />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Save evidence of bullying messages or posts." />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Block users who are bullying you." />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Tell a trusted adult — you don't need to deal with bullies by yourself." />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <ListItemText primary="• Support your friends if they're being bullied — be there for them." />
              </ListItem>
            </List>
          </Box>

          {/* Skills Earned Badge */}
          <Box
            sx={{
              backgroundColor: '#f3f3f3',
              borderRadius: '50%',
              width: '120px',
              height: '120px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: { xs: 3, sm: 0 },
              boxShadow: 1,
            }}
          >
            <Typography fontSize="0.75rem" fontWeight={600} color="text.secondary">
              SKILLS
            </Typography>
            <Typography fontSize="0.75rem" fontWeight={600} color="text.secondary" mb={1}>
              EARNED
            </Typography>
            <Typography fontSize="1.5rem" sx={{ color: '#FF8B5E' }}>
              ✔️
            </Typography>
          </Box>
        </Box>

        {/* Finish Button */}
        <Box sx={{ textAlign: 'center' }}>
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
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            Finish
          </Button>
        </Box>
      </Box>
    </GameLayOutBox>
  );
}
