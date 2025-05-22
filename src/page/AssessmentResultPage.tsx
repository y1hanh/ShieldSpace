import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { MessageAnalysis } from '../component/assessment/MessageAnalysis';
import { ActionPlan } from '../component/assessment/ActionPlan';
import { useAssessment } from '../slice/assessmentSlice';
import { isEmpty } from 'lodash';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ResultsPage() {
  const { userInput, analysisResult } = useAssessment();
  const navigate = useNavigate();
  if (!userInput) {
    navigate('/error');
  }
  const isBullying = analysisResult?.toxic_level > 0.1 || !isEmpty(analysisResult?.bias);
  const [activeView, setActiveView] = useState<'analysis' | 'plan'>('analysis');
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

  const handleViewChange = (view: 'analysis' | 'plan') => {
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
          {/* This empty box serves as a spacer to prevent page jumping when nav becomes fixed */}
          {isScrolled && (
            <Box
              sx={{
                height: { xs: '70px', md: '60px' },
                mb: 5,
                mt: 3,
                visibility: 'hidden',
              }}
            />
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: isScrolled ? 'flex-end' : 'center',
              alignItems: 'center',
              mb: isScrolled ? 0 : 2,
              mt: isScrolled ? 0 : 10,
              position: isScrolled ? 'fixed' : '',
              top: isScrolled ? '50%' : 'auto',
              right: isScrolled ? 0 : 'auto',
              left: 0,
              width: '100%',
              transform: isScrolled ? 'translateY(-50%)' : 'none',
              zIndex: 1000,
              transition: 'all 0.3s ease',
              pointerEvents: 'none',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: isScrolled ? 'column' : 'row',
                backgroundColor: isScrolled ? 'rgba(244, 241, 250, 0.95)' : '#f4f1fa',
                borderRadius: isScrolled ? '30px 0 0 30px' : '30px',
                padding: isScrolled ? '12px 12px 12px 8px' : '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                border: '1px solid #e0e0e0',
                maxWidth: isScrolled ? 'auto' : '800px',
                pointerEvents: 'auto',
                position: 'relative',
                overflow: 'visible',
                // Add a pulsing glow animation when scrolled
                animation: isScrolled ? 'pulseGlow 2s infinite alternate' : 'none',
                '@keyframes pulseGlow': {
                  '0%': { boxShadow: '0 4px 12px rgba(106, 76, 167, 0.2)' },
                  '100%': { boxShadow: '0 4px 16px rgba(106, 76, 167, 0.6)' },
                },
              }}
            >
              <Button
                onClick={() => handleViewChange('analysis')}
                sx={{
                  padding: isScrolled ? '12px' : '10px 20px',
                  minWidth: isScrolled ? '50px' : 'auto',
                  borderRadius: isScrolled ? '50%' : '25px',
                  backgroundColor: activeView === 'analysis' ? '#6A4CA7' : 'transparent',
                  color: activeView === 'analysis' ? 'white' : '#6A4CA7',
                  fontWeight: 600,
                  fontSize: isScrolled ? '1rem' : '1.5rem',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  marginBottom: isScrolled ? 1 : 0,
                  position: 'relative',
                  '&:hover': {
                    backgroundColor:
                      activeView === 'analysis' ? '#5d3e95' : 'rgba(106, 76, 167, 0.1)',
                  },
                  '&:hover::after': isScrolled
                    ? {
                        content: '"Analysis"',
                        position: 'absolute',
                        right: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#6A4CA7',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        marginRight: '8px',
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }
                    : {},
                  '& .MuiButton-startIcon': {
                    margin: isScrolled ? 0 : '0 8px 0 0',
                  },
                }}
              >
                {isScrolled ? '1' : 'Step 1: Message Analysis'}
              </Button>

              <Button
                onClick={() => handleViewChange('plan')}
                sx={{
                  padding: isScrolled ? '12px' : '10px 20px',
                  minWidth: isScrolled ? '50px' : 'auto',
                  borderRadius: isScrolled ? '50%' : '25px',
                  backgroundColor: activeView === 'plan' ? '#6A4CA7' : 'transparent',
                  color: activeView === 'plan' ? 'white' : '#6A4CA7',
                  fontWeight: 600,
                  fontSize: isScrolled ? '1rem' : '1.5rem',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: activeView === 'plan' ? '#5d3e95' : 'rgba(106, 76, 167, 0.1)',
                  },
                  '&:hover::after': isScrolled
                    ? {
                        content: '"Support Plan"',
                        position: 'absolute',
                        right: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#6A4CA7',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        marginRight: '8px',
                        fontSize: '0.75rem',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }
                    : {},
                }}
              >
                {isScrolled ? '2' : 'Step 2: Support Plan'}
              </Button>
            </Box>
          </Box>
        </>
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
          style={{ width: '100%', touchAction: 'pan-y' }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={(e, { offset }) => {
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
                  next={() => handleViewChange('plan')}
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
  );
}
