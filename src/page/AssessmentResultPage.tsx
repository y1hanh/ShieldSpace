import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { MessageAnalysis } from '../component/assessment/MessageAnalysis';
import { ActionPlan } from '../component/assessment/ActionPlan';
import { useAssessment } from '../slice/assessmentSlice';
import { isEmpty } from 'lodash';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CyberSafetyQuiz from '../component/assessment/CyberSafetyQuiz';

type PageProps = 'analysis' | 'plan' | 'personalised';

export default function AssessmentResultPage() {
  const { userInput, analysisResult } = useAssessment();
  const navigate = useNavigate();
  if (!userInput) {
    navigate('/error');
  }
  const isBullying = analysisResult?.toxic_level > 0.1 || !isEmpty(analysisResult?.bias);
  const [activeView, setActiveView] = useState<PageProps>('analysis');
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resetAssessment = () => {
    navigate('/assessment');
  };

  const handleViewChange = (view: PageProps) => {
    setActiveView(view);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Floating swipe navigation */}
      {isBullying && (
        <>
          {/* Navigation spacer for fixed positioning */}
          {isScrolled && (
            <Box
              sx={{
                height: { xs: '100px', md: '80px' },
                mb: 5,
                mt: 3,
                visibility: 'hidden',
              }}
            />
          )}

          {/* Improved navigation bar */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              mb: isScrolled ? 0 : 3,
              mt: isScrolled ? 0 : 4,
              position: isScrolled ? 'fixed' : 'relative',
              top: isScrolled ? 0 : 'auto',
              left: 0,
              zIndex: 1000,
              transition: 'all 0.3s ease',
              backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.97)' : 'transparent',
              boxShadow: isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
              padding: isScrolled ? '10px 0' : 0,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 1.5, sm: 2 },
                width: '100%',
                maxWidth: '900px',
                padding: { xs: '10px', sm: '5px 15px' },
              }}
            >
              {/* Progress indicator */}
              <Box
                sx={{
                  width: '100%',
                  display: { xs: 'flex', sm: 'none' },
                  justifyContent: 'space-between',
                  mb: 1,
                  px: 1,
                  color: '#6A4CA7',
                }}
              >
                <Typography variant="body2" fontWeight={600}>
                  Your progress:
                </Typography>
                <Typography variant="body2" fontWeight={600}>
                  Step {activeView === 'analysis' ? '1' : activeView === 'plan' ? '2' : '3'} of 3
                </Typography>
              </Box>

              {/* Step buttons - with improved visual flow */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  width: '100%',
                  position: 'relative',
                }}
              >
                {/* Step 1 button */}
                <Button
                  onClick={() => handleViewChange('analysis')}
                  sx={{
                    borderRadius: '10px',
                    backgroundColor:
                      activeView === 'analysis' ? '#6A4CA7' : 'rgba(106, 76, 167, 0.08)',
                    color: activeView === 'analysis' ? 'white' : '#6A4CA7',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    padding: { xs: '10px 15px', sm: '12px 20px' },
                    flex: 1,
                    position: 'relative',
                    textTransform: 'none',
                    border:
                      activeView === 'analysis' ? 'none' : '1px solid rgba(106, 76, 167, 0.2)',
                    '&:hover': {
                      backgroundColor:
                        activeView === 'analysis' ? '#5d3e95' : 'rgba(106, 76, 167, 0.15)',
                    },
                    '&::after': {
                      content: isScrolled ? '""' : 'none',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: -15,
                      width: 30,
                      height: 30,
                      margin: 'auto',
                      backgroundColor: 'white',
                      transform: 'rotate(45deg)',
                      zIndex: 0,
                      display: { xs: 'none', sm: 'block' },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: activeView === 'analysis' ? 'white' : 'rgba(106, 76, 167, 0.2)',
                        color: activeView === 'analysis' ? '#6A4CA7' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                      }}
                    >
                      1
                    </Box>
                    <span>Analysis</span>
                  </Box>
                </Button>

                {/* Step 2 button */}
                <Button
                  onClick={() => handleViewChange('plan')}
                  sx={{
                    borderRadius: '10px',
                    backgroundColor: activeView === 'plan' ? '#6A4CA7' : 'rgba(106, 76, 167, 0.08)',
                    color: activeView === 'plan' ? 'white' : '#6A4CA7',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    padding: { xs: '10px 15px', sm: '12px 20px' },
                    flex: 1,
                    position: 'relative',
                    textTransform: 'none',
                    marginTop: { xs: 1, sm: 0 },
                    marginLeft: { xs: 0, sm: 1 },
                    border: activeView === 'plan' ? 'none' : '1px solid rgba(106, 76, 167, 0.2)',
                    '&:hover': {
                      backgroundColor:
                        activeView === 'plan' ? '#5d3e95' : 'rgba(106, 76, 167, 0.15)',
                    },
                    '&::after': {
                      content: isScrolled ? '""' : 'none',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      right: -15,
                      width: 30,
                      height: 30,
                      margin: 'auto',
                      backgroundColor: 'white',
                      transform: 'rotate(45deg)',
                      zIndex: 0,
                      display: { xs: 'none', sm: 'block' },
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor: activeView === 'plan' ? 'white' : 'rgba(106, 76, 167, 0.2)',
                        color: activeView === 'plan' ? '#6A4CA7' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                      }}
                    >
                      2
                    </Box>
                    <span>Support Plan</span>
                  </Box>
                </Button>

                {/* Step 3 button */}
                <Button
                  onClick={() => handleViewChange('personalised')}
                  sx={{
                    borderRadius: '10px',
                    backgroundColor:
                      activeView === 'personalised' ? '#6A4CA7' : 'rgba(106, 76, 167, 0.08)',
                    color: activeView === 'personalised' ? 'white' : '#6A4CA7',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    padding: { xs: '10px 15px', sm: '12px 20px' },
                    flex: 1,
                    position: 'relative',
                    textTransform: 'none',
                    marginTop: { xs: 1, sm: 0 },
                    marginLeft: { xs: 0, sm: 1 },
                    border:
                      activeView === 'personalised' ? 'none' : '1px solid rgba(106, 76, 167, 0.2)',
                    '&:hover': {
                      backgroundColor:
                        activeView === 'personalised' ? '#5d3e95' : 'rgba(106, 76, 167, 0.15)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      zIndex: 1,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        bgcolor:
                          activeView === 'personalised' ? 'white' : 'rgba(106, 76, 167, 0.2)',
                        color: activeView === 'personalised' ? '#6A4CA7' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                      }}
                    >
                      3
                    </Box>
                    <span>Personalized Plan</span>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      )}

      {/* Mobile swipe hint - helps users understand they can swipe */}
      {isBullying && (
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
            mb: 2,
            color: '#6A4CA7',
            opacity: 0.75,
            fontSize: '0.8rem',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 35,
              height: 4,
              backgroundColor: '#6A4CA7',
              borderRadius: 2,
            }}
          />
          <Typography variant="caption" fontWeight={500}>
            Swipe to navigate
          </Typography>
          <Box
            sx={{
              width: 35,
              height: 4,
              backgroundColor: '#6A4CA7',
              borderRadius: 2,
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          position: 'relative',
          width: '100%',
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
          style={{ width: '100%', touchAction: 'none' }} // Changed from pan-y to none to enable horizontal swipes
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2} // Increased elasticity for better feedback
          dragMomentum={false} // Disabled momentum for more predictable behavior
          // Add touch handlers as a fallback
          onTouchStart={e => {
            // Store the initial touch position
            const touchStartX = e.touches[0].clientX;
            e.currentTarget.dataset.touchStartX = touchStartX.toString();
          }}
          onTouchEnd={e => {
            // Get final position and calculate swipe distance
            const touchEndX = e.changedTouches[0].clientX;
            const touchStartX = parseFloat(e.currentTarget.dataset.touchStartX || '0');
            const swipeDistance = touchEndX - touchStartX;

            // Use the same logic as in dragEnd, but with a smaller threshold for touch
            if (swipeDistance < -50) {
              // Swiping left (next)
              if (activeView === 'analysis') {
                handleViewChange('plan');
              } else if (activeView === 'plan') {
                handleViewChange('personalised');
              }
            } else if (swipeDistance > 50) {
              // Swiping right (previous)
              if (activeView === 'personalised') {
                handleViewChange('plan');
              } else if (activeView === 'plan') {
                handleViewChange('analysis');
              }
            }
          }}
          onDragEnd={(e, { offset }) => {
            const swipe = offset.x;

            // Update swipe logic to handle all three views
            if (swipe < -100) {
              // Swiping left (next)
              if (activeView === 'analysis') {
                handleViewChange('plan');
              } else if (activeView === 'plan') {
                handleViewChange('personalised');
              }
            } else if (swipe > 100) {
              // Swiping right (previous)
              if (activeView === 'personalised') {
                handleViewChange('plan');
              } else if (activeView === 'plan') {
                handleViewChange('analysis');
              }
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
                  next={() => handleViewChange('plan')}
                />
              </motion.div>
            ) : activeView === 'plan' ? (
              <motion.div
                key="plan"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <ActionPlan next={() => handleViewChange('personalised')} />
              </motion.div>
            ) : (
              <motion.div
                key="personalised"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
                style={{ width: '100%' }}
              >
                <CyberSafetyQuiz />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Box>
    </Box>
  );
}
