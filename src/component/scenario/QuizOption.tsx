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
  onPrevious: () => void;
  onNext: () => void;
}

export default function QuizOption({
  scenario,
  choices,
  animation,
  onClick,
  saveOptions,
  onPrevious,
  onNext,
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
    setSelectedOption(option);
    saveOptions(option?.right ? 1 : 0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 2.5 },
        maxWidth: { xs: '100%', sm: '600px', md: '1200px' },
        paddingTop: { xs: '10px', sm: '20px' },
        margin: '0 auto',
        mb: { xs: 2, sm: 3 },
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
          gap: { xs: 2, md: 3 },
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '40%' },
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            borderRadius: '12px',
            backgroundColor: 'white',
            alignSelf: 'flex-start', // Keeps it at the top in desktop view
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            maxHeight: { md: '700px' }, // Limit height on desktop
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 1,
            }}
          >
            <Lottie animationData={animation} loop={false} style={{ height: '650px' }} />
          </Box>
        </Box>

        {/* Options container - more compact */}
        <Box
          sx={{
            width: { xs: '100%', md: '60%' },
            display: 'flex',
            flexDirection: 'column',
            gap: 2, // Reduced gap
            position: 'relative',
          }}
        >
          {/* More compact scenario description */}
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '12px',
              p: { xs: 2, sm: 2.5 }, // Reduced padding
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              position: 'relative',
            }}
          >
            {scenario.map((line, index) => (
              <Typography
                key={line}
                variant={index === 0 ? 'h6' : 'body1'} // Smaller heading for title
                sx={{
                  fontWeight: index === 0 ? 'bold' : 'normal',
                  color: index === 0 ? '#4B3F72' : '#666',
                  textAlign: 'left',
                  fontSize: {
                    xs: index === 0 ? '1rem' : '0.9rem',
                    sm: index === 0 ? '1.1rem' : '1rem',
                  },
                  mb: index < scenario.length - 1 ? 1 : 0, // Reduced margin
                  lineHeight: 1.3, // Tighter line height
                }}
              >
                {line}
              </Typography>
            ))}
          </Box>

          {/* More compact options section */}
          <Box
            ref={optionsContainerRef}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5, // Reduced gap
              flex: 1,
              overflow: 'auto',
              p: 0.5,
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <Typography
              variant="subtitle1" // Smaller heading
              sx={{
                fontWeight: 'bold',
                color: '#4B3F72',
                p: 1.5, // Reduced padding
                borderBottom: '1px solid rgba(75, 63, 114, 0.15)',
              }}
            >
              Choose Your Response:
            </Typography>

            <Box sx={{ p: 1 }}>
              {choices.map((option, index) => (
                <Box key={option.text} sx={{ mb: index < choices.length - 1 ? 1.5 : 0 }}>
                  {' '}
                  {/* Reduced margin */}
                  <Box
                    className="option-box"
                    data-label={option.text}
                    onClick={() => handleOptionClick(option)}
                    sx={{
                      p: { xs: '8px 12px', sm: '10px 16px' }, // Reduced padding
                      borderRadius: selectedOption?.text === option.text ? '8px 8px 0 0' : '8px',
                      border: '2px solid',
                      borderColor:
                        selectedOption?.text === option.text
                          ? selectedOption.right
                            ? '#4CAF50'
                            : '#F44336'
                          : '#4B3F72',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      backgroundColor:
                        selectedOption?.text === option.text
                          ? selectedOption.right
                            ? 'rgba(76, 175, 80, 0.95)'
                            : 'rgba(244, 67, 54, 0.95)'
                          : 'rgba(75, 63, 114, 0.03)',
                      color: selectedOption?.text === option.text ? 'white' : '#4B3F72',
                      '&:hover': {
                        backgroundColor:
                          selectedOption?.text === option.text
                            ? selectedOption.right
                              ? 'rgba(76, 175, 80, 0.95)'
                              : 'rgba(244, 67, 54, 0.95)'
                            : 'rgba(75, 63, 114, 0.08)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      },
                      '&::after':
                        selectedOption?.text === option.text
                          ? {
                              content: '""',
                              position: 'absolute',
                              right: 10,
                              top: '50%',
                              transform: 'translateY(-50%)',
                              width: 24,
                              height: 24,
                              backgroundImage: selectedOption.right
                                ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'/%3E%3C/svg%3E\")"
                                : "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23FFFFFF' d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/%3E%3C/svg%3E\")",
                              backgroundSize: 'contain',
                            }
                          : {},
                      position: 'relative',
                    }}
                  >
                    <Typography
                      variant="body1" // Smaller text
                      sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '0.9rem', sm: '1rem' }, // Smaller font
                        paddingRight: selectedOption?.text === option.text ? '30px' : 0,
                      }}
                    >
                      {option.text}
                    </Typography>
                  </Box>
                  {/* More compact feedback */}
                  {selectedOption?.text === option.text && (
                    <Box
                      ref={feedbackRef}
                      sx={{
                        p: { xs: '10px', sm: '12px' }, // Reduced padding
                        backgroundColor: selectedOption.right
                          ? 'rgba(76, 175, 80, 0.1)'
                          : 'rgba(244, 67, 54, 0.1)',
                        borderRadius: '0 0 8px 8px',
                        border: '2px solid',
                        borderColor: selectedOption.right ? '#4CAF50' : '#F44336',
                        borderTop: 'none',
                        cursor: 'pointer',
                        position: 'relative',
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
                        variant="subtitle2" // Smaller heading
                        sx={{
                          fontWeight: 'bold',
                          color: selectedOption.right ? '#2E7D32' : '#C62828',
                          mb: 0.5, // Reduced margin
                        }}
                      >
                        {selectedOption.right ? '✓ Correct' : '✗ Incorrect'}
                      </Typography>
                      <Typography
                        variant="body2" // Smaller text
                        sx={{
                          color: '#4B3F72',
                          fontSize: { xs: '0.85rem', sm: '0.9rem' },
                          lineHeight: 1.4,
                        }}
                      >
                        {selectedOption.feedback}
                      </Typography>
                    </Box>
                  )}
                </Box>
              ))}

              {/* Navigation Buttons - more compact */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: 2,
                  mt: 2, // Reduced margin
                }}
              >
                <Button
                  onClick={onPrevious}
                  variant="outlined" // Changed to outlined for a lighter feel
                  sx={{
                    color: '#4B3F72',
                    borderColor: '#4B3F72',
                    p: { xs: '6px 12px', sm: '8px 16px' }, // Reduced padding
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Smaller font
                    minWidth: { xs: '80px', sm: '100px' }, // Narrower buttons
                  }}
                >
                  ← Prev
                </Button>

                <Button
                  onClick={onNext}
                  variant="outlined" // Changed to outlined for a lighter feel
                  sx={{
                    color: '#4B3F72',
                    borderColor: '#4B3F72',
                    p: { xs: '6px 12px', sm: '8px 16px' }, // Reduced padding
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }, // Smaller font
                    minWidth: { xs: '80px', sm: '100px' }, // Narrower buttons
                  }}
                >
                  Next →
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
