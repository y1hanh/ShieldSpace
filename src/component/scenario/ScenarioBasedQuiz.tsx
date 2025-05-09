import { Box, Button, Typography } from '@mui/material';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import QuizOption from './QuizOption';
import QuizCard from './QuizCard';
import { quizData } from './scenarioData';
import ScenarioStoryTelling from './ScenarioStoryTelling';

export default function ScenarioBasedQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [rightOptions, setRightOptions] = useState<number[]>(new Array(quizData.length).fill(null));

  const handleCardClick = (index?: number) => {
    gsap.to(cardsRef.current[index], {
      duration: 0.3,
      scale: 1.2,
      zIndex: 100,
      ease: 'power2.out',
    });

    setTimeout(() => {
      setSelectedQuiz(index);
    }, 200);
  };

  const switchQuiz = (index: number, direction: number) => {
    if (index + direction < 0) {
      setSelectedQuiz(quizData.length - 1);
    } else if (index + direction > quizData.length - 1) {
      setSelectedQuiz(0);
    } else {
      setSelectedQuiz(index + direction);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {rightOptions.every(option => option != null) ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            textAlign: 'center',
            animation: 'fadeIn 0.5s ease-in',
            '@keyframes fadeIn': {
              '0%': { opacity: 0, transform: 'translateY(20px)' },
              '100%': { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: '120px', sm: '150px' },
              height: { xs: '120px', sm: '150px' },
              marginBottom: 2,
              animation: 'bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              '@keyframes bounceIn': {
                '0%': { transform: 'scale(0.3)', opacity: 0 },
                '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
            }}
          >
            {(() => {
              const score = rightOptions.filter(option => option === 1).length;
              const totalQuestions = quizData.length;
              const percentage = (score / totalQuestions) * 100;

              if (percentage >= 75) {
                return (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: '#4CAF50',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 20px rgba(76, 175, 80, 0.3)',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: { xs: '3rem', sm: '4rem' },
                        fontWeight: 'bold',
                      }}
                    >
                      🎉
                    </Typography>
                  </Box>
                );
              } else if (percentage >= 50) {
                return (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: '#FFC107',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 20px rgba(255, 193, 7, 0.3)',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: { xs: '3rem', sm: '4rem' },
                        fontWeight: 'bold',
                      }}
                    >
                      ✨
                    </Typography>
                  </Box>
                );
              } else {
                return (
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: '#FF9800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 20px rgba(255, 152, 0, 0.3)',
                    }}
                  >
                    <Typography
                      sx={{
                        color: 'white',
                        fontSize: { xs: '3rem', sm: '4rem' },
                        fontWeight: 'bold',
                      }}
                    >
                      💪
                    </Typography>
                  </Box>
                );
              }
            })()}
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: '#4B3F72',
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', sm: '2.25rem' },
              animation: 'slideIn 0.5s ease-out 0.2s both',
              '@keyframes slideIn': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            Completed!
          </Typography>

          <Typography
            sx={{
              color: '#4B3F72',
              fontSize: { xs: '1.1rem', sm: '1.3rem' },
              animation: 'slideIn 0.5s ease-out 0.3s both',
            }}
          >
            Your Score: {rightOptions.filter(option => option === 1).length} / {quizData.length}
          </Typography>

          {(() => {
            const score = rightOptions.filter(option => option === 1).length;
            const totalQuestions = quizData.length;
            const percentage = (score / totalQuestions) * 100;

            if (percentage >= 75) {
              return (
                <Typography
                  sx={{
                    color: '#4B3F72',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    animation: 'slideIn 0.5s ease-out 0.4s both',
                    fontWeight: 'bold',
                  }}
                >
                  You did great! Keep protecting everyone from bullying! 🌟
                </Typography>
              );
            } else if (percentage >= 50) {
              return (
                <Typography
                  sx={{
                    color: '#4B3F72',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    animation: 'slideIn 0.5s ease-out 0.4s both',
                    fontWeight: 'bold',
                  }}
                >
                  Keep trying! Let's protect everyone from bullying! ✨
                </Typography>
              );
            } else {
              return (
                <Typography
                  sx={{
                    color: '#4B3F72',
                    fontSize: { xs: '1rem', sm: '1.2rem' },
                    animation: 'slideIn 0.5s ease-out 0.4s both',
                    fontWeight: 'bold',
                  }}
                >
                  You can do better! Keep protecting everyone from bullying! 💪
                </Typography>
              );
            }
          })()}

          <Button
            variant="contained"
            sx={{
              backgroundColor: '#4B3F72',
              color: 'white',
              padding: { xs: '12px 24px', sm: '14px 28px' },
              fontSize: { xs: '1rem', sm: '1.1rem' },
              borderRadius: '30px',
              textTransform: 'none',
              animation: 'slideIn 0.5s ease-out 0.5s both',
              '&:hover': {
                backgroundColor: '#3c325b',
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              },
              transition: 'all 0.3s ease',
            }}
            onClick={() => {
              setSelectedQuiz(null);
              setRightOptions(new Array(quizData.length).fill(null));
            }}
          >
            Try Again
          </Button>
        </Box>
      ) : selectedQuiz === null ? (
        <QuizSelector handleCardClick={handleCardClick} cardsRef={cardsRef} />
      ) : (
        <OptionSelector
          selectedQuiz={selectedQuiz}
          switchQuiz={switchQuiz}
          setSelectedQuiz={setSelectedQuiz}
          setRightOptions={setRightOptions}
        />
      )}
    </Box>
  );
}

function OptionSelector({
  selectedQuiz,
  switchQuiz,
  setSelectedQuiz,
  setRightOptions,
}: {
  selectedQuiz: number;
  switchQuiz: (index: number, direction: number) => void;
  setSelectedQuiz: (index: number) => void;
  setRightOptions: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        gap: { xs: 2, sm: 4 },
        width: '100%',
        maxWidth: '100%',
      }}
    >
      <Button
        onClick={() => switchQuiz(selectedQuiz, -1)}
        variant="contained"
        sx={{
          minWidth: '120px',
          order: { xs: 2, sm: 1 },
          backgroundColor: '#4B3F72',
          padding: { xs: '8px 16px', sm: '10px 20px' },
          fontSize: { xs: '0.9rem', sm: '1rem' },
          '&:hover': {
            backgroundColor: '#3c325b',
          },
        }}
      >
        {'< Previous'}
      </Button>

      <Box
        sx={{
          flex: 1,
          order: { xs: 1, sm: 2 },
          width: '100%',
        }}
      >
        <QuizOption
          key={quizData[selectedQuiz].scenario[0]}
          {...quizData[selectedQuiz]}
          onClick={() => setSelectedQuiz(null)}
          saveOptions={(right: number) => {
            setRightOptions(prev => {
              const newRightOptions = [...prev];
              newRightOptions[selectedQuiz] = right;
              return newRightOptions;
            });
          }}
        />
      </Box>

      <Button
        onClick={() => switchQuiz(selectedQuiz, 1)}
        variant="contained"
        sx={{
          minWidth: '120px',
          order: { xs: 3, sm: 3 },
          backgroundColor: '#4B3F72',
          padding: { xs: '8px 16px', sm: '10px 20px' },
          fontSize: { xs: '0.9rem', sm: '1rem' },
          '&:hover': {
            backgroundColor: '#3c325b',
          },
        }}
      >
        {'Next >'}
      </Button>
    </Box>
  );
}

function QuizSelector({
  handleCardClick,
  cardsRef,
}: {
  handleCardClick: (index: number) => void;
  cardsRef: React.RefObject<HTMLDivElement[]>;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: { xs: '100%', sm: '600px', md: '1000px' },
        width: '100%',
        margin: '0 auto',
      }}
    >
      <ScenarioStoryTelling />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, sm: 4, md: 5 },
          alignItems: 'center',
        }}
      >
        {quizData.map((quiz, index) => (
          <Box
            key={quiz.scenario[0]}
            ref={(el: HTMLDivElement | null) => {
              cardsRef.current[index] = el;
            }}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              width: { xs: '280px', md: '320px' },
              alignItems: 'center',
            }}
          >
            <QuizCard key={quiz.scenario[0]} {...quiz} onClick={() => handleCardClick(index)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
