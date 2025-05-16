import { Box, Typography, Button, Modal, IconButton } from '@mui/material';
import { useState } from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HelpIcon from '@mui/icons-material/Help';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { analyticsData } from '../data/analyticsData';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

export default function AnalyticsPage() {
  // State to track which card is selected for detail view
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const navigate = useNavigate();

  // Open modal with the details of the clicked card
  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  // Array of icons to use for each card
  const cardIcons = [
    <TrendingUpIcon sx={{ fontSize: 60, color: '#5C4294' }} />,
    <PeopleIcon sx={{ fontSize: 60, color: '#6A4CA7' }} />,
    <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: '#5C4294' }} />,
    <VisibilityOffIcon sx={{ fontSize: 60, color: '#E67E22' }} />,
    <HelpIcon sx={{ fontSize: 60, color: '#FF5722' }} />,
    <MoodBadIcon sx={{ fontSize: 60, color: '#0D47A1' }} />,
  ];

  // Array of background colors for cards
  const cardColors = [
    '#FFEBEE', // Light pink
    '#FFF9C4', // Light yellow
    '#E1D5F7', // Light purple
    '#DCEDC8', // Light green
    '#FFE0B2', // Light orange
    '#BBDEFB', // Light blue
  ];

  return (
    <Box
      sx={{
        p: { xs: 2, md: 8 },
        mt: { xs: 2, md: 4 },
      }}
    >
      {/* Learning Hub Title */}
      <Typography
        variant="h2"
        component="h1"
        align="center"
        sx={{
          color: '#1A2C5B',
          fontWeight: 700,
          mb: 4,
          fontSize: { xs: '2.5rem', md: '3.5rem' },
        }}
      >
        Learning Hub
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr', // 1 column on small screens
            sm: 'repeat(2, 1fr)', // 2 columns on medium screens
            md: 'repeat(3, 1fr)', // 3 columns on large screens
          },
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {analyticsData.map((item, index) => (
          <Box
            key={index}
            onClick={() => handleCardClick(index)}
            sx={{
              p: { xs: 3, sm: 4 },
              m: 1, // Add margin to prevent tight layouts
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              bgcolor: cardColors[index % cardColors.length],
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              '&:hover': {
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
              position: 'relative', // Important for proper stacking context
              zIndex: 1, // Ensures proper stacking
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                mb: 2,
                textAlign: 'center',
                color: '#1A2C5B',
                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.5rem' },
              }}
            >
              {item.title}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              {cardIcons[index % cardIcons.length]}
            </Box>

            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                fontWeight: 500,
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              {item.summary}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Detail Modal */}
      <Modal
        open={selectedCard !== null}
        onClose={handleCloseModal}
        aria-labelledby="card-detail-modal"
        aria-describedby="detailed-card-information"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: '80%', md: '70%' },
            maxWidth: '800px',
            maxHeight: '90vh',
            overflow: 'auto',
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
          }}
        >
          {selectedCard !== null && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h4" component="h2" fontWeight="bold" color="#1A2C5B">
                  {analyticsData[selectedCard].title}
                </Typography>
                <IconButton onClick={handleCloseModal} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Box>

              {analyticsData[selectedCard].image && (
                <Box sx={{ mb: 3, width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={analyticsData[selectedCard].image}
                    alt={analyticsData[selectedCard].title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              )}

              <Typography variant="h6" sx={{ mb: 1, color: '#333' }}>
                {analyticsData[selectedCard].summary}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                {analyticsData[selectedCard].description}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                {analyticsData[selectedCard].action}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: '#6A4CA7',
                    color: 'white',
                    borderRadius: '20px',
                    px: 4,
                    py: 1,
                    '&:hover': { bgcolor: '#59359e' },
                  }}
                  onClick={() => {
                    handleCloseModal();
                    navigate(analyticsData[selectedCard].actionUrl);
                  }}
                >
                  Check it out!
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
