import { useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Paper,
  Button,
  Divider,
  Tooltip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { AnalysisResultType } from '../../slice/assessmentSlice';
import { useNavigate } from 'react-router';

const getEmotionLevel = (score: number) => {
  if (score >= 0.6) return 'high';
  if (score >= 0.3) return 'medium';
  return 'low';
};

const getBarColor = (level: string, isBullying: boolean) => {
  if (isBullying) {
    if (level === 'high') return '#e53935'; // Red
    if (level === 'medium') return '#F9A77F'; // Orange
    return '#70C0F0'; // Light Blue
  } else {
    if (level === 'high') return '#10B981'; // Green
    return '#70C0F0'; // Light Blue
  }
};

const getLabelColor = (level: string, isBullying: boolean) => {
  if (level === 'high') return isBullying ? '#e53935' : '#10B981';
  if (level === 'medium') return isBullying ? '#F9A77F' : '#6B7280';
  return '#6B7280'; // Gray
};

type MessageAnalysisProps = {
  userInput: string;
  analysisResult: AnalysisResultType;
  resetAssessment: () => void;
  isBullying: boolean;
  next: () => void;
};

type WordToxicity = {
  word: string;
  toxicity: number;
};
export const MessageAnalysis = ({
  resetAssessment,
  analysisResult,
  userInput,
  isBullying,
  next,
}: MessageAnalysisProps) => {
  const [data, setData] = useState<AnalysisResultType | null>(null);
  const [textTriggers, setTextTriggers] = useState<WordToxicity[]>(null);
  const [isToxic, setIsToxic] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();
  useEffect(() => {
    if (userInput && analysisResult) {
      setData(analysisResult);
      const temp = [];
      userInput.split(' ').forEach(word => {
        const val = analysisResult.triggers?.toxic_triggers?.find(w => w[0].includes(word));
        if (val) {
          temp.push({ word, toxicity: val[1] });
          setIsToxic(true);
        } else {
          temp.push({ word, toxicity: 0 });
        }
      });
      setTextTriggers(temp);
    }
  }, [analysisResult, userInput]);

  if (!data) return null;

  const { emotions, trigger_emotion, bias } = data;

  const emotionEntries = Object.entries(emotions || {}).filter(([key]) => key !== 'toxic_level');

  const sortedEmotions = emotionEntries
    .map(([key, value]) => ({ name: key, value: value as number }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <Paper
      elevation={2}
      sx={{
        backgroundColor: '#F7FAFD',
        pb: 5,
        width: '100%',
        opacity: 0,
        animation: 'fadeIn 1s ease-in forwards',
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
          p: { xs: 3, md: 4 },
          mb: 3,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '150px',
            height: '150px',
            background:
              'radial-gradient(circle, rgba(167, 139, 250, 0.3) 0%, rgba(167, 139, 250, 0) 70%)',
            borderRadius: '50%',
            transform: 'translate(30%, -30%)',
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
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
            Message Analysis
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'var(--text-body)',
              textAlign: 'center',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            We've carefully analyzed your message to identify emotional tones, potential
            cyberbullying indicators, and other important patterns that might affect how someone
            feels when reading it.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          px: { xs: 5, md: 12, lg: 15 },
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
        }}
      >
        {/* Message */}
        <Typography variant="h6" color="primary" fontWeight="600" mb={2}>
          Message Analyzed:
        </Typography>

        {isToxic && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 1,
              color: 'text.secondary',
              backgroundColor: 'rgba(255, 244, 229, 0.8)',
              p: 1,
              borderRadius: '4px',
              border: '1px dashed #FFB74D',
              fontWeight: 500,
            }}
          >
            <span role="img" aria-label="info">
              ℹ️
            </span>{' '}
            Hover over{' '}
            <span style={{ color: '#eb4034', fontWeight: 600, textDecoration: 'underline dotted' }}>
              highlighted words
            </span>{' '}
            to see their toxicity level
          </Typography>
        )}

        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 3,
            pl: 2,
            py: 2,
            backgroundColor: 'rgba(75, 64, 114, 0.05)',
            borderRadius: '8px',
            borderLeft: '3px solid var(--text-title)',
            fontStyle: 'italic',
          }}
        >
          "{' '}
          {textTriggers &&
            textTriggers.map(word => {
              return word.toxicity > 0 ? (
                <Tooltip
                  key={word.word}
                  title={`Toxicity: ${Math.round(word.toxicity * 100)}%`}
                  arrow
                  placement="top"
                >
                  <span
                    style={{
                      color: '#eb4034',
                      fontWeight: 600,
                      padding: '2px 4px',
                      borderRadius: '4px',
                      cursor: 'help',
                      backgroundColor: 'rgba(235, 64, 52, 0.1)',
                      border: '1px dotted #eb4034',
                      position: 'relative',
                      textDecoration: 'underline dotted',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(235, 64, 52, 0.2)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = 'rgba(235, 64, 52, 0.1)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {word.word}
                  </span>
                </Tooltip>
              ) : (
                <span key={word.word} style={{ color: '#000', marginRight: '4px' }}>
                  {word.word}
                </span>
              );
            })}
          "
        </Typography>

        {/* Bullying Detection */}
        <Box
          sx={{
            backgroundColor: isBullying ? '#FFEBEB' : '#ECFDF5',
            borderRadius: '10px',
            p: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          {isBullying ? (
            <>
              <ErrorIcon sx={{ color: '#e53935' }} />
              <Typography variant="subtitle1" color="#e53935" fontWeight={600}>
                😟 That wasn't a kind message.
              </Typography>
            </>
          ) : (
            <>
              <CheckCircleIcon sx={{ color: '#43a047' }} />
              <Typography variant="subtitle1" color="#43a047" fontWeight={600}>
                This message looks okay
              </Typography>
            </>
          )}
        </Box>

        {/* Two-column layout for analysis sections */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            mt: 3,
          }}
        >
          {/* Left Column - Emotion Analysis */}
          <Box
            sx={{
              flex: { xs: '100%', md: '50%' },
              gap: 3,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Bias/Prejudice Section - Full width below */}
            {bias && Object.keys(bias).length > 0 && (
              <Box
                sx={{
                  p: 3,
                  backgroundColor: isBullying
                    ? 'rgba(254, 226, 226, 0.5)'
                    : 'rgba(209, 250, 229, 0.5)',
                  borderRadius: '12px',
                  border: `1px solid ${isBullying ? '#FECACA' : '#A7F3D0'}`,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  mb={2}
                  color="#92400E"
                  sx={{
                    borderBottom: `2px solid ${isBullying ? '#FCA5A5' : '#6EE7B7'}`,
                    pb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <span role="img" aria-label="warning">
                    ⚠️
                  </span>{' '}
                  Prejudice Detection
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    backgroundColor: 'white',
                    p: 2,
                    borderRadius: '8px',
                  }}
                >
                  {Object.entries(bias).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      sx={{
                        backgroundColor: '#ffcdd2',
                        color: '#c62828',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        borderRadius: '25px',
                        padding: '10px',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )}
            <Box
              sx={{
                p: 3,
                backgroundColor: 'rgba(236, 239, 251, 0.5)',
                borderRadius: '12px',
                border: '1px solid #E0E7FF',
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                mb={3}
                color="primary"
                sx={{
                  borderBottom: '2px solid #CBD5E1',
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <span role="img" aria-label="emotions">
                  🔍
                </span>{' '}
                Emotion Analysis
              </Typography>

              <Box sx={{ mb: 2 }}>
                {sortedEmotions.map(({ name, value }) => {
                  const level = getEmotionLevel(value);
                  const barColor = getBarColor(level, isBullying);
                  const labelColor = getLabelColor(level, isBullying);
                  return (
                    <Box
                      key={name}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2,
                        justifyContent: 'space-between',
                        backgroundColor: 'white',
                        p: 1.5,
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                        '&:hover': {
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                        },
                      }}
                    >
                      <Box sx={{ width: '120px', textAlign: 'left' }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: labelColor,
                            textTransform: 'capitalize',
                          }}
                        >
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </Typography>
                      </Box>
                      <Box sx={{ flexGrow: 1, mx: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={value * 100}
                          sx={{
                            height: 8,
                            borderRadius: '5px',
                            backgroundColor: '#f1f1f1',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: barColor,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 600,
                          color: labelColor,
                          width: '50px',
                          textAlign: 'center',
                        }}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          {/* Right Column - Primary Emotion, Toxicity, and Button */}
          <Box
            sx={{
              flex: { xs: '100%', md: '50%' },
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* Primary Emotion Card */}
            <Box
              sx={{
                p: 3,
                backgroundColor: 'rgba(236, 239, 251, 0.5)',
                borderRadius: '12px',
                border: '1px solid #E0E7FF',
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                mb={3}
                color="primary"
                sx={{
                  borderBottom: '2px solid #CBD5E1',
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Primary Emotion
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  p: 2,
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                }}
              >
                <Typography variant="body1" fontWeight={600} mr={1}>
                  Main feeling detected:
                </Typography>
                <Chip
                  label={trigger_emotion}
                  sx={{
                    backgroundColor: isBullying ? '#EF4444' : '#10B981',
                    color: 'white',
                    ml: 1,
                    fontWeight: 600,
                    textTransform: 'capitalize',
                    fontSize: '1rem',
                    py: 2,
                  }}
                />
              </Box>
            </Box>

            {/* Toxicity Analysis Card */}
            <Box
              sx={{
                p: 3,
                backgroundColor: isBullying
                  ? 'rgba(254, 226, 226, 0.5)'
                  : 'rgba(209, 250, 229, 0.5)',
                borderRadius: '12px',
                border: `1px solid ${isBullying ? '#FECACA' : '#A7F3D0'}`,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={600}
                mb={3}
                color={isBullying ? '#B91C1C' : '#047857'}
                sx={{
                  borderBottom: `2px solid ${isBullying ? '#FCA5A5' : '#6EE7B7'}`,
                  pb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <span role="img" aria-label="toxicity">
                  {isBullying ? '⚠️' : '✅'}
                </span>{' '}
                Toxicity Analysis
              </Typography>

              <Typography
                variant="body1"
                mb={2}
                sx={{
                  backgroundColor: 'white',
                  p: 2,
                  borderRadius: '8px',
                  fontWeight: 500,
                }}
              >
                Toxicity Level:{' '}
                <span
                  style={{
                    color: isBullying ? '#e53935' : '#43a047',
                    fontWeight: 700,
                  }}
                >
                  {isBullying ? 'Highly Concerning' : 'Not Concerning'}
                </span>
              </Typography>

              <Box
                sx={{
                  backgroundColor: 'white',
                  p: 2,
                  borderRadius: '8px',
                }}
              >
                <Typography variant="body2" mb={1} fontWeight={500}>
                  {isBullying ? '🚩 Detected Tags:' : '👍 Detected Tags:'}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {isBullying ? (
                    <>
                      <Chip
                        label="Direct insult"
                        size="small"
                        sx={{
                          backgroundColor: '#ffcdd2',
                          color: '#c62828',
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        label="Negative characterization"
                        size="small"
                        sx={{
                          backgroundColor: '#ffcdd2',
                          color: '#c62828',
                          fontWeight: 600,
                        }}
                      />
                    </>
                  ) : (
                    <Chip
                      label="No critical flags"
                      size="small"
                      sx={{
                        backgroundColor: '#c8e6c9',
                        color: '#2e7d32',
                        fontWeight: 600,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Button to bottom of right column */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            mt: 'auto',
            pt: 2,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={resetAssessment}
            startIcon={<RestartAltIcon />}
            sx={{
              backgroundColor: 'var(--highlight)',
              color: 'white',
              borderRadius: '25px',
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            Analyze Another Message
          </Button>

          {/* redirect to the /resources page */}
          {!isBullying &&
            <Button
              variant="contained"
              onClick={() => navigate('/resources')}
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
              Explore Scenarios
            </Button>
          }
        </Box>
      </Box>
    </Paper>
  );
};
