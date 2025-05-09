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
  const [tips, setTips] = useState<string[]>([]);
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
      // TODO: save updatedAnswers
      console.log('Final Answers:', updatedAnswers);
      setAnswers(updatedAnswers);
      setTotalPoints(updatedPoints);
      finishQuiz(updatedAnswers, updatedPoints);
    } else {
      setAnswers(updatedAnswers);
      setTotalPoints(updatedPoints);
      setCurrentStep(prev => prev + 1);
      setSelectedAnswer('');
    }
  }

  function finishQuiz(updatedAnswers: Record<string, string>, updatedPoints: number) {
    setQuizFinished(true);
    setFinalFeedback(generateFeedback(updatedAnswers, updatedPoints));
    setTips(getRandomTips());
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

    const q1 = answers.q1;
    const q2 = answers.q2;
    const q3 = answers.q3;
    const q4 = answers.q4;
    const q5 = answers.q5;

    if (q1 === '3' || q4 === '3') {
      feedbackParts.push(
        "You sometimes feel overwhelmed. It's important to reach out and talk to someone!"
      );
    } else if (q1 === '5') {
      feedbackParts.push(
        "Feeling scared is normal. Remember, you're not alone and help is always available!"
      );
    } else {
      feedbackParts.push('You are handling things positively! Stay strong.');
    }

    if (q2 === '2') {
      feedbackParts.push(
        "When you're unsure if a message is mean or just silly, it's always a good idea to ask a grown-up for guidance."
      );
    } else if (q2 === '3') {
      feedbackParts.push(
        'Noticing that a message could hurt shows how much you care about kindness. Trust your feelings!'
      );
    } else {
      feedbackParts.push(
        "It's great that you can see the fun side of things—it keeps your day bright!"
      );
    }

    if (q3 === '1') {
      feedbackParts.push(
        'Ignoring a mean message sometimes protects your mood—like skipping over a puddle to keep your shoes dry.'
      );
    } else if (q3 === '2') {
      feedbackParts.push(
        'Talking to a trusted adult is like having a superhero by your side—it makes you stronger!'
      );
    } else if (q3 === '3') {
      feedbackParts.push(
        'Even if anger tempts you to shout back, a calm reply can help clear the storm and bring back the sunshine.'
      );
    } else if (q3 === '4') {
      feedbackParts.push(
        'Crying shows you have a caring heart. Sharing your feelings can help clear away the clouds.'
      );
    }

    if (q4 === '3') {
      feedbackParts.push(
        'Seeing lots of hurtful messages can feel heavy—sharing your feelings can let the sunshine in.'
      );
    } else if (q4 === '2') {
      feedbackParts.push(
        'Even a few mean messages help you learn how to protect your smile and grow stronger.'
      );
    } else {
      feedbackParts.push(
        'It looks like your online world is mostly kind—a wonderful space to be in!'
      );
    }

    if (q5 === '4') {
      feedbackParts.push(
        'Although keeping your feelings inside might seem easier sometimes, sharing them can really help you feel lighter.'
      );
    } else if (q5 === '1') {
      feedbackParts.push(
        'Blocking mean messages is a smart way to protect your space—like closing a door to keep the cold wind out.'
      );
    } else if (q5 === '2') {
      feedbackParts.push(
        'Telling your parents or teachers is a brave move—it invites caring support when you need it.'
      );
    } else if (q5 === '3') {
      feedbackParts.push(
        'Using humor to respond can sometimes turn a frown upside down and brighten the moment.'
      );
    }

    const feedbackShortMap: Record<string, string> = {
      "You sometimes feel overwhelmed. It's important to reach out and talk to someone!":
        "You're feeling overwhelmed—talk to someone!",
      "Feeling scared is normal. Remember, you're not alone and help is always available!":
        "It's okay to feel scared. You're not alone!",
      'You are handling things positively! Stay strong.': "You're doing great—stay strong!",
      "When you're unsure if a message is mean or just silly, it's always a good idea to ask a grown-up for guidance.":
        'Not sure? Ask a grown-up!',
      'Noticing that a message could hurt shows how much you care about kindness. Trust your feelings!':
        'You care about kindness. Trust your feelings!',
      "It's great that you can see the fun side of things—it keeps your day bright!":
        'Seeing fun in things is awesome!',
      'Ignoring a mean message sometimes protects your mood—like skipping over a puddle to keep your shoes dry.':
        'Ignoring helps protect your feelings.',
      'Talking to a trusted adult is like having a superhero by your side—it makes you stronger!':
        'Telling an adult makes you stronger!',
      'Even if anger tempts you to shout back, a calm reply can help clear the storm and bring back the sunshine.':
        'Stay calm—it helps more than shouting.',
      'Crying shows you have a caring heart. Sharing your feelings can help clear away the clouds.':
        "Crying is okay. You're caring!",
      'Seeing lots of hurtful messages can feel heavy—sharing your feelings can let the sunshine in.':
        'Talk about hurtful messages—it helps!',
      'Even a few mean messages help you learn how to protect your smile and grow stronger.':
        'Mean messages help you grow stronger.',
      'It looks like your online world is mostly kind—a wonderful space to be in!':
        "You're in a kind online space—yay!",
      'Although keeping your feelings inside might seem easier sometimes, sharing them can really help you feel lighter.':
        "Don't bottle it up—sharing helps!",
      'Blocking mean messages is a smart way to protect your space—like closing a door to keep the cold wind out.':
        'Blocking bad messages protects you!',
      'Telling your parents or teachers is a brave move—it invites caring support when you need it.':
        'Telling adults is brave and smart!',
      'Using humor to respond can sometimes turn a frown upside down and brighten the moment.':
        'Humor can brighten things up!',
    };

    const shortenedFeedback = feedbackParts.map(sentence => feedbackShortMap[sentence] || sentence);

    const [badge, levelMessage] = getBadge(points);
    return `${shortenedFeedback.join(' ')} You earned ${points} points and the badge: "${badge}". ${levelMessage}`;
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

  //tips
  const allTips = [
    'If you ever feel upset or confused, try taking three deep, slow breaths—it can help you calm down.',
    "Remember, it's always a good idea to talk to someone you trust when something feels wrong.",
    "If you see unkind messages, don't let them ruin your day. Focus on the things that make you happy!",
    'Keep a fun journal where you draw or write about your favorite moments—it can brighten even a cloudy day.',
    'Be kind to yourself. Everyone has tough days, but you have the strength to overcome them!',
    'Sharing your feelings is brave. It helps you feel understood and supported.',
    "Sometimes, a little humor can turn a bad day around. Don't be afraid to laugh!",
    "Always remember that your feelings matter, and it's okay to ask for help when you need it.",
  ];

  function getRandomTips(count = 3): string[] {
    const shuffled = [...allTips].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const progressPercent = ((currentStep + 1) / questions.length) * 100;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 3,
      }}
    >
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
                Completed!
              </Typography>

              {/* Final feedback in a soft box */}
              <Box
                sx={{
                  backgroundColor: '#F8F0FF',
                  px: 4,
                  py: 3,
                  borderRadius: '16px',
                  maxWidth: 500,
                  mx: 'auto',
                  mb: 4,
                  fontSize: '1.1rem',
                  color: '#4A148C',
                  textAlign: 'left',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(124, 77, 255, 0.1)',
                }}
              >
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  <ul style={{ paddingLeft: '1.2rem' }}>
                    {(() => {
                      const parts = finalFeedback.split(/(".*?"|\d+)/g).filter(p => p && p.trim());
                      console.log('parts[0]: ', parts[0]);
                      console.log('parts[1]: ', parts[1]);
                      console.log('parts[2]: ', parts[2]);
                      console.log('parts[3]: ', parts[3]);
                      console.log('parts[4]: ', parts[4]);
                      console.log('parts[5]: ', parts[5]);
                      const cleaned = parts[0].split('You earned')[0].trim();
                      const lines = cleaned
                        .split('. ')
                        .map(line => line.trim())
                        .filter(line => line.length > 0);
                      console.log('lines: ', lines);

                      for (let i = lines.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [lines[i], lines[j]] = [lines[j], lines[i]];
                      }

                      console.log('shuffled & extended lines:', lines);

                      const badge = parts[3]?.replace(/"/g, '');
                      const finalLine = parts[4]?.replace(/^\s*\./, '').trim();

                      return (
                        <>
                          {/* Points and Badge Box */}
                          <li
                            style={{
                              marginBottom: '20px',
                              lineHeight: '1.7',
                              listStyle: 'none',
                              textAlign: 'center',
                              // mx: 'auto',
                            }}
                          >
                            <Box
                              sx={{
                                backgroundColor: '#F3E5F5',
                                borderRadius: '12px',
                                px: 2,
                                py: 1.5,
                                display: 'inline-block',
                                fontSize: '1.3rem',
                                mx: 'auto',
                              }}
                            >
                              <Box
                                component="div"
                                sx={{
                                  fontSize: '1.3rem',
                                }}
                              >
                                <Box component="span" sx={{ fontWeight: 500, color: '#4A148C' }}>
                                  🏅🛡️{' '}
                                </Box>
                                <Box component="span" sx={{ fontWeight: 'bold', color: '#7C4DFF' }}>
                                  {badge?.toUpperCase()}
                                </Box>
                              </Box>
                            </Box>
                          </li>

                          {/* Feedback Messages */}
                          {lines.map((line, idx) => (
                            <li
                              key={idx}
                              style={{
                                marginBottom: '10px',
                                lineHeight: '1.7',
                                listStyle: 'none',
                                position: 'relative',
                                paddingLeft: '25px',
                                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                              }}
                            >
                              <span
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  color: '#7C4DFF',
                                }}
                              >
                                ✓
                              </span>
                              {line}
                            </li>
                          ))}

                          {finalLine && (
                            <li
                              style={{
                                marginBottom: '10px',
                                lineHeight: '1.7',
                                listStyle: 'none',
                                position: 'relative',
                                paddingLeft: '25px',
                                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                              }}
                            >
                              <span
                                style={{
                                  position: 'absolute',
                                  left: 0,
                                  color: '#7C4DFF',
                                }}
                              >
                                ✓
                              </span>
                              {finalLine}
                            </li>
                          )}
                        </>
                      );
                    })()}
                  </ul>
                </Typography>
                {quizFinished && (
                  <Box sx={{ mt: 4 }}>
                    <Typography variant="h6" fontWeight="bold" color="#4B4072" gutterBottom>
                      🌟 Helpful Tips
                    </Typography>
                    <ul style={{ paddingLeft: '1.5rem' }}>
                      {tips.map((tip, index) => (
                        <li key={index} style={{ fontSize: '1rem',marginBottom: '10px', lineHeight: '1.6', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
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
                <StyledButton onClick={() => navigate('/resources')} bgColor="#43A047">
                  🧾 More quizzes
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
