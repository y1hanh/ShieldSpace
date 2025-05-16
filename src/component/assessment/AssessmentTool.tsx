import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Button,
  Paper,
  Dialog,
  LinearProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ImageIcon from '@mui/icons-material/Image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getEmotions } from '../../api';
import { useAssessment } from '../../slice/assessmentSlice';
import { useNavigate } from 'react-router';
import { ImageCrop } from './ImageCrop';
import { debounce } from 'lodash';
import { AlertDialog } from '../AlertDialog';
import Lottie from 'lottie-react';
import robot from '../../animations/robot.json';

export default function AssessmentTool() {
  const [input, setInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editableText, setEditableText] = useState<string>('');
  const [showTextConfirmation, setShowTextConfirmation] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStep, setAnalysisStep] = useState<number>(0);

  const analysisPhrases = [
    'Analyzing message...',
    'Detecting potential hurtful content...',
    'Generating your support plan...',
    'Preparing your results...',
  ];

  const navigate = useNavigate();
  const { setUserInput, setAnalysisResult } = useAssessment();

  // Function to handle the analysis progress
  useEffect(() => {
    if (isAnalyzing) {
      const time = Math.floor(Math.random() * 1000);

      const timer = setTimeout(() => {
        if (analysisStep < analysisPhrases.length - 1) {
          setAnalysisStep(prev => prev + 1);
        } else {
          // setIsAnalyzing(false);
          setAnalysisStep(0);
          navigate('/assessment-result');
        }
      }, time); // Move to next step every 1.2 seconds

      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, analysisStep, navigate]);

  const handleSubmit = debounce(async () => {
    const trimmed = input.trim();
    if (trimmed.length < 3) {
      setAlertText('Please enter at least 3 letters.');
      setAlertOpen(true);
      return;
    }

    try {
      setIsAnalyzing(true); // Start the analysis animation
      const { analysis } = await getEmotions({ user_input: trimmed });
      setUserInput(trimmed);
      setAnalysisResult(analysis);
      setInput('');
    } catch (err) {
      console.error('Failed to submit', err);
      setAlertText('Submission failed.');
      setAlertOpen(true);
      setIsAnalyzing(false);
    }
  }, 500);

  const triggerFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onTextExtracted = (text: string) => {
    const cleanedText = text.trim().replace(/\s+/g, ' ');
    if (cleanedText.length > 0) {
      setEditableText(cleanedText);
      setShowTextConfirmation(true);
    } else {
      setAlertOpen(true);
      setAlertText(
        'No text was detected in the image. Please try another image or type your message.'
      );
    }
  };

  const handleConfirmText = () => {
    setInput(editableText);
    setShowTextConfirmation(false);
  };

  const handleCancelText = () => {
    setEditableText('');
    setShowTextConfirmation(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1200px',
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
      <Typography variant="h4" fontWeight="bold" color="var(--text-title)" mb={2}>
        Got a mean message?
      </Typography>

      <Typography fontSize="18px" color="var(--text-subtitle)" mb={3}>
        Share what you saw and we'll help you!
      </Typography>
      <Box
        sx={{
          width: { xs: '85%', sm: '90%', md: '80%', lg: '80%' },
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
            backgroundColor: 'var(--background-secondary)',
            border: '2px solid #00ACC1',
            borderRadius: '16px',
            p: 2,
            mx: 'auto',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: {
                xs: 'calc(100% - 100px)',
                sm: 'calc(100% - 115px)',
                md: 'calc(100% - 110px)',
                lg: 'calc(100% - 110px)',
              },
              top: {
                xs: 'calc(100% - 180px)',
                sm: 'calc(100% - 220px)',
                md: 'calc(100% - 280px)',
                lg: 'calc(100% - 335px)',
              },
              width: {
                xs: '180px',
                sm: '250px',
                md: '330px',
                lg: '400px',
              },
              height: 'auto',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <Lottie animationData={robot} loop />
          </Box>

          {/* Image preview area */}
          <ImageCrop fileInputRef={fileInputRef} onTextExtracted={onTextExtracted} />
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
              multiline
              placeholder="Type the message..."
              variant="standard"
              slotProps={{ input: { disableUnderline: true } }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              sx={{ fontSize: '1rem', p: 2 }}
            />

            {/* image upload */}
            <Tooltip title="Upload image">
              <IconButton
                onClick={triggerFileUpload}
                sx={{
                  color: '#9e9e9e',
                  mx: 0.5,
                  '&:hover': {
                    color: '#757575',
                  },
                }}
              >
                <ImageIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Submit">
              <IconButton
                onClick={handleSubmit}
                sx={{
                  backgroundColor: ' #FFA726',
                  color: '#fff',
                  ml: 1,
                  mr: 1,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: '#f57c00',
                  },
                }}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {/* text confimation Dialog */}
      <AlertDialog
        alertOpen={alertOpen}
        handleCloseAlert={handleCloseAlert}
        title={'oops!'}
        alertText={alertText}
      />

      <Dialog open={showTextConfirmation} onClose={handleCancelText} maxWidth="sm" fullWidth>
        <Paper sx={{ p: 3, background: 'var(--background)' }}>
          <Typography variant="h6" fontWeight="bold" color="var(--text-title)" mb={2}>
            We Found a Message…
          </Typography>

          <Box
            sx={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'stretch',
              gap: 2,
              mb: 3,
            }}
          >
            {/* Text Field */}
            <Box
              sx={{
                flex: '1 1 auto',
                order: { xs: 2, sm: 1 },
                width: '100%',
              }}
            >
              <TextField
                multiline
                fullWidth
                minRows={3}
                maxRows={8}
                variant="outlined"
                value={editableText}
                onChange={e => setEditableText(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: 'var(--highlight)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--highlight)',
                    },
                  },
                }}
              />
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" mb={3}>
            Is this what the picture says? You can change it or keep it. We're here to help!
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCancelText}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircleIcon />}
              onClick={handleConfirmText}
              sx={{
                bgcolor: 'var(--highlight)',
                '&:hover': { bgcolor: '#F57C00' },
              }}
            >
              Next Step
            </Button>
          </Box>
        </Paper>
      </Dialog>

      {/* Full-page Progress Animation */}
      {isAnalyzing && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            background: 'var(--background)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3,
          }}
        >
          <Lottie
            animationData={robot}
            loop
            style={{
              height: 200,
              margin: '0 auto',
            }}
          />
          <Typography
            variant="h5"
            sx={{
              mt: 3,
              mb: 3,
              fontWeight: 'bold',
              color: 'var(--text-title)',
            }}
          >
            {analysisPhrases[analysisStep]}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={(analysisStep + 1) * 25}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'var(--highlight)',
                borderRadius: 5,
              },
            }}
          />

          <Typography
            variant="body2"
            sx={{
              mt: 3,
              color: 'text.secondary',
              fontStyle: 'italic',
            }}
          >
            We're checking your message and creating helpful advice...
          </Typography>
        </Box>
      )}
    </Box>
  );
}
