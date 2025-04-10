import { useState } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import axios from 'axios';
import PageLayoutBox from './PageLayOutBox';
import MessageAnalysis from './MessageAnalysis';

const API_BASE_URL = 'https://api.shieldspace.games/model';

export default function AssessmentTool() {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (trimmed.length < 3) {
      alert('Please enter at least 3 words.');
      return;
    }

    const hasNumber = /\d/.test(trimmed);
    if (hasNumber) {
      alert('Please avoid using numbers.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/emotions`, { user_input: trimmed });
      localStorage.setItem('analysisResult', JSON.stringify(response.data));
      localStorage.setItem('userInput', trimmed);
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

  return (
    <PageLayoutBox
      innerSx={{
        backgroundColor: '#FDF6EC',
        py: 6,
      }}
      header={
        <>
          <Typography variant="h4" fontWeight="bold" color="#1f2a40" mb={1}>
            Emotional Assessment Tool
          </Typography>
          {!submitted && (
            <Typography variant="h6" fontWeight="bold" color="#1f2a40" mb={4}>
              What was the hurtful message?
            </Typography>
          )}

          <Box
            sx={{
              backgroundColor: '#fff7f2',
              borderRadius: '20px',
              position: 'relative',
              p: 3,
              gap: 3,
              justifyContent: 'space-between',
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {submitted ? (
              <Box width="100%">
                <MessageAnalysis />
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={resetAssessment}
                    startIcon={<RestartAltIcon />}
                    sx={{
                      backgroundColor: '#f89b5e',
                      color: 'white',
                      borderRadius: '25px',
                      px: 4,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#f57c00',
                      },
                    }}
                  >
                    Analyze Again
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                      border: '1px solid #ddd',
                    }}
                  >
                    <TextField
                      fullWidth
                      placeholder="Type the message..."
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                      sx={{
                        fontSize: '1.1rem',
                      }}
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
                </Box>

                <Box
                  component="img"
                  src="/bear.png"
                  alt="sad bear"
                  sx={{
                    position: 'absolute',
                    right: {
                      xs: '-40px',
                      sm: '-120px',
                      md: '-120px',
                    },
                    bottom: {
                      xs: '0px',
                      sm: '-45px',
                      md: '-45px',
                    },
                    height: {
                      xs: '130px',
                      sm: '220px',
                      md: '220px',
                    },
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}
          </Box>
        </>
      }
    >
      <Box />
    </PageLayoutBox>
  );
}
