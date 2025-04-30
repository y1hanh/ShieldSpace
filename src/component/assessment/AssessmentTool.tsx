import { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PageLayoutBox from '../PageLayOutBox';
import { getEmotions } from '../../api';
import { useAssessment } from '../../slice/assessmentSlice';
import { useNavigate } from 'react-router';

export default function AssessmentTool() {
  const [input, setInput] = useState('');
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
      navigate('/AssessmentResult');
    } catch (err) {
      console.error('Failed to submit', err);
      alert('Submission failed.');
    }
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
          <Typography fontSize="16px" color="#555555" mb={4} textAlign="center">
            Paste the message you received to see if it is bullying.
          </Typography>

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

          <Typography
            fontSize="14px"
            color="#555555"
            mt={4}
            sx={{ fontStyle: 'italic', textAlign: 'center' }}
          >
            We'll help you understand if this is cyberbullying and suggest ways to respond.
          </Typography>
        </Box>
      }
    >
      <Box />
    </PageLayoutBox>
  );
}
