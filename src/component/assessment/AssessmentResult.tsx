import { Box, Typography, Button } from '@mui/material';
import PageLayoutBox from '../PageLayOutBox';
import { useAssessment } from '../../slice/assessmentSlice';
import { useNavigate } from 'react-router';
import QuizIcon from '@mui/icons-material/Quiz';
import MessageAnalysis from './MessageAnalysis';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { userInput } = useAssessment();

  const handleStartQuiz = () => {
    navigate('/cyber-safety-quiz');
  };

  const resetAssessment = () => {
    navigate('/assessment');
  };

  return (
    <PageLayoutBox
      innerSx={{
        borderRadius: '12px',
        py: 6,
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
            Assessment Results
          </Typography>

          <Box width="100%">
            <MessageAnalysis resetAssessment={resetAssessment} />

            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.primary"
              textAlign="center"
              sx={{ mt: 4 }}
            >
              🎯 Ready to discover your emotional superpowers?
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleStartQuiz}
                startIcon={<QuizIcon />}
                sx={{
                  backgroundColor: '#6A4CA7',
                  color: 'white',
                  borderRadius: '25px',
                  minWidth: '200px',
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
              onClick={() => navigate('/')}
              sx={{
                mt: 2,
                background: 'none',
                color: '#7C4DFF',
                textTransform: 'none',
                fontWeight: 400,
                fontSize: '0.85rem',
                textDecoration: 'underline',
                '&:hover': {
                  color: '#5E35B1',
                  background: 'transparent',
                },
              }}
            >
              👉 Back to Home Page
            </Button>
          </Box>
        </Box>
      }
    >
      <Box />
    </PageLayoutBox>
  );
}
