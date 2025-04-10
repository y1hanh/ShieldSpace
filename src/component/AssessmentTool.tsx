import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import axios from 'axios';
import PageLayoutBox from './PageLayOutBox';
import MessageAnalysis from './MessageAnalysis';

const API_BASE_URL = 'https://api.shieldspace.games/model';

const STYLES = {
  container: {
    width: '100%',
    maxWidth: '900px',
    mx: 'auto',
    mt: 2,
    mb: 2,
  },
  chatBubble: {
    p: 3,
    minHeight: '200px',
  },
  submitButton: {
    minWidth: '3rem',
    height: '3rem',
    borderRadius: '50%',
    backgroundColor: '#f89b5e',
    color: 'white',
    '&:hover': {
      backgroundColor: '#f57c00',
    },
  },
};

export default function AssessmentTool() {
  const [responses, setResponses] = useState([]);
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

    const responseObj = {
      answer: input,
    };

    const updatedResponses = [...responses, responseObj];
    setResponses(updatedResponses);
    setInput('');

    await submitToBackend(updatedResponses);
  };

  const submitToBackend = async finalResponses => {
    const message = finalResponses.map(res => res.answer).join(' ');

    try {
      const response = await axios.post(`${API_BASE_URL}/emotions`, { user_input: message });
      localStorage.setItem('analysisResult', JSON.stringify(response.data));
      localStorage.setItem('userInput', message);
      setResponses([]);
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
    setResponses([]);
    setInput('');
    setSubmitted(false);
  };

  return (
    <PageLayoutBox
      id="assessment"
      header={
        <>
          <Typography sx={{ color: '#3A4559', fontWeight: 600 }} variant="h5" mb={2}>
            {submitted ? 'Message Analysis' : 'Emotional Assessment Tool'}
          </Typography>
          <Box sx={STYLES.container}>
            <Paper sx={STYLES.chatBubble} elevation={0}>
              {submitted ? (
                <>
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
                </>
              ) : (
                <>
                  {responses.length === 0 && (
                    <Typography mb={1} fontWeight="bold">
                      “Type the message or words that upset you...”
                    </Typography>
                  )}
                  <List>
                    {responses.map((res, i) => (
                      <ListItem key={i} sx={{ justifyContent: 'flex-end' }}>
                        <ListItemText
                          primary={res.answer}
                          sx={{
                            maxWidth: 'fit-content',
                            backgroundColor: '#f89b5e',
                            color: 'white',
                            px: 2,
                            py: 1,
                            borderRadius: '15px',
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <TextField
                      fullWidth
                      placeholder="Type your response here..."
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                      sx={{ borderRadius: '10px' }}
                    />
                    <Button onClick={handleSubmit} sx={STYLES.submitButton}>
                      <ArrowUpwardIcon />
                    </Button>
                  </Box>
                </>
              )}
            </Paper>
          </Box>
        </>
      }
    >
      <Box />
    </PageLayoutBox>
  );
}
