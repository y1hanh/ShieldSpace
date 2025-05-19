import {
  Paper,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
} from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../animations/loading_animation.json';
import { useState, useEffect } from 'react';
import { useAssessment } from '../../slice/assessmentSlice';
import { icons } from './icons';
import { useNavigate } from 'react-router';

export function ActionPlan() {
  const [loading, setLoading] = useState<LoadingStateType>('loading');
  const { actionPlan } = useAssessment();
  const navigate = useNavigate();

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

  // Add this function to clean instruction text reliably
  const cleanInstruction = (text: string): string => {
    let cleaned = text.trim();

    const validFirstChar = /^[a-zA-Z0-9]/.test(cleaned);

    if (!validFirstChar && cleaned.length > 1) {
      cleaned = cleaned.slice(1).trim();
    }
    return cleaned;
  };

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: '#F7FAFD',
        width: '100%',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {loading != 'loaded' ? (
        <LoadingActionPlan loadingState={loading} />
      ) : (
        <Box>
          <Box
            sx={{
              background: 'linear-gradient(to right, #F5F3FF, #EEF2FF)',
              p: 2,
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'var(--text-title)',
                fontWeight: 'bold',
                mb: 2,
                textAlign: 'center',
                background: 'linear-gradient(90deg, #4B3F72 0%, #6A4CA7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
              }}
            >
              Your Support Plan
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'var(--text-body)',

                fontSize: { xs: '0.95rem', sm: '1rem' },
                textAlign: 'center',
              }}
            >
              These ideas can help you feel better now and grow stronger in the future.
            </Typography>
          </Box>

          <Box sx={{ px: { xs: 5, md: 12, lg: 15 }, mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: { xs: 4, md: 3 },
              }}
            >
              {/* Now Actions Section */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: '#FFA726',
                    color: 'white',
                    py: 1.5,
                    px: 2,
                    borderRadius: '0.5rem 0.5rem 0 0',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>⚡</span> Things You Can Do Right Now
                </Typography>

                <List
                  sx={{
                    backgroundColor: '#FFF8E1',
                    border: '1px solid #FFE0B2',
                    borderTop: 'none',
                    borderRadius: '0 0 0.5rem 0.5rem',
                    mt: 0,
                    p: { xs: 2, sm: 3 },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  {actionPlan['immediate-action'].slice(0, 3).map((action, index) => {
                    const { instruction, quote } = simplifyText(action);
                    return (
                      <ListItem
                        key={index}
                        alignItems="flex-start"
                        sx={{
                          py: 1.5,
                          px: { xs: 1, sm: 2 },
                          mb: 1.5,
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                          '&:last-child': {
                            mb: 0,
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              {icons['immediate-action'][index]}
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  fontSize: { xs: '0.9rem', sm: '1rem' },
                                  color: '#E65100',
                                }}
                              >
                                {instruction}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography
                              sx={{
                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                ml: { xs: 3, sm: 4 },
                                mt: 0.5,
                                color: '#616161',
                              }}
                            >
                              {cleanInstruction(quote)}
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>

              {/* Growth Skills Section */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    backgroundColor: '#66BB6A',
                    color: 'white',
                    py: 1.5,
                    px: 2,
                    borderRadius: '0.5rem 0.5rem 0 0',
                    fontWeight: 'bold',
                    fontSize: { xs: '1.1rem', sm: '1.2rem' },
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>🌱</span> Super Skills to Grow
                </Typography>

                <List
                  sx={{
                    backgroundColor: '#E8F5E9',
                    border: '1px solid #C8E6C9',
                    borderTop: 'none',
                    borderRadius: '0 0 0.5rem 0.5rem',
                    mt: 0,
                    p: { xs: 2, sm: 3 },
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}
                >
                  {/* Only show first 3 items initially */}
                  {actionPlan['long-term-skills'].slice(0, 3).map((skill, index) => {
                    const { instruction, quote } = simplifyText(skill);
                    return (
                      <ListItem
                        key={index}
                        alignItems="flex-start"
                        sx={{
                          py: 1.5,
                          px: { xs: 1, sm: 2 },
                          mb: 1.5,
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                          '&:last-child': {
                            mb: 0,
                          },
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                              }}
                            >
                              {index <= 3
                                ? icons['long-term-skills'][index]
                                : icons['long-term-skills'][0]}
                              <Typography
                                sx={{
                                  fontWeight: 'bold',
                                  fontSize: { xs: '0.9rem', sm: '1rem' },
                                  color: '#2E7D32',
                                }}
                              >
                                {instruction}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography
                              sx={{
                                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                ml: { xs: 3, sm: 4 },
                                mt: 0.5,
                                color: '#616161',
                              }}
                            >
                              {quote}
                            </Typography>
                          }
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Box>
            </Box>
          </Box>

          <Divider />

          <Box
            sx={{
              p: { xs: 3, sm: 4, md: 6 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'var(--text-title)',
                fontWeight: 'bold',
                mb: 2,
                fontSize: { xs: '1.3rem', sm: '1.5rem' },
              }}
            >
              Tell Us How You're Feeling
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 2,
                mb: 2,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                lineHeight: 1.6,
                maxWidth: '100%', // Full width on mobile
              }}
            >
              We want to understand how this message made you feel so we can support you better.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                lineHeight: 1.6,
                maxWidth: '100%',
              }}
            >
              Just answer a few simple questions, and we'll create a plan that helps you feel
              stronger and more in control.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate('/cyber-safety-quiz')}
              sx={{
                backgroundColor: '#6A4CA7',
                color: 'white',
                borderRadius: '30px',
                px: 4,
                py: 1.2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                boxShadow: '0 4px 12px rgba(106, 76, 167, 0.3)',
                '&:hover': {
                  backgroundColor: '#59359e',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Next: Personalise My Support Plan
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

type LoadingStateType = 'loading' | 'loaded' | 'error';

function LoadingActionPlan({ loadingState }: { loadingState: LoadingStateType }) {
  return loadingState == 'loading' ? (
    <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
