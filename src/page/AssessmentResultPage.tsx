import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import QuizIcon from '@mui/icons-material/Quiz';
import { MessageAnalysis } from '../component/assessment/MessageAnalysis';
import { ActionPlan } from '../component/assessment/ActionPlan';
import { useAssessment } from '../slice/assessmentSlice';

export default function ResultsPage() {
  const { userInput, analysisResult } = useAssessment();
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/cyber-safety-quiz');
  };

  const resetAssessment = () => {
    navigate('/assessment');
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" color="#4B4072" mt={10} mb={4} textAlign="center">
        Insights
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
           width: {
            xs: '100%',
            md: '100%'
          },
          minHeight: '400px', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%'
            },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
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
            width: {
              xs: '100%',
              md: '50%'
            },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActionPlan userInput={userInput} />
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
  );
}
