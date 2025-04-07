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
import { useState } from 'react';
import ShareOnline from './ShareOnline';
import EndReflection from './EndReflection';

export default function PostBully({ playerName, avatar }) {
  const [selected, setSelected] = useState('Report');
  const [backButton, setBackButton] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);

  if (backButton) {
    return <ShareOnline playerName={playerName} avatar={avatar} />;
  }

  if (gameStarted) {
    return <EndReflection />;
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
            onClick={() => {
              if (!showOutcome) setSelected(value);
            }}
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

        {showOutcome && (
          <Box sx={{ mt: 4 }}>
            {(selected === 'Report' || selected === 'Talk') && (
              <Paper
                elevation={1}
                sx={{
                  padding: '1.5rem',
                  borderLeft: '5px solid #a5d6a7',
                  backgroundColor: '#e8f5e9',
                  mb: 4,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  {selected === 'Report'
                    ? 'You chose to report the bullies'
                    : 'You chose to talk to a trusted adult'}
                </Typography>
                <List dense color="#666666">
                  {selected === 'Report' ? (
                    <>
                      <ListItem sx={{ py: 0 }}>
                        <ListItemText primary="✅ The comments get removed." />
                      </ListItem>
                      <ListItem sx={{ py: 0 }}>
                        <ListItemText primary="🔷 The users are warned/banned." />
                      </ListItem>
                      <ListItem sx={{ py: 0 }}>
                        <ListItemText primary="🔷 You feel safer." />
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem sx={{ py: 0 }}>
                        <ListItemText primary="✅ You get support from someone who cares." />
                      </ListItem>
                      <ListItem sx={{ py: 0 }}>
                        <ListItemText primary="🛡 An adult can help address the situation properly." />
                      </ListItem>
                      <ListItem sx={{ py: 0 }}>
                        <ListItemText primary="💪 You learn healthy ways to handle bullying." />
                      </ListItem>
                    </>
                  )}
                </List>
              </Paper>
            )}

            {selected === 'Fight' && (
              <Paper
                elevation={1}
                sx={{
                  padding: '1.5rem',
                  borderLeft: '5px solid #ef9a9a',
                  backgroundColor: '#ffebee',
                  mb: 4,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  You chose to fight back
                </Typography>
                <List dense color="#666666">
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText primary="⚠️ The situation may escalate further." />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText primary="💬 The bullies might target you more intensely." />
                  </ListItem>
                  <ListItem sx={{ py: 0 }}>
                    <ListItemText primary="😔 You could feel worse afterward." />
                  </ListItem>
                </List>
              </Paper>
            )}
          </Box>
        )}

        {/* Unified Button Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          {/* Previous button stays on the left */}
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

          {/* Conditional buttons */}
          {!showOutcome ? (
            // Submit button in the middle/right
            <Button
              onClick={() => setShowOutcome(true)}
              disabled={!selected}
              variant="contained"
              sx={{
                ml: 'auto', // push to the right
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
              Submit
            </Button>
          ) : (
            // Try other responses + Next on the right
            <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
              <Button
                variant="contained"
                onClick={() => {
                  setShowOutcome(false);
                  setSelected(null);
                }}
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
                {selected === 'Fight' ? 'Try again' : 'Try other responses'}
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  setGameStarted(true);
                }}
                disabled={selected === 'Fight'}
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
          )}
        </Box>
      </Box>
    </GameLayOutBox>
  );
}
