import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Fade,
} from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../animations/loading_animation.json';
import { useState, useEffect } from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import BlockIcon from '@mui/icons-material/Block';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export function ActionPlan({ userInput }: { userInput: string }) {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<'immediate' | 'longTerm'>('immediate');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const mockData = {
    'immediate-action': [
      'Acknowledge Feelings: "It\'s okay to feel upset or angry about this message. Your feelings are valid."',
      'Self-Compassion: "Remember, this person\'s words don\'t define your worth or abilities. You are capable and valuable."',
      'Take a Break: "Step away from the screen. Do something you enjoy, like listening to music or talking to someone you trust."',
      'Report/Block: "Report the comment to the platform and block the user to prevent further interaction."',
    ],
    'long-term-skills': [
      'Challenge Negative Thoughts: "Recognize that stereotypes are harmful and untrue. Challenge the idea that girls shouldn\'t code by focusing on your own skills and interests."',
      'Build Confidence: "Celebrate your achievements in coding and focus on your strengths. Surround yourself with supportive people who believe in you."',
      'Develop Assertiveness: "Practice expressing your thoughts and feelings respectfully. Learn to stand up for yourself and others when faced with discrimination."',
      'Seek Support: "Connect with online communities of female coders for encouragement and mentorship. Talk to trusted adults about your experiences."',
    ],
  };

  const immediateIcons = [
    <EmojiEmotionsIcon sx={{ color: '#FF9800' }} />,
    <FavoriteIcon sx={{ color: '#E91E63' }} />,
    <SportsEsportsIcon sx={{ color: '#2196F3' }} />,
    <BlockIcon sx={{ color: '#F44336' }} />,
  ];

  const longTermIcons = [
    <PsychologyIcon sx={{ color: '#9C27B0' }} />,
    <EmojiEventsIcon sx={{ color: '#FFC107' }} />,
    <RecordVoiceOverIcon sx={{ color: '#4CAF50' }} />,
    <PeopleIcon sx={{ color: '#3F51B5' }} />,
  ];

  const simplifyText = (text: string) => {
    const parts = text.split(': "');
    const instruction = parts[0];
    const quote = parts.length > 1 ? parts[1].slice(0, -1) : '';

    return { instruction, quote };
  };

  const toggleView = () => {
    setActiveView(activeView === 'immediate' ? 'longTerm' : 'immediate');
  };

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: '#F7FAFD',
        borderRadius: '1rem',
        p: 4,
        width: {
          xs: '70%',
          sm: '90%',
        },
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {loading ? (
        <LoadingActionPlan />
      ) : (
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: '#4B4072',
              fontWeight: 'bold',
              mb: 2,
              fontSize: '1.5rem',
            }}
          >
            Your Awesome Action Plan!
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              variant={activeView === 'immediate' ? 'contained' : 'outlined'}
              sx={{
                mr: 1,
                borderRadius: '20px',
                backgroundColor: activeView === 'immediate' ? '#FF9800' : 'transparent',
                borderColor: '#FF9800',
                color: activeView === 'immediate' ? 'white' : '#FF9800',
                '&:hover': {
                  backgroundColor:
                    activeView === 'immediate' ? '#F57C00' : 'rgba(255, 152, 0, 0.1)',
                },
              }}
              onClick={() => setActiveView('immediate')}
            >
              Now Actions
            </Button>
            <Button
              variant={activeView === 'longTerm' ? 'contained' : 'outlined'}
              sx={{
                borderRadius: '20px',
                backgroundColor: activeView === 'longTerm' ? '#4CAF50' : 'transparent',
                borderColor: '#4CAF50',
                color: activeView === 'longTerm' ? 'white' : '#4CAF50',
                '&:hover': {
                  backgroundColor: activeView === 'longTerm' ? '#388E3C' : 'rgba(76, 175, 80, 0.1)',
                },
              }}
              onClick={() => setActiveView('longTerm')}
            >
              Growth Skills
            </Button>
          </Box>

          <Fade in={activeView === 'immediate'} timeout={500}>
            <Box sx={{ display: activeView === 'immediate' ? 'block' : 'none' }}>
              <Typography
                variant="h6"
                sx={{
                  backgroundColor: '#FF9800',
                  color: 'white',
                  py: 1,
                  px: 2,
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                ⚡ Things You Can Do Right Now ⚡
              </Typography>

              <List sx={{ bgcolor: '#FFF9C4', borderRadius: '0.5rem', mt: 1 }}>
                {mockData['immediate-action'].map((action, index) => {
                  const { instruction, quote } = simplifyText(action);
                  return (
                    <ListItem key={index} alignItems="flex-start" sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>{immediateIcons[index]}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                            {instruction}
                          </Typography>
                        }
                        secondary={<Typography sx={{ fontSize: '0.9rem' }}>{quote}</Typography>}
                      />
                    </ListItem>
                  );
                })}
              </List>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={toggleView}
                  sx={{
                    backgroundColor: '#4CAF50',
                    '&:hover': { backgroundColor: '#388E3C' },
                    borderRadius: '20px',
                  }}
                >
                  See Growth Skills
                </Button>
              </Box>
            </Box>
          </Fade>

          <Fade in={activeView === 'longTerm'} timeout={500}>
            <Box sx={{ display: activeView === 'longTerm' ? 'block' : 'none' }}>
              <Typography
                variant="h6"
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  py: 1,
                  px: 2,
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                🌱 Super Skills to Grow 🌱
              </Typography>

              <List sx={{ bgcolor: '#E8F5E9', borderRadius: '0.5rem', mt: 1 }}>
                {mockData['long-term-skills'].map((skill, index) => {
                  const { instruction, quote } = simplifyText(skill);
                  return (
                    <ListItem key={index} alignItems="flex-start" sx={{ py: 1 }}>
                      <ListItemIcon sx={{ minWidth: '40px' }}>{longTermIcons[index]}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                            {instruction}
                          </Typography>
                        }
                        secondary={<Typography sx={{ fontSize: '0.9rem' }}>{quote}</Typography>}
                      />
                    </ListItem>
                  );
                })}
              </List>

              <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  onClick={toggleView}
                  sx={{
                    backgroundColor: '#FF9800',
                    '&:hover': { backgroundColor: '#F57C00' },
                    borderRadius: '20px',
                  }}
                >
                  Back to Now Actions
                </Button>
              </Box>
            </Box>
          </Fade>
        </Box>
      )}
    </Paper>
  );
}

function LoadingActionPlan() {
  return (
    <Box>
      <Typography variant="h5" color="var(--text-title)" mb={0.5} textAlign="left">
        We are preparing your action plan...
      </Typography>
      <Lottie
        animationData={animationData}
        loop={true}
        style={{
          width: '100%',
          maxWidth: '400px',
          maxHeight: '300px',
        }}
      />
    </Box>
  );
}
