import { Box, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import QuizOption from './QuizOption';
import QuizCard from './QuizCard';
import { QuizCardProps, quizData } from './scenarioData';

export default function ScenarioBasedQuiz() {
  const theme = useTheme();

  const [selectedQuiz, setSelectedQuiz] = useState<QuizCardProps | null>(null);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#E6E0F4',
        width: '100%',
        height: { xs: '600px', sm: '700px', md: '800px' },
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
            {quizData.map(quiz => (
              <Box
                key={quiz.scenario[0]}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  width: { xs: '100%', md: '320px' },
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    width: { xs: '280px', sm: '300px', md: '320px' },
                    height: { xs: '30px', sm: '40px', md: '50px' },
                    padding: '16px',
                  }}
                >
                  <ul
                    style={{
                      listStyle: 'none',
                      margin: 0,
                      padding: 0,
                      color: '#4B3F72',
                    }}
                  >
                    {quiz.scenario.map(scenario => (
                      <li
                        key={scenario}
                        style={{
                          marginBottom: '5px',
                          fontSize: '1rem',
                          lineHeight: '1.4',
                          textAlign: 'center',
                          fontWeight: 'bold',
                        }}
                      >
                        {scenario}
                      </li>
                    ))}
                  </ul>
                </Box>
                <QuizCard
                  key={quiz.scenario[0]}
                  {...quiz}
                  onClick={() => {
                    setSelectedQuiz(quiz);
                  }}
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
