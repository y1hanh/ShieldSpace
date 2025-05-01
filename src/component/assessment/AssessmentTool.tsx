import { useState } from 'react';
import { Box, Typography, TextField, IconButton, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
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
      navigate('/assessment-result');
    } catch (err) {
      console.error('Failed to submit', err);
      alert('Submission failed.');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
        background: 'linear-gradient(135deg, #E1F5FE 0%, #F3E5F5 50%, #EDE7F6 100%)',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        alignItems: 'center',
        justifyContent: 'flex-start',
        mx: 'auto',
        py: 4,
        mt: {
          xs: 20,
          sm: 0,
          md: 0,
        },
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="#4B4072" mb={2}>
        Assessment Tool
      </Typography>
      <Typography fontSize="18px" color="rgb(22, 128, 115)">
        <Box component="span" sx={{ fontSize: '2rem', mr: 1 }}>
          📨
        </Box>
        Got a mean message?
      </Typography>
      <Typography fontSize="18px" color="rgb(22, 128, 115)" mb={3}>
        Paste it here and we'll help you out!
      </Typography>
      <Box
        sx={{
          width: { xs: '85%', sm: '90%', md: '80%', lg: '80%' },
          background: 'linear-gradient(135deg, #E1F5FE 0%, #F3E5F5 50%, #EDE7F6 100%)',
          borderRadius: '24px',
          padding: { xs: 4, md: 6 },
          textAlign: 'center',
        }}
      >
        {/* Input Box */}
        <Box
          sx={{
            width: '80%',
            maxWidth: '530px',
            backgroundColor: 'rgb(231, 250, 253)',
            border: '2px solid #00ACC1',
            borderRadius: '16px',
            p: 2,
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Box
            component="img"
            src="/robot.png"
            alt="robot"
            sx={{
              position: 'absolute',
              left: {
                xs: 'calc(100% - 65px)',
                sm: 'calc(100% - 115px)',
                md: 'calc(100% - 110px)',
              },
              top: {
                xs: 'calc(100% - 120px)',
                sm: 'calc(100% - 220px)',
                md: 'calc(100% - 260px)',
              },
              width: {
                xs: '130px',
                sm: '250px',
                md: '300px',
              },
              height: 'auto',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          <Box
            sx={{
              width: '90%',
              maxWidth: '500px',
              mx: 'auto',
              backgroundColor: '#fff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TextField
              fullWidth
              placeholder="Paste the message..."
              variant="standard"
              slotProps={{ input: { disableUnderline: true } }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              sx={{ fontSize: '1rem', p: 2 }}
            />
            <IconButton
              onClick={handleSubmit}
              sx={{
                backgroundColor: ' #FFA726',
                color: '#fff',
                ml: 1,
                width: 48,
                height: 48,
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                '&:hover': {
                  backgroundColor: '#f57c00',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Chip 1 */}
        <Chip
          label={
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Box component="span" sx={{ fontSize: '2rem', mr: 1, mt: 1 }}>
                ☑️
              </Box>
              <Typography fontWeight="bold" fontSize="1.2rem" color="#4B4072">
                Is it <br />
                Bullying?
              </Typography>
            </Box>
          }
          sx={{
            backgroundColor: 'rgb(232, 191, 240)',
            borderRadius: '16px',
            px: 3,
            py: 6,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        />

        {/* Chip 2 */}
        <Chip
          label={
            <Box
              sx={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer' }}
              onClick={() => navigate('/resources')}
            >
              <Box component="span" sx={{ fontSize: '2rem', mr: 1, mt: 1 }}>
                💡
              </Box>
              <Typography fontWeight="bold" fontSize="1.2rem" color="#166">
                How to <br />
                Respond?
              </Typography>
            </Box>
          }
          sx={{
            backgroundColor: '#E0F7FA',
            borderRadius: '16px',
            px: 3,
            py: 6,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        />

        {/* Chip 3 */}
        <Chip
          label={
            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
              <Box component="span" sx={{ fontSize: '2rem', mr: 1, mt: 1 }}>
                🧘‍♂️
              </Box>
              <Typography fontWeight="bold" fontSize="1.2rem" color="#4B4072">
                Stay <br />
                Calm Tips
              </Typography>
            </Box>
          }
          sx={{
            backgroundColor: '#FCE4EC',
            borderRadius: '16px',
            px: 3,
            py: 6,
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        />
      </Box>
    </Box>
  );
}
