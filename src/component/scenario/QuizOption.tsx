import { Box, Button, Typography } from '@mui/material';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface QuizOptionProps {
  scenario: string[];
  options: {
    label: string;
    description: string;
    reason: string;
  }[];
  onClick: () => void;
}

export default function QuizOption({ scenario, options, onClick }: QuizOptionProps) {
  const [selectedOption, setSelectedOption] = useState<{
    label: string;
    description: string;
    reason: string;
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

      // Animate feedback in
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
    // Animate the clicked option before setting the selected state
    const elements = document.querySelectorAll('.option-box');
    elements.forEach(el => {
      if (el.getAttribute('data-label') === option?.label) {
        gsap.to(el, {
          scale: 1.02,
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
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2, sm: 2.5 },
        maxWidth: { xs: '100%', sm: '600px', md: '800px' },
        width: '100%',
        margin: '0 auto',
        padding: { xs: '10px', sm: '20px' },
        height: '100%',
        overflow: 'auto',
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
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: 2,
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

      {!selectedOption && (
        <Box
          ref={optionsContainerRef}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: { xs: 2, sm: 3 },
            gap: { xs: 1.5, sm: 2 },
            flex: 1,
            overflow: 'auto',
          }}
        >
          {options.map(option => (
            <Box
              key={option.label}
              className="option-box"
              data-label={option.label}
              onClick={() => handleOptionClick(option)}
              sx={{
                padding: { xs: '12px 15px', sm: '15px 20px' },
                borderRadius: '8px',
                border: '2px solid #4B3F72',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: selectedOption?.label === option.label ? '#4B3F72' : 'transparent',
                color: selectedOption?.label === option.label ? 'white' : '#4B3F72',
                '&:hover': {
                  backgroundColor: selectedOption?.label === option.label ? '#4B3F72' : '#E6E0F4',
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
                {option.label}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                {option.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {selectedOption && (
        <Box
          ref={feedbackRef}
          sx={{
            marginTop: { xs: 2, sm: 2 },
            padding: { xs: '15px', sm: '20px' },
            backgroundColor: '#E6E0F4',
            borderRadius: '8px',
            border: '2px solid #4B3F72',
            cursor: 'pointer',
          }}
          onClick={() => {
            // Animate feedback out before resetting selection
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
            {selectedOption.reason}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
