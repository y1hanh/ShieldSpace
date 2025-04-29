import { Box, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import QuizOption from './QuizOption';
import QuizCard from './QuizCard';
import { QuizCardProps, quizData } from './scenarioData';

export default function ScenarioBasedQuiz() {
  const [selectedQuiz, setSelectedQuiz] = useState<QuizCardProps | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardClick = (quiz: QuizCardProps, index: number) => {
    gsap.to(cardsRef.current[index], {
      duration: 0.3,
      scale: 1.2,
      zIndex: 100,
      ease: 'power2.out',
    });

    setTimeout(() => {
      setSelectedQuiz(quiz);
    }, 200);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#E6E0F4',
        width: '100%',
        overflow: 'auto',
      }}
    >
      {!selectedQuiz ? (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#4B3F72',
              textAlign: 'center',
              marginTop: { xs: 3, sm: 4 },
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
              padding: { xs: '0 10px', sm: '0 20px', md: '0' },
            }}
          >
            What would you do?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'stretch',
              justifyContent: 'center',
              gap: { xs: 3, sm: 4, md: 5 },
              maxWidth: { xs: '100%', sm: '600px', md: '1000px' },
              width: '100%',
              margin: '0 auto',
              padding: { xs: '10px', sm: '15px', md: '20px' },
              flex: 1,
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
                  flexDirection: 'column',
                  gap: 2,
                  width: { xs: '100%', md: '320px' },
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <QuizCard
                  key={quiz.scenario[0]}
                  {...quiz}
                  onClick={() => handleCardClick(quiz, index)}
                />
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <QuizOption
          key={selectedQuiz.scenario[0]}
          {...selectedQuiz}
          onClick={() => setSelectedQuiz(null)}
        />
      )}
    </Box>
  );
}
