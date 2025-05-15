import { useState, ReactNode } from 'react';
import { Box, Button, Typography, LinearProgress, CircularProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react';
import trophy from '../animations/trophy.json';
import celebration from '../animations/celebration.json';
import { getSurvey } from '../api';

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

export default function CyberSafetyQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [totalPoints, setTotalPoints] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [customActionResult, setCustomActionResult] = useState<null | {
    'immediate-action': string[];
    'long-term-skills': string[];
    'coping-advice': string[];
    'encouraging-words': string[];
  }>(null);
  const navigate = useNavigate();

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
    const userInput = questions[0].text;
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
    <Box sx={{ minHeight: '100vh', p: 3 }}>
      <Box
        sx={{
          height: '100%',
          maxWidth: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
          mt: 6,
          mb: 4,
          p: 3,
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
          <Typography variant="h5" fontWeight="bold">
            We would like to hear your feelings
          </Typography>
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

        <Box p={3}>
          {!quizFinished ? (
            <Box>
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
            <Box textAlign="center">
              <Box
                sx={{
                  backgroundColor: '#FFF3E0',
                  width: { xs: 140, sm: 200},
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

              <Typography variant="h4" sx={{ mb: 2, color: '#7C4DFF', fontWeight: 'bold' }}>
                Completed!
              </Typography>

              {isLoading ? (
                <Box>
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
                  <Box sx={{ backgroundColor: '#F8F0FF', borderRadius: '20px', p: 3 }}>
                    <Box textAlign="left" sx={{ mt: 3 }}>
                      <Typography
                        variant="h6"
                        sx={{ color: '#FF6B6B', display: 'flex', alignItems: 'center' }}
                      >
                        <span role="img" aria-label="star" style={{ marginRight: '8px' }}>
                          ⭐
                        </span>
                        What You Can Do Right Now
                      </Typography>
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {customActionResult['immediate-action'].map((item, index) => (
                          <li
                            key={index}
                            style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
                          >
                            <span role="img" aria-label="checkmark" style={{ marginRight: '8px' }}>
                              ✅
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Typography
                        variant="h6"
                        sx={{ mt: 2, color: '#4CAF50', display: 'flex', alignItems: 'center' }}
                      >
                        <span role="img" aria-label="growing" style={{ marginRight: '8px' }}>
                          🌱
                        </span>
                        Super Skills to Grow
                      </Typography>
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {customActionResult['long-term-skills'].map((item, index) => (
                          <li
                            key={index}
                            style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
                          >
                            <span role="img" aria-label="sparkle" style={{ marginRight: '8px' }}>
                              ✨
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Typography
                        variant="h6"
                        sx={{ mt: 2, color: '#2196F3', display: 'flex', alignItems: 'center' }}
                      >
                        <span role="img" aria-label="heart" style={{ marginRight: '8px' }}>
                          💙
                        </span>
                        Feeling Better Tips
                      </Typography>
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {customActionResult['coping-advice'].map((item, index) => (
                          <li
                            key={index}
                            style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
                          >
                            <span role="img" aria-label="butterfly" style={{ marginRight: '8px' }}>
                              🦋
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Typography
                        variant="h6"
                        sx={{ mt: 2, color: '#FFC107', display: 'flex', alignItems: 'center' }}
                      >
                        <span role="img" aria-label="rainbow" style={{ marginRight: '8px' }}>
                          🌈
                        </span>
                        Happy Thoughts For You
                      </Typography>
                      <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {customActionResult['encouraging-words'].map((item, index) => (
                          <li
                            key={index}
                            style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}
                          >
                            <span
                              role="img"
                              aria-label="sparkle-heart"
                              style={{ marginRight: '8px' }}
                            >
                              💖
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Box>
                </>
              )}

              <Box mt={4} display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
                <StyledButton
                  onClick={() => navigate('/')}
                  bgColor="#7C4DFF"
                  endIcon={<ArrowForwardIcon />}
                >
                  Home Page
                </StyledButton>
                <StyledButton onClick={() => navigate('/resources')} bgColor="#43A047">
                  🧾 Scenario Challenge
                </StyledButton>
                <StyledButton onClick={() => navigate('/analytics')} bgColor="#1E88E5">
                  📈 Analytics
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
