import { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Chip, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useAssessment } from '../slice/assessmentSlice';

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

const MessageAnalysis = () => {
  const { userInput, analysisResult } = useAssessment();
  interface AnalysisData {
    emotions: Record<string, number>;
    toxicity: { toxic: number };
    trigger_emotion: string;
  }

  const [data, setData] = useState<AnalysisData | null>(null);
  const [text, setText] = useState('');

  useEffect(() => {
    const user_input = userInput;
    const stored = analysisResult;
    if (stored && user_input) {
      const parsed = JSON.parse(stored);
      setData(parsed.analysis);
      setText(user_input);
    }
  }, []);

  if (!data) return null;

  const { emotions, toxicity, trigger_emotion } = data;
  const toxicLevel = toxicity?.toxic || 0;
  const isBullying = toxicLevel > 0.1;

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
        borderRadius: '1rem',
        p: 2,
        maxWidth: '900px',
        mx: 'auto',
      }}
    >
      {/* Message */}
      <Typography fontSize="0.95rem" color="text.secondary" mb={0.5} textAlign="left">
        Message Analyzed:
      </Typography>
      <Typography fontSize="0.95rem" color="text.secondary" mb={2} textAlign="left" pl={2}>
        "{text}"
      </Typography>

      {/* Bullying Detection */}
      <Box
        sx={{
          backgroundColor: isBullying ? '#FFEBEB' : '#ECFDF5',
          borderRadius: '10px',
          p: 1.5,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {isBullying ? (
          <>
            <ErrorIcon sx={{ color: '#e53935' }} />
            <Typography color="#e53935" fontWeight={600}>
              It is probably bullying
            </Typography>
          </>
        ) : (
          <>
            <CheckCircleIcon sx={{ color: '#43a047' }} />
            <Typography color="#43a047" fontWeight={600}>
              You are not being bullied
            </Typography>
          </>
        )}
      </Box>

      {/* Emotion Analysis */}
      <Typography
        fontWeight={600}
        mb={1}
        textAlign="left"
        sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
      >
        Emotion Analysis:
      </Typography>
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
              mb: 1,
              justifyContent: 'space-between',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1, sm: 0 },
            }}
          >
            <Box
              sx={{
                width: { xs: '100%', sm: '120px' },
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mx: { xs: 0, sm: 1 },
                width: { xs: '100%', sm: 'auto' },
              }}
            >
              <LinearProgress
                variant="determinate"
                value={value * 100}
                sx={{
                  height: { xs: 15, sm: 10 },
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
                fontWeight: 500,
                color: labelColor,
                width: { xs: '100%', sm: '50px' },
                textAlign: { xs: 'center', sm: 'left' },
                fontSize: { xs: '0.7rem', sm: '0.9rem' },
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </Typography>
          </Box>
        );
      })}

      {/* Primary Emotion */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 },
        }}
      >
        <Typography fontWeight={600} sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
          Primary Emotion:
        </Typography>
        <Chip
          label={trigger_emotion}
          sx={{
            backgroundColor: isBullying ? '#EF4444' : '#10B981',
            color: 'white',
            ml: { xs: 0, sm: 1 },
            mt: { xs: 1, sm: 0 },
            fontWeight: 600,
            textTransform: 'capitalize',
            fontSize: { xs: '0.9rem', sm: '0.875rem' },
          }}
        />
      </Box>

      {/* Toxicity Section */}
      <Box mt={2} sx={{ textAlign: 'left' }}>
        <Typography fontWeight={600} mb={1}>
          Toxicity Analysis:
        </Typography>
        <Typography variant="body2" mb={1}>
          Toxicity Level:{' '}
          <span
            style={{
              color: isBullying ? '#e53935' : '#43a047',
              fontWeight: 600,
            }}
          >
            {isBullying ? 'Highly Concerning' : 'Not Concerning'}
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isBullying
            ? 'Detected Tags: Direct insult, Negative characterization'
            : 'Detected Tags: No critical flags'}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MessageAnalysis;
