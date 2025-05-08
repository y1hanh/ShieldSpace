import { Box, Typography } from '@mui/material';

interface QuizCardProps {
  image: string;
  alt: string;
  onClick: () => void;
}

export default function QuizCard({ image, alt, onClick }: QuizCardProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: { xs: '280px', sm: '300px', md: '320px' },
        height: { xs: '350px', sm: '370px', md: '390px' },
        backgroundColor: 'white',
        borderRadius: { xs: '8px', sm: '12px' },
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: { xs: 'scale(1.02)', sm: 'translateY(-8px)' },
          boxShadow: '0 8px 12px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: { xs: '290px', sm: '310px', md: '320px' },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transition: 'background-color 0.2s',
          },
          '&:hover::after': {
            backgroundColor: 'rgba(0,0,0,0)',
          },
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.2s',
          },
          '&:hover img': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <img src={image} alt={alt} />
      </Box>
      <Box
        sx={{
          padding: { xs: '8px', sm: '10px' },
          backgroundColor: '#4B3F72',
          color: 'white',
          height: { xs: '60px', sm: '60px', md: '70px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
          }}
        >
          Click to Start Quiz
        </Typography>
      </Box>
    </Box>
  );
}
