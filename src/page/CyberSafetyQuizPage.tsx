import { useState, ReactNode } from 'react';
import { Box, Button, Typography, LinearProgress, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import trophy from '../animations/trophy.json';
import celebration from '../animations/celebration.json';
import { getSurvey } from '../api';
import { motion } from 'framer-motion';
import { useAssessment } from '../slice/assessmentSlice';

interface QuestionOption {
  label: string;
  value: string;
}

interface Question {
  text: string;
  options: QuestionOption[];
}

interface StyledButtonProps {
  children: ReactNode;
  onClick: () => void;
  endIcon?: ReactNode;
  bgColor?: string;
  textColor?: string;
}

function StyledButton({
  children,
  onClick,
  endIcon,
  bgColor = '#7C4DFF',
  textColor = 'white',
}: StyledButtonProps) {
  return (
    <Button
      variant="contained"
      endIcon={endIcon}
      onClick={onClick}
      sx={{
        backgroundColor: bgColor,
        color: textColor,
        textTransform: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        borderRadius: '12px',
        px: 3,
        py: 1.5,
        width: '100%',
        height: '56px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        '&:hover': {
          backgroundColor: bgColor,
          opacity: 0.9,
        },
      }}
    >
      {children}
    </Button>
  );
}

import { useMediaQuery, useTheme } from '@mui/material';

export default function CyberSafetyQuiz() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userInput } = useAssessment();
  const navigate = useNavigate();

  if (!userInput) {
    navigate('/error');
  }

  const [customActionResult, setCustomActionResult] = useState<null | {
    'immediate-action': string[];
    'long-term-skills': string[];
    'coping-advice': string[];
    'encouraging-words': string[];
  }>(null);

  const questions: Question[] = [
    {
      text: 'what is your first reaction to this message?',
      options: [
        { label: '😃 Happy', value: '1' },
        { label: '😐 Confused', value: '2' },
        { label: '😟 Sad', value: '3' },
        { label: '😡 Angry', value: '4' },
        { label: '😨 Scared', value: '5' },
      ],
    },
    {
      text: 'Do you think this message was meant to be hurtful?',
      options: [
        { label: '👍 No, it was just a joke', value: '1' },
        { label: '🤔 Maybe, not sure', value: '2' },
        { label: '👎 Yes, it was mean', value: '3' },
      ],
    },
    {
      text: 'If someone sent this to your friend, how should they react?',
      options: [
        { label: '🚫 Ignore it', value: '1' },
        { label: '🧑‍🏫 Tell a trusted adult', value: '2' },
        { label: '✍️ Reply back angrily', value: '3' },
        { label: '😢 Cry or feel bad', value: '4' },
      ],
    },
    {
      text: 'Have you seen or received a message like this before?',
      options: [
        { label: '🙅 Never', value: '1' },
        { label: '🔁 A few times', value: '2' },
        { label: '😞 Many times', value: '3' },
      ],
    },
    {
      text: 'What would you do if someone keeps sending mean messages to you?',
      options: [
        { label: '📱 Block them', value: '1' },
        { label: '👨‍👩‍👧‍👦 Tell my parents or teachers', value: '2' },
        { label: '🙃 Say something funny back', value: '3' },
        { label: '🤐 Keep it to myself', value: '4' },
      ],
    },
  ];

  function handleSelect(selectedValue: string) {
    setSelectedAnswer(selectedValue);
  }

  function handleContinue() {
    if (!selectedAnswer) {
      alert('Please select an option first.');
      return;
    }

    const currentQuestionKey = `q${currentStep + 1}`;
    const updatedAnswers = { ...answers, [currentQuestionKey]: selectedAnswer };
    const updatedPoints = totalPoints + getPointValue(currentQuestionKey, selectedAnswer);

    if (currentStep === questions.length - 1) {
      setAnswers(updatedAnswers);
      setTotalPoints(updatedPoints);
      finishQuiz(updatedAnswers);
    } else {
      setAnswers(updatedAnswers);
      setTotalPoints(updatedPoints);
      setCurrentStep(prev => prev + 1);
      setSelectedAnswer('');
    }
  }

  function finishQuiz(updatedAnswers: Record<string, string>) {
    setQuizFinished(true);

    const answerValues = Object.values(updatedAnswers);
    setIsLoading(true);

    getSurvey({ userInput, userAnswers: answerValues })
      .then(response => {
        setCustomActionResult(response);
      })
      .catch(error => {
        console.error('Error getting survey feedback:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handlePrevious() {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }

  function getPointValue(question: string, answer: string) {
    const pointsTable: Record<string, Record<string, number>> = {
      q1: { '1': 1, '2': 2, '3': 3, '4': 2, '5': 3 },
      q2: { '1': 1, '2': 2, '3': 3 },
      q3: { '1': 1, '2': 1, '3': 3, '4': 3 },
      q4: { '1': 1, '2': 2, '3': 3 },
      q5: { '1': 1, '2': 1, '3': 2, '4': 3 },
    };
    return pointsTable[question]?.[answer] || 0;
  }

  const progressPercent = ((currentStep + 1) / questions.length) * 100;

  return (
    <Box sx={{ minHeight: '100vh', p: isMobile ? 1 : 3 }}>
      <Box
        sx={{
          height: '100%',
          marginLeft: 'auto',
          marginRight: 'auto',
          mt: 6,
          mb: 4,
          p: isMobile ? 2 : 3,
          borderRadius: '20px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            backgroundColor: '#7C4DFF',
            p: 2,
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {quizFinished ? (
            isLoading ? (
              <Typography variant="h5" fontWeight="bold">
                Processing your plan...
              </Typography>
            ) : (
              <Typography variant="h5" fontWeight="bold">
                Your Plan is Ready!
              </Typography>
            )
          ) : (
            <Typography variant="h5" fontWeight="bold">
              We would like to hear your feelings{' '}
            </Typography>
          )}
          <Box mt={1}>
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{
                height: 8,
                borderRadius: 5,
                backgroundColor: '#FFF9C4',
                '& .MuiLinearProgress-bar': { backgroundColor: '#f2e767' },
              }}
            />
            <Typography variant="caption">
              {`Steps ${currentStep + 1}/${questions.length}`} - {Math.round(progressPercent)}%
              Complete
            </Typography>
          </Box>
        </Box>

        <Box>
          {!quizFinished ? (
            <Box textAlign={'center'} sx={{ px: '8rem' }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
                {questions[currentStep].text}
              </Typography>

              {questions[currentStep].options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedAnswer === option.value ? 'contained' : 'outlined'}
                  sx={{
                    mb: 2,
                    width: '100%',
                    borderColor: '#D1C4E9',
                    color: '#4A148C',
                    backgroundColor: selectedAnswer === option.value ? '#D1C4E9' : '#F3E5F5',
                    textTransform: 'none',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 500,
                    '&:hover': { backgroundColor: '#E1BEE7' },
                  }}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </Button>
              ))}

              <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  {currentStep > 0 && (
                    <Button
                      variant="outlined"
                      sx={{
                        justifyContent: 'flex-start',
                        borderColor: '#D1C4E9',
                        color: '#4A148C',
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 500,
                        '&:hover': { backgroundColor: '#E1BEE7' },
                      }}
                      onClick={handlePrevious}
                    >
                      Previous
                    </Button>
                  )}
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#7C4DFF', justifyContent: 'flex-end' }}
                    onClick={handleContinue}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box>
              {isLoading ? (
                <Box
                  sx={{
                    textAlign: 'center',
                    mt: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      mt: 2,
                      backgroundColor: '#FFF3E0',
                      width: { xs: 140, sm: 200 },
                      height: { xs: 140, sm: 200 },
                      borderRadius: '50%',
                      mx: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 3,
                    }}
                  >
                    <Lottie animationData={trophy} loop style={{ width: '100%', height: '100%' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ color: '#FF6B6B', display: 'flex', alignItems: 'center' }}
                  >
                    Completed!
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: '#FF6B6B', display: 'flex', alignItems: 'center' }}
                  >
                    We are processing your plan...
                  </Typography>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Lottie
                    animationData={celebration}
                    loop={false}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      zIndex: 0,
                      pointerEvents: 'none',
                      opacity: 0.4,
                    }}
                  />
                  <Box
                    sx={{
                      backgroundColor: '#F8F0FF',
                      borderRadius: '10px',
                      p: { xs: 2, sm: 2, md: 4, lg: 5 },
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        display: { xs: 'block', sm: 'none' },
                        textAlign: 'center',
                        fontWeight: 600,
                        mb: 2,
                        color: '#6A4CA7',
                      }}
                    >
                      Swipe on each card to see all tips!
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        px: { xs: 0.5, sm: 2, md: '4rem' },
                        pb: { xs: 1, sm: 0 },
                        overflowX: { xs: 'auto', sm: 'visible' },
                        overflowY: 'hidden',
                        WebkitOverflowScrolling: 'touch',
                        display: { xs: 'flex', sm: 'block' },
                        flexDirection: { xs: 'row', sm: 'column' },
                        gap: 2,
                        '::-webkit-scrollbar': {
                          display: { xs: 'none', sm: 'auto' },
                        },
                        scrollbarWidth: { xs: 'none', sm: 'auto' },
                      }}
                    >
                      {/* Section 1: Immediate Actions - Appears First */}
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        sx={{
                          backgroundColor: 'rgba(255, 107, 107, 0.1)',
                          borderRadius: '16px',
                          p: { xs: 1.5, sm: 2 },
                          mb: { xs: 0, sm: 3 },
                          border: '2px dashed #FF6B6B',
                          minWidth: { xs: '85vw', sm: 'auto' },
                          maxWidth: { xs: '85vw', sm: 'none' },
                          height: 'auto', // Remove fixed height to show all content
                          maxHeight: { sm: 'none' },
                          flexShrink: 0,
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#FF6B6B',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            fontWeight: 'bold',
                            mb: 1.5,
                            backgroundColor: 'rgba(255, 107, 107, 0.1)',
                            p: { xs: 1, sm: 0 },
                            borderRadius: { xs: '8px', sm: 0 },
                          }}
                        >
                          <span
                            role="img"
                            aria-label="star"
                            style={{
                              marginRight: '8px',
                              fontSize: '1.4rem',
                            }}
                          >
                            ⭐
                          </span>
                          What You Can Do Right Now
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            px: { xs: 1, sm: 0 },
                          }}
                        >
                          {customActionResult['immediate-action'].map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: '#FF6B6B',
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: 28,
                                  height: 28,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                ✅
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: { xs: '0.95rem', sm: '1rem' },
                                  lineHeight: 1.3,
                                }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* Section 2: Super Skills - Appears Second */}
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        sx={{
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          borderRadius: '16px',
                          p: { xs: 1.5, sm: 2 },
                          mb: { xs: 0, sm: 3 },
                          border: '2px dashed #4CAF50',
                          minWidth: { xs: '85vw', sm: 'auto' },
                          maxWidth: { xs: '85vw', sm: 'none' },
                          height: { xs: '320px', sm: 'auto' },
                          overflow: { xs: 'auto', sm: 'visible' },
                          flexShrink: 0,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#4CAF50',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            fontWeight: 'bold',
                            mb: 1.5,
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            p: { xs: 1, sm: 0 },
                            zIndex: 2,
                          }}
                        >
                          <Typography
                            component="span"
                            variant="inherit"
                            sx={{
                              fontSize: '1.4rem',
                              mr: 1,
                              display: 'flex',
                              alignItems: 'center',
                            }}
                            aria-label="growing"
                          >
                            🌱
                          </Typography>
                          Super Skills to Grow
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            px: { xs: 1, sm: 0 },
                          }}
                        >
                          {customActionResult['long-term-skills'].map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              <Typography
                                component="span"
                                sx={{
                                  backgroundColor: '#4CAF50',
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: 28,
                                  height: 28,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                  fontSize: '1rem',
                                  fontFamily: 'inherit',
                                }}
                              >
                                ✨
                              </Typography>
                              <Typography
                                variant="body1"
                                sx={{
                                  fontSize: { xs: '0.95rem', sm: '1rem' },
                                  lineHeight: 1.3,
                                }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* Section 3: Feeling Better Tips - Appears Third */}
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.8 }}
                        sx={{
                          backgroundColor: 'rgba(33, 150, 243, 0.1)',
                          borderRadius: '16px',
                          p: { xs: 1.5, sm: 2 },
                          mb: { xs: 0, sm: 3 },
                          border: '2px dashed #2196F3',
                          minWidth: { xs: '85vw', sm: 'auto' },
                          maxWidth: { xs: '85vw', sm: 'none' },
                          height: { xs: '320px', sm: 'auto' },
                          overflow: { xs: 'auto', sm: 'visible' },
                          flexShrink: 0,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#2196F3',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            fontWeight: 'bold',
                            mb: 1.5,
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            p: { xs: 1, sm: 0 },
                            zIndex: 2,
                          }}
                        >
                          <span
                            role="img"
                            aria-label="heart"
                            style={{
                              marginRight: '8px',
                              fontSize: '1.4rem',
                            }}
                          >
                            💙
                          </span>
                          Feeling Better Tips
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            px: { xs: 1, sm: 0 },
                          }}
                        >
                          {customActionResult['coping-advice'].map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: '#2196F3',
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: 28,
                                  height: 28,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                🦋
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: { xs: '0.95rem', sm: '1rem' },
                                  lineHeight: 1.3,
                                }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>

                      {/* Section 4: Happy Thoughts - Appears Last */}
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 2.1 }}
                        sx={{
                          backgroundColor: 'rgba(255, 193, 7, 0.1)',
                          borderRadius: '16px',
                          p: { xs: 1.5, sm: 2 },
                          mb: { xs: 0, sm: 2 },
                          border: '2px dashed #FFC107',
                          minWidth: { xs: '85vw', sm: 'auto' },
                          maxWidth: { xs: '85vw', sm: 'none' },
                          height: { xs: '320px', sm: 'auto' },
                          overflow: { xs: 'auto', sm: 'visible' },
                          flexShrink: 0,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: '#FFC107',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: { xs: '1rem', sm: '1.25rem' },
                            fontWeight: 'bold',
                            mb: 1.5,
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'rgba(255, 193, 7, 0.1)',
                            p: { xs: 1, sm: 0 },
                            zIndex: 2,
                          }}
                        >
                          <span
                            role="img"
                            aria-label="rainbow"
                            style={{
                              marginRight: '8px',
                              fontSize: '1.4rem',
                            }}
                          >
                            🌈
                          </span>
                          Happy Thoughts For You
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            px: { xs: 1, sm: 0 },
                          }}
                        >
                          {customActionResult['encouraging-words'].map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                backgroundColor: 'white',
                                borderRadius: '12px',
                                p: 1.5,
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 1.5,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  backgroundColor: '#FFC107',
                                  color: 'white',
                                  borderRadius: '50%',
                                  width: 28,
                                  height: 28,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                💖
                              </Box>
                              <Typography
                                sx={{
                                  fontSize: { xs: '0.95rem', sm: '1rem' },
                                  lineHeight: 1.3,
                                }}
                              >
                                {item}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>

                    {/* Mobile scroll indicator */}
                    <Box
                      sx={{
                        display: { xs: 'flex', sm: 'none' },
                        justifyContent: 'center',
                        mt: 1,
                        gap: 0.8,
                      }}
                    >
                      {[0, 1, 2, 3].map(i => (
                        <Box
                          key={i}
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: '#6A4CA7',
                            opacity: 0.3,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </>
              )}

              <Box mt={4} display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
                <StyledButton onClick={() => navigate('/resources')} bgColor="#43A047">
                  🧾 Scenario Challenge
                </StyledButton>

                <StyledButton
                  onClick={() => navigate('/community')}
                  bgColor="#FBC02D"
                  textColor="#333"
                >
                  📚 Learn More
                </StyledButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
