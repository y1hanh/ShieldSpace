import { useState } from 'react';
import { useNavigate } from 'react-router';
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
import axios from 'axios';
import PageLayoutBox from './PageLayOutBox';

const API_BASE_URL = 'https://api.shieldspace.games/model';

const STYLES = {
  container: {
    width: '100%',
    maxWidth: '900px',
    mx: 'auto',
    mt: 4,
    mb: 4,
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
  const navigate = useNavigate();

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
      await axios.post(`${API_BASE_URL}/emotions`, { user_input: message });
      setResponses([]);
      setInput('');
      navigate('/');
    } catch (err) {
      console.error('Failed to submit', err);
      alert('Submission failed.');
    }
  };

  return (
    <PageLayoutBox
      header={
        <>
          <Typography sx={{ color: '#3A4559', fontWeight: 600 }} variant="h5" mb={2}>
            Emotional Assessment Tool
          </Typography>
          <Box sx={STYLES.container}>
            <Paper sx={STYLES.chatBubble} elevation={0}>
              {/* Show this prompt only when no responses have been submitted */}
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
            </Paper>
          </Box>
        </>
      }
    >
      <Box />
    </PageLayoutBox>
  );
}
