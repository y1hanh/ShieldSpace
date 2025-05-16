import { Box, Typography, Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';
import QuizIcon from '@mui/icons-material/Quiz';
import { MessageAnalysis } from '../component/assessment/MessageAnalysis';
import { ActionPlan } from '../component/assessment/ActionPlan';
import { useAssessment } from '../slice/assessmentSlice';
import error_animation from '../animations/error_animation.json';
import Lottie from 'lottie-react';
import { isEmpty } from 'lodash';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultsPage() {
  const { userInput, analysisResult } = useAssessment();
  const navigate = useNavigate();
  const isBullying = analysisResult?.toxic_level > 0.1 || !isEmpty(analysisResult?.bias);
  const [activeView, setActiveView] = useState<'analysis' | 'plan'>('analysis');

  const handleStartQuiz = () => {
    navigate('/cyber-safety-quiz');
  };

  const resetAssessment = () => {
    navigate('/assessment');
  };

  const handleViewChange = (view: 'analysis' | 'plan') => {
    setActiveView(view);
  };

  return userInput ? (
    <Box sx={{ minHeight: '100vh' }}>
      {/* swipe */}
      {isBullying && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mb: 5,
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              backgroundColor: '#f4f1fa',
              borderRadius: '30px',
              padding: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '1px solid #e0e0e0',
              maxWidth: '500px',
              width: '90%',
            }}
          >
            <Button
              onClick={() => handleViewChange('analysis')}
              startIcon={<QuizIcon />}
              sx={{
                flex: 1,
                padding: '10px 20px',
                borderRadius: '25px',
                backgroundColor: activeView === 'analysis' ? '#6A4CA7' : 'transparent',
                color: activeView === 'analysis' ? 'white' : '#6A4CA7',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor:
                    activeView === 'analysis' ? '#5d3e95' : 'rgba(106, 76, 167, 0.1)',
                },
              }}
            >
              Message Analysis
            </Button>

            <Button
              onClick={() => handleViewChange('plan')}
              startIcon={<VolunteerActivismIcon />}
              sx={{
                flex: 1,
                padding: '10px 20px',
                borderRadius: '25px',
                backgroundColor: activeView === 'plan' ? '#6A4CA7' : 'transparent',
                color: activeView === 'plan' ? 'white' : '#6A4CA7',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: activeView === 'plan' ? '#5d3e95' : 'rgba(106, 76, 167, 0.1)',
                },
              }}
            >
              Support Plan
            </Button>
          </Box>
        </Box>
      )}

      {!isBullying && <Box sx={{ my: '8rem' }}></Box>}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: activeView === 'plan' ? '850px' : '650px', // Wider container for ActionPlan
          margin: '0 auto',
          minHeight: { xs: 'auto', md: '450px' },
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden',
          transition: 'max-width 0.3s ease-in-out', // Smooth transition when switching views
        }}
      >
        {/* Swipeable container */}
        <motion.div
          style={{ width: '100%', touchAction: 'pan-y' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = offset.x;

            if (swipe < -100 && activeView === 'analysis' && isBullying) {
              handleViewChange('plan');
            } else if (swipe > 100 && activeView === 'plan') {
              handleViewChange('analysis');
            }
          }}
        >
          <AnimatePresence mode="wait">
            {activeView === 'analysis' ? (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <MessageAnalysis
                  resetAssessment={resetAssessment}
                  userInput={userInput}
                  analysisResult={analysisResult}
                  isBullying={isBullying}
                />
              </motion.div>
            ) : (
              <motion.div
                key="plan"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <ActionPlan />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
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
