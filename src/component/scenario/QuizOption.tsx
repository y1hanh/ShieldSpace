import { Box, Button, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Lottie from 'lottie-react';

interface QuizOptionProps {
  animation: string;
  scenario: string[];
  choices: {
    text: string;
    feedback: string;
    right?: boolean;
  }[];
  onClick: () => void;
  saveOptions: (right: number) => void;
}

export default function QuizOption({
  scenario,
  choices,
  animation,
  onClick,
  saveOptions,
}: QuizOptionProps) {
  const [selectedOption, setSelectedOption] = useState<{
    text: string;
    feedback: string;
    right?: boolean;
  } | null>(null);

  const optionsContainerRef = useRef<HTMLDivElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedOption) {
      gsap.to(optionsContainerRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.fromTo(
        feedbackRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.2,
          ease: 'power2.out',
        }
      );
    } else {
      gsap.fromTo(
        optionsContainerRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        }
      );
    }
  }, [selectedOption]);

  const handleOptionClick = (option: typeof selectedOption) => {
    const elements = document.querySelectorAll('.option-box');
    elements.forEach(el => {
      if (el.getAttribute('data-label') === option?.text) {
        gsap.to(el, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            setSelectedOption(option);
          },
        });
      } else {
        gsap.to(el, {
          opacity: 0.5,
          duration: 0.2,
          ease: 'power2.out',
        });
      }
    });
    saveOptions(option?.right ? 1 : 0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 2.5 },
        maxWidth: { xs: '100%', sm: '600px', md: '900px' },
        padding: { xs: '10px', sm: '20px' },
        margin: '0 auto',
        overflow: 'auto',
        width: '90vw',
      }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          alignSelf: { xs: 'center', sm: 'flex-start' },
          backgroundColor: '#4B3F72',
          padding: { xs: '8px 16px', sm: '10px 20px' },
          fontSize: { xs: '0.9rem', sm: '1rem' },
          '&:hover': {
            backgroundColor: '#3c325b',
          },
        }}
      >
        ← Back
      </Button>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 4 },
          width: '100%',
        }}
      >
        {/* Animation container - always on left side for md+ screens */}
        <Box
          sx={{
            width: { xs: '100%', md: '40%' },
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'white',
            alignSelf: 'flex-start',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}
        >
          <Lottie
            animationData={animation}
            loop={false}
            style={{
              width: '100%',
            }}
          />
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: '60%' },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Scenario Description */}
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '16px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
          >
            {scenario.map((line, index) => (
              <Typography
                key={line}
                variant="h5"
                sx={{
                  fontWeight: index === 0 ? 'bold' : 'normal',
                  color: '#4B3F72',
                  textAlign: 'center',
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' },
                  marginBottom: index < scenario.length - 1 ? 1 : 0,
                }}
              >
                {line}
              </Typography>
            ))}
          </Box>

          {/* Options section */}
          {!selectedOption && (
            <Box
              ref={optionsContainerRef}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 1.5, sm: 2 },
                flex: 1,
                overflow: 'auto',
              }}
            >
              {choices.map(option => (
                <Box
                  key={option.text}
                  className="option-box"
                  data-label={option.text}
                  onClick={() => handleOptionClick(option)}
                  sx={{
                    padding: { xs: '12px 12px', sm: '15px 15px' },
                    borderRadius: '8px',
                    border: '2px solid #4B3F72',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    backgroundColor:
                      selectedOption?.text === option.text ? '#4B3F72' : 'transparent',
                    color: selectedOption?.text === option.text ? 'white' : '#4B3F72',
                    '&:hover': {
                      backgroundColor: selectedOption?.text === option.text ? '#4B3F72' : '#E6E0F4',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      marginBottom: { xs: 0.5, sm: 1 },
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    {option.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Feedback section */}
          {selectedOption && (
            <Box
              ref={feedbackRef}
              sx={{
                padding: { xs: '15px', sm: '20px' },
                backgroundColor: '#E6E0F4',
                borderRadius: '8px',
                border: '2px solid #4B3F72',
                cursor: 'pointer',
              }}
              onClick={() => {
                gsap.to(feedbackRef.current, {
                  opacity: 0,
                  y: -20,
                  duration: 0.3,
                  ease: 'power2.out',
                  onComplete: () => setSelectedOption(null),
                });
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: '#4B3F72',
                  marginBottom: { xs: 0.5, sm: 1 },
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                }}
              >
                Feedback:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#4B3F72',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                {selectedOption.feedback}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
