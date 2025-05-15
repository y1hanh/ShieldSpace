import { Paper, Box, Typography, List, ListItem, ListItemText, Button, Fade } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../animations/loading_animation.json';
import { useState, useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAssessment } from '../../slice/assessmentSlice';
import { icons } from './icons';

export function ActionPlan() {
  const [loading, setLoading] = useState<LoadingStateType>('loading');
  const { actionPlan } = useAssessment();
  const [activeView, setActiveView] = useState<'immediate' | 'longTerm'>('immediate');

  useEffect(() => {
    if (actionPlan && actionPlan !== 'error') {
      setLoading('loaded');
    }
    if (actionPlan === 'error') {
      setLoading('error');
    }
  }, [actionPlan]);

  const simplifyText = (text: string) => {
    const parts = text.split(':');
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
      {loading != 'loaded' ? (
        <LoadingActionPlan loadingState={loading} />
      ) : (
        <Box>
          <Typography
            variant="h5"
            sx={{
              color: 'var(--text-title)',
              fontWeight: 'bold',
              mb: 2,
              fontSize: '1.5rem',
            }}
          >
            Your Awesome Action Plan!
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'var(--text-body)',
              mb: 2,
              fontSize: '1rem',
            }}
          >
            These ideas can help you feel better now and grow stronger in the future!
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
                    activeView === 'immediate' ? 'var(--highlight)' : 'rgba(255, 152, 0, 0.1)',
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
                  backgroundColor: 'var(--highlight)',
                  color: 'white',
                  py: 1,
                  px: 2,
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                ⚡ Things You Can Do Right Now
              </Typography>

              <List sx={{ bgcolor: '#FFF9C4', borderRadius: '0.5rem', mt: 1 }}>
                {actionPlan['immediate-action'].map((action, index) => {
                  const { instruction, quote } = simplifyText(action);
                  return (
                    <ListItem key={index} alignItems="flex-start" sx={{ py: 1 }}>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                            }}
                          >
                            {index <= 3
                              ? icons['immediate-action'][index]
                              : icons['immediate-action'][0]}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                              {instruction}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography sx={{ fontSize: '0.9rem', ml: 4 }}>{quote}</Typography>
                        }
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
                    backgroundColor: 'var(--highlight-secondary)',
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
                  backgroundColor: 'var(--highlight-secondary)',
                  color: 'white',
                  py: 1,
                  px: 2,
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}
              >
                🌱 Super Skills to Grow
              </Typography>

              <List sx={{ bgcolor: '#E8F5E9', borderRadius: '0.5rem', mt: 1 }}>
                {actionPlan['long-term-skills'].map((skill, index) => {
                  const { instruction, quote } = simplifyText(skill);
                  return (
                    <ListItem key={index} alignItems="flex-start" sx={{ py: 1 }}>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1.5,
                            }}
                          >
                            {index <= 3
                              ? icons['long-term-skills'][index]
                              : icons['long-term-skills'][0]}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                              {instruction}
                            </Typography>
                          </Box>
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
                    backgroundColor: 'var(--highlight)',
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

type LoadingStateType = 'loading' | 'loaded' | 'error';

function LoadingActionPlan({ loadingState }: { loadingState: LoadingStateType }) {
  return loadingState == 'loading' ? (
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
  ) : (
    loadingState == 'error' && (
      <Box>
        <Typography variant="h5" color="var(--text-title)" mb={0.5} textAlign="left">
          Oops! Something went wrong while fetching your action plan.
        </Typography>
        <Typography variant="body1" color="var(--text-subtitle)" mb={2} textAlign="left">
          Please try again later.
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
    )
  );
}
