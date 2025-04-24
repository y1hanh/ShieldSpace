import { useState } from 'react';
import { Box, Typography, TextField, IconButton, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PageLayoutBox from './PageLayOutBox';
import MessageAnalysis from './MessageAnalysis';
import { getEmotions } from '../api';
import { useAssessment } from '../slice/assessmentSlice';

export default function AssessmentTool() {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <PageLayoutBox
      id="assessment"
      innerSx={{
        backgroundColor: '#F0F6FA',
        py: 6,
      }}
      header={
        <>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#4B4072"
            mb={4}
          
          >
            Assessment Tool
          </Typography>
          {!submitted && (
            <Typography fontSize="16px" color="#555555" mb={4}>
              Pasta the message you received to see if it is bullying.
            </Typography>
          )}

          <Box
            sx={{
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
                      placeholder="Pasta the message o comment here..."
                      variant="standard"
                      InputProps={{ disableUnderline: true }}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                      sx={{
                        fontSize: '1.1rem',
                        width: {
                          xs: '100%',
                          sm: '400px',
                          md: '700px',
                        },
                        mx: 'auto',
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
                  <Typography fontSize="14px" color="#555555" mt={4} sx={{ fontStyle: 'italic' }}>
                    We'll help you understand if this is cyberbullying and suggest ways to respond.
                  </Typography>
                </Box>

                {/* <Box
                  component="img"
                  src="/bear.png"
                  alt="sad bear"
                  sx={{
                    position: 'absolute',
                    right: {
                      xs: '-40px',
                      sm: '-100px',
                      md: '-110px',
                    },
                    bottom: {
                      xs: '0px',
                      sm: '-45px',
                      md: '-45px',
                    },
                    height: {
                      xs: '130px',
                      sm: '220px',
                      md: '250px',
                    },
                    zIndex: 1,
                    pointerEvents: 'none',
                  }}
                /> */}
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
