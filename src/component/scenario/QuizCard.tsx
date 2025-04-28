import { Box, Typography } from '@mui/material';

interface QuizCardProps {
  image: string;
  alt: string;
  onClick: () => void;
}

export default function QuizCard({ image, alt, onClick }: QuizCardProps) {
  return (
    <Box
      sx={{
        width: { xs: '280px', sm: '300px', md: '320px' },
        height: { xs: '250px', sm: '270px', md: '300px' },
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
      onClick={onClick}
    >
      <Box
        sx={{
          width: '100%',
          height: { xs: '180px', sm: '200px', md: '230px' },
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.1)',
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
          padding: { xs: '12px', sm: '14px' },
          backgroundColor: '#4B3F72',
          color: 'white',
          height: { xs: '70px', sm: '70px', md: '70px' },
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
