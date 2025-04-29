import { useState } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PageLayoutBox from './PageLayOutBox';
import MessageAnalysis from './MessageAnalysis';
import { getEmotions } from '../api';
import { useAssessment } from '../slice/assessmentSlice';
import { useNavigate } from 'react-router';
import QuizIcon from '@mui/icons-material/Quiz';

export default function AssessmentTool() {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { setUserInput, setAnalysisResult } = useAssessment();

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (trimmed.length < 3) {
      alert('Please enter at least 3 words.');
      return;
    }

    try {
      const response = await getEmotions({ user_input: trimmed });
      setUserInput(trimmed);
      setAnalysisResult(JSON.stringify(response));
      setInput('');
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit', err);
      alert('Submission failed.');
    }
  };

  const resetAssessment = () => {
    localStorage.removeItem('analysisResult');
    localStorage.removeItem('userInput');
    setInput('');
    setSubmitted(false);
  };

  const handleStartQuiz = () => {
    navigate('/CyberSafetyQuiz');
  };

  return (
    <PageLayoutBox
      id="assessment"
      innerSx={{
        backgroundColor: '#F0F6FA',
        width: '1200px',
        borderRadius: '12px',
        py: 6,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          transform: 'translateY(-4px)',
          backgroundColor: '#e6f0f8',
        },
      }}
      header={
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="#4B4072" mb={4} textAlign="center">
            Assessment Tool
          </Typography>
          {!submitted && (
            <Typography fontSize="16px" color="#555555" mb={4} textAlign="center">
              Paste the message you received to see if it is bullying.
            </Typography>
          )}

          {submitted ? (
            <Box width="100%">
              <MessageAnalysis resetAssessment={resetAssessment} />
              <Typography
                variant="h6"
                fontWeight="bold"
                color="text.primary"
                textAlign="center"
                sx={{ mt: 4 }}
              />
              🎯 Ready to discover your emotional superpowers?
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  onClick={handleStartQuiz}
                  startIcon={<QuizIcon />}
                  sx={{
                    backgroundColor: '#6A4CA7',
                    color: 'white',
                    borderRadius: '25px',
                    px: 4,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#59359e',
                    },
                  }}
                >
                  Start Quiz
                </Button>
              </Box>
              <Button
                onClick={() => {
                  window.location.href = '/';
                }}
                sx={{
                  mt: 2,
                  background: 'none',
                  color: '#7C4DFF',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  textDecoration: 'underline',
                  '&:hover': {
                    color: '#5E35B1',
                    background: 'transparent',
                  },
                }}
              >
                👉 Not ready? That’s totally okay — you can always come back later. Let’s explore
                more together!
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                width: '100%',
                maxWidth: '700px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                px: 2,
                py: 1,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <TextField
                fullWidth
                placeholder="Paste the message or comment here..."
                variant="standard"
                slotProps={{ input: { disableUnderline: true } }}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                sx={{ fontSize: '1.1rem' }}
              />
              <IconButton
                onClick={handleSubmit}
                sx={{
                  backgroundColor: '#f89b5e',
                  color: 'white',
                  ml: 1,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: '#f57c00',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Box>
          )}

          {!submitted && (
            <Typography
              fontSize="14px"
              color="#555555"
              mt={4}
              sx={{ fontStyle: 'italic', textAlign: 'center' }}
            >
              We'll help you understand if this is cyberbullying and suggest ways to respond.
            </Typography>
          )}
        </Box>
      }
    >
      <Box />
    </PageLayoutBox>
  );
}
