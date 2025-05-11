import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import QuizIcon from '@mui/icons-material/Quiz';
import { MessageAnalysis } from '../component/assessment/MessageAnalysis';
import { ActionPlan } from '../component/assessment/ActionPlan';
import { useAssessment } from '../slice/assessmentSlice';
import error_animation from '../animations/error_animation.json';
import Lottie from 'lottie-react';
import { error } from 'console';

export default function ResultsPage() {
  const { userInput, analysisResult } = useAssessment();
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/cyber-safety-quiz');
  };

  const resetAssessment = () => {
    navigate('/assessment');
  };

  return userInput ? (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="#4B4072" mb={4} textAlign="center">
        Insights
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          width: '100%',
          minHeight: { xs: 'auto', md: '400px' },
          gap: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            mb: { xs: 3, md: 0 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <MessageAnalysis
            resetAssessment={resetAssessment}
            userInput={userInput}
            analysisResult={analysisResult}
          />
        </Box>
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActionPlan />
        </Box>
      </Box>

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
          Start
        </Button>
      </Box>
    </Box>
  ) : (
    <ErrorMessage></ErrorMessage>
  );
}

function ErrorMessage() {
  const navigate = useNavigate();

  const handleGoToAssessment = () => {
    navigate('/assessment');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
        minHeight: '60vh',
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="#4B4072" mb={2}>
        Oops! Something's Missing
      </Typography>

      <Typography variant="body1" mb={3} color="text.secondary">
        It looks like you haven't completed an assessment yet. Let's go back and check out a message
        first!
      </Typography>

      <Lottie
        animationData={error_animation}
        loop={true}
        style={{
          width: '100%',
          maxWidth: '300px',
          maxHeight: '250px',
          margin: '16px 0',
        }}
      />

      <Button
        variant="contained"
        onClick={handleGoToAssessment}
        sx={{
          backgroundColor: '#6A4CA7',
          color: 'white',
          borderRadius: '25px',
          minWidth: '200px',
          px: 4,
          mt: 3,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#59359e',
          },
        }}
      >
        Go to Assessment
      </Button>
    </Box>
  );
}
