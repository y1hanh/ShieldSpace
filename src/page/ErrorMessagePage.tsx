import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router';
import error_animation from '../animations/error_animation.json';
import Lottie from 'lottie-react';

export function ErrorMessagePage() {
  const navigate = useNavigate();

  const handleGoToAssessment = () => {
    navigate('/assessment');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 4,
        minHeight: '60vh',
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="#4B4072" mb={2}>
        Oops! Something's Missing
      </Typography>

      <Typography variant="body1" mb={3} color="text.secondary">
        It looks like you haven't completed an assessment yet. Let's go back and check out a message
        first!
      </Typography>

      <Lottie
        animationData={error_animation}
        loop={true}
        style={{
          width: '100%',
          maxWidth: '300px',
          maxHeight: '250px',
          margin: '16px 0',
        }}
      />

      <Button
        variant="contained"
        onClick={handleGoToAssessment}
        sx={{
          backgroundColor: '#6A4CA7',
          color: 'white',
          borderRadius: '25px',
          minWidth: '200px',
          px: 4,
          mt: 3,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#59359e',
          },
        }}
      >
        Go to Assessment
      </Button>
    </Box>
  );
}
