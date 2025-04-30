import { useState, ReactNode } from 'react';
import { Box, Button, Typography, LinearProgress } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';

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
  const [finalFeedback, setFinalFeedback] = useState('');
  const navigate = useNavigate();

  const questions: Question[] = [
    {
      text: 'How did this message make you feel?',
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
    setAnswers(prev => ({ ...prev, [currentQuestionKey]: selectedAnswer }));

    const points = getPointValue(currentQuestionKey, selectedAnswer);
    setTotalPoints(prev => prev + points);

    if (currentStep === questions.length - 1) {
      finishQuiz();
    } else {
      setCurrentStep(prev => prev + 1);
      setSelectedAnswer('');
    }
  }

  function finishQuiz() {
    setQuizFinished(true);
    setFinalFeedback(generateFeedback(answers, totalPoints));
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

  function generateFeedback(answers: Record<string, string>, points: number) {
    const feedbackParts: string[] = [];

    if (answers.q1 === '3' || answers.q4 === '3') {
      feedbackParts.push(
        "You sometimes feel overwhelmed. It's important to reach out and talk to someone!"
      );
    } else if (answers.q1 === '5') {
      feedbackParts.push(
        "Feeling scared is normal. Remember, you're not alone and help is always available!"
      );
    } else {
      feedbackParts.push('You are handling things positively! Stay strong.');
    }

    if (answers.q2 === '2') {
      feedbackParts.push('When unsure, always ask a grown-up for advice.');
    } else if (answers.q2 === '3') {
      feedbackParts.push('Recognizing meanness shows your strong sense of kindness and fairness!');
    }

    if (answers.q3 === '1') {
      feedbackParts.push('Ignoring a mean message can sometimes protect your feelings.');
    } else if (answers.q3 === '2') {
      feedbackParts.push('Telling a trusted adult is always a brave and wise choice.');
    }

    const [badge, levelMessage] = getBadge(points);
    return `${feedbackParts.join(' ')} You earned ${points} points and the badge: "${badge}". ${levelMessage}`;
  }

  function getBadge(points: number): [string, string] {
    if (points >= 14) {
      return ['Kind Champion', "You're a true champion of kindness and bravery!"];
    } else if (points >= 10) {
      return ['Brave Explorer', 'You explore feelings with courage and care!'];
    } else {
      return ['Caring Star', 'You shine bright with care and positivity!'];
    }
  }

  const progressPercent = ((currentStep + 1) / questions.length) * 100;

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
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
          Cyber Safety Quiz
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
            {`Question ${currentStep + 1}/${questions.length}`} - {Math.round(progressPercent)}%
            Complete
          </Typography>
        </Box>
      </Box>

      <Box p={3}>
        {!quizFinished ? (
          <>
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
          </>
        ) : (
          <Box textAlign="center">
            {/* Trophy Image */}
            <Box
              sx={{
                backgroundColor: '#FFF3E0',
                width: 120,
                height: 120,
                borderRadius: '50%',
                mx: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h1" component="div">
                🏆
              </Typography>
            </Box>

            {/* Title */}
            <Typography variant="h4" sx={{ mb: 2, color: '#7C4DFF', fontWeight: 'bold' }}>
              Quiz Completed!
            </Typography>

            {/* Final feedback in a soft box */}
            <Box
              sx={{
                backgroundColor: '#F3E5F5',
                px: 4,
                py: 3,
                borderRadius: '16px',
                maxWidth: 500,
                mx: 'auto',
                mb: 4,
                fontSize: '1rem',
                color: '#4A148C',
                textAlign: 'left',
              }}
            >
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                <ul style={{ paddingLeft: '1.2rem' }}>
                  {(() => {
                    const parts = finalFeedback.split(/(".*?"|\d+)/g).filter(p => p && p.trim());
                    const beforeRecognizing = parts[0].split('Recognizing')[0]?.trim();
                    //console.log('beforeRecognizing:', beforeRecognizing);
                    const afterRecognizing = parts[0].includes('Recognizing')
                      ? 'Recognizing ' +
                        parts[0].split('Recognizing')[1].replace('You earned', '').trim()
                      : '';
                    // console.log('afterRecognizing:', afterRecognizing);

                    const points = parts[1];
                    const pointsText = parts[2].replace(' and the badge:', '').trim();
                    const badge = parts[3]?.replace(/"/g, '');
                    console.log('badge:', badge);

                    const finalLine = parts[4]?.replace(/^\s*\./, '').trim();

                    return (
                      <>
                        <li style={{ marginBottom: '20px', lineHeight: '1.7', listStyle: 'none',textAlign: 'center' }}>
                          <Box
                            sx={{
                              backgroundColor: '#E1BEE7',
                              borderRadius: '12px',
                              px: 2,
                              py: 1.5,
                              display: 'inline-block',
                              fontSize: '1.3rem'
                            }}
                          >
                            🏅 You earned{' '}
                            <Box
                              component="span"
                              sx={{ fontWeight: 'bold', color: 'red', display: 'inline' }}
                            >
                              {points}
                            </Box>{' '}
                            {pointsText}
                            <Box
                              component="div"
                              sx={{
                                fontSize: '1.3rem',
                                mt: 1,
                              }}
                            >
                              <Box component="span" sx={{ fontWeight: 500, color: '#4A148C' }}>
                              🛡️ {' '}
                              </Box>
                              <Box component="span" sx={{ fontWeight: 'bold', color: '#7C4DFF' }}>
                                {badge?.toUpperCase()}
                              </Box>
                            </Box>
                          </Box>
                        </li>
                        {/* Bullet 1 */}
                        {beforeRecognizing && (
                          <li style={{ marginBottom: '10px', lineHeight: '1.7' }}>
                            {beforeRecognizing}
                          </li>
                        )}

                        {/* Bullet 2 */}
                        {afterRecognizing && (
                          <li style={{ marginBottom: '10px', lineHeight: '1.7' }}>
                            {afterRecognizing}
                          </li>
                        )}

                        {/* Bullet 3 */}
                        

                        {/* Bullet 4 */}
                        {finalLine && (
                          <li style={{ marginBottom: '10px', lineHeight: '1.7' }}>{finalLine}</li>
                        )}
                      </>
                    );
                  })()}
                </ul>
              </Typography>
            </Box>

            {/* Button */}
            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
              gap={2}
              maxWidth="500px"
              mx="auto"
            >
              <StyledButton
                onClick={() => navigate('/')}
                bgColor="#7C4DFF"
                endIcon={<ArrowForwardIcon />}
              >
                Home Page
              </StyledButton>
              <StyledButton onClick={() => navigate('/ScenarioBasedQuiz')} bgColor="#43A047">
                🧾 More Quizs
              </StyledButton>
              <StyledButton onClick={() => navigate('/analytics')} bgColor="#1E88E5">
                📈 Analysis Overview
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
  );
}
