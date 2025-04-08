import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PsychologyAltOutlinedIcon from '@mui/icons-material/PsychologyAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import axios from 'axios';
import PageLayoutBox from '../component/PageLayOutBox';

// Constants
const API_BASE_URL = 'http://209.38.91.23/model';
//const token = sessionStorage.getItem('token');

/**
 * Skills data configuration for the assessment tool
 * Each skill has a label, description, and associated icon
 */
const SKILLS_DATA = [
  {
    label: 'Digital Resilience',
    desc: 'Bouncing back from negative online experiences',
    icon: <CheckCircleOutlineIcon sx={{ fontSize: 40, color: '#f89b5e' }} />,
  },
  {
    label: 'Emotional Awareness',
    desc: 'Recognizing and managing your feelings',
    icon: <PsychologyAltOutlinedIcon sx={{ fontSize: 40, color: '#f89b5e' }} />,
  },
  {
    label: 'Communication',
    desc: 'Expressing yourself clearly and confidently',
    icon: <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 40, color: '#f89b5e' }} />,
  },
  {
    label: 'Social Skills',
    desc: 'Building healthy relationships online and offline',
    icon: <PeopleOutlineOutlinedIcon sx={{ fontSize: 40, color: '#f89b5e' }} />,
  },
  {
    label: 'Problem Solving',
    desc: 'Finding creative solutions to challenging situations',
    icon: <EmojiObjectsOutlinedIcon sx={{ fontSize: 40, color: '#f89b5e' }} />,
  },
];

/**
 * Common styles used throughout the component
 */
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
    backgroundColor: '#f2f6fb',
    borderRadius: '1rem',
    minHeight: '200px',
  },
  progressBar: {
    height: 25,
    mt: 2,
    mb: 2,
    borderRadius: 1,
    backgroundColor: '#e0e0e0',
    '& .MuiLinearProgress-bar': {
      background: 'linear-gradient(to right, #62B5E5, #469fd8)',
    },
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

/**
 * AssessmentPage Component
 *
 * A tool for users to assess their emotional responses and receive feedback
 * Includes a chat interface, progress tracking, and skills development section
 */
export default function AssessmentPage() {
  // State management
  const [questions] = useState([
    'Welcome to the No More Bully assessment tool.\n How does this situation make you feel?',
  ]);
  const [responses, setResponses] = useState([]);
  const [input, setInput] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  /**
   * Handles the submission of user responses
   * Validates input and updates the chat interface
   */
  const handleSubmit = async () => {
    const validateInput = (text: string): string | null => {
      const trimmed = text.trim();
      const words = trimmed.split(/\s+/);

      if (trimmed === '') {
        return 'Input cannot be empty.';
      }

      if (words.length < 3) {
        return 'Please enter at least 3 words to describe how you feel.';
      }

      const hasNumber = words.some(word => /^\d+$/.test(word));
      if (hasNumber) {
        return 'Please do not include numbers. Use words to describe your feelings.';
      }

      return null;
    };
    // Validate input
    const error = validateInput(input);
    if (currentIndex === 0 && error) {
      alert(error);
      return;
    }
    if (!input.trim()) return;

    const currentQuestion = questions[currentIndex];
    const responseObj = {
      question: currentQuestion,
      answer: input,
      type: 'text',
    };

    const updatedResponses = [...responses, responseObj];
    setResponses(updatedResponses);
    setInput('');

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      await submitToBackend(updatedResponses);
    }
  };

  /**
   * Submits the final responses to the backend
   * Clears the chat interface and navigates to results
   */
  const submitToBackend = async finalResponses => {
    const message = finalResponses.map(res => res.answer).join(' ');

    if (!message) {
      alert('Please complete all questions before submitting.');
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/emotions`,
        {
          user_input: message,
        } /* ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } */
      );

      // Clear the chat interface
      setResponses([]);
      setCurrentIndex(0);
      setInput('');

      navigate('/assessment');
    } catch (err) {
      console.error('Failed to submit', err);
      alert('Submission failed.');
    }
  };

  // Calculate progress percentage
  const progress = (responses.length / questions.length) * 100;

  return (
    <PageLayoutBox
      header={
        <>
          <Typography sx={{ color: '#3A4559', fontWeight: 600 }} variant="h5">
            Emotional Assessment Tool
          </Typography>
          <Typography sx={{ color: '#7A7A9D' }} variant="body1">
            Share your feelings and responses to build resilience and practice managing difficult
            situations.
          </Typography>
          <Box sx={STYLES.container}>
            {/* Chat Interface */}
            <Paper sx={STYLES.chatBubble}>
              <List>
                {responses.map((res, i) => (
                  <Box key={i}>
                    <ListItem>
                      <ListItemText primary={res.question} />
                    </ListItem>
                    <ListItem sx={{ justifyContent: 'flex-end' }}>
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
                  </Box>
                ))}
                {questions[currentIndex] && (
                  <ListItem>
                    <ListItemText primary={questions[currentIndex]} />
                  </ListItem>
                )}
              </List>
            </Paper>

            {/* Progress Indicator */}
            <LinearProgress variant="determinate" value={progress} sx={STYLES.progressBar} />

            {/* Response Input */}
            {questions[currentIndex] && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Type your response here..."
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  sx={{ borderRadius: '10px' }}
                />
                <Button onClick={handleSubmit} sx={STYLES.submitButton}>
                  <ArrowUpwardIcon />
                </Button>
              </Box>
            )}
          </Box>
        </>
      }
    >
      {/* Skills Development Section */}
      <Box
        sx={{
          mx: 'auto',
          mt: 2,
          backgroundColor: '#FFFFFF',
          borderRadius: '1rem',
          p: 3,
        }}
      >
        <Box>
          <Typography variant="h6" color="#3A4559" fontWeight={600}>
            Skills to Develop
          </Typography>
          <Typography variant="body2" color="#7A7A9D" mb={5}>
            These skills will help you navigate the digital world with confidence and resilience.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
          {SKILLS_DATA.map((skill, index) => (
            <Box key={index} sx={{ textAlign: 'center', flex: '1 1 60px' }}>
              <Box mb={1}>{skill.icon}</Box>
              <Typography fontWeight={400} color="#4B5563">
                {skill.label}
              </Typography>
              <Typography variant="body2" color="#4B5563" sx={{ fontSize: '12px' }}>
                {skill.desc}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Assessment Progress Section */}
      {/* <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          p: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" fontWeight={600} color="#3A4559" mb={3} textAlign="start">
          Your Assessment Progress
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 4,
            mb: 4,
          }}
        > */}
      {/* Progress Indicators */}
      {/* <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#f89b5e',
              }}
            />
            <Typography variant="body2" color="#4B5563">
              2 Assessments Completed
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#62B5E5',
              }}
            />
            <Typography variant="body2" color="#4B5563">
              5 Skills Analyzed
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <PlayArrowIcon sx={{ color: '#f89b5e', fontSize: 16 }} />
            <Typography variant="body2" color="#4B5563">
              1 Badge Earned
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: '2px solid #f89b5e',
              }}
            />
            <Typography variant="body2" color="#4B5563">
              Next Badge: 2 more assessments
            </Typography>
          </Box>
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: '#f89b5e',
            borderRadius: '25px',
            textTransform: 'none',
            px: 4,
            py: 1,
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#f57c00',
            },
          }}
        >
          View All Results
        </Button>
      </Box> */}
    </PageLayoutBox>
  );
}
