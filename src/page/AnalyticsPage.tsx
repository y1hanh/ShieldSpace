import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
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
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleCardClick = (index: number) => {
    setSelectedCard(index);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const cardIcons = [
    <TrendingUpIcon sx={{ fontSize: 60, color: '#5C4294' }} />,
    <PeopleIcon sx={{ fontSize: 60, color: '#6A4CA7' }} />,
    <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: '#5C4294' }} />,
    <VisibilityOffIcon sx={{ fontSize: 60, color: '#E67E22' }} />,
    <HelpIcon sx={{ fontSize: 60, color: '#FF5722' }} />,
    <MoodBadIcon sx={{ fontSize: 60, color: '#0D47A1' }} />,
  ];

  const cardColors = [
    '#FFEBEE', // Light pink
    '#FFF9C4', // Light yellow
    '#E1D5F7', // Light purple
    '#DCEDC8', // Light green
    '#FFE0B2', // Light orange
    '#BBDEFB', // Light blue
  ];

  const filteredCards = analyticsData.filter(
    (card, index) => filter === 'all' || filter === index.toString()
  );

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: '2rem',
        mb: '3rem',
      }}
    >
      <Box
        sx={{
          display: 'inline-block',
          minWidth: '50%',
          padding: '2rem',
          borderRadius: '30px',
          mx: 'auto',
          textAlign: 'center',
          backgroundColor: '#F5F0FF',
          border: '4px solid #E0D6FF',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <TrendingUpIcon sx={{ fontSize: 40, color: '#6A4CA7', mr: 2 }} />
          <Typography
            sx={{
              color: '#6A4CA7',
              fontSize: '2.3rem',
              fontWeight: 800,
            }}
          >
            Learning Hub 📚
          </Typography>
        </Box>

        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel sx={{ color: '#6A4CA7' }}>Choose a Topic</InputLabel>
            <Select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              label="Choose a Topic"
              sx={{
                backgroundColor: 'white',
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6A4CA7',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6A4CA7',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#6A4CA7',
                },
              }}
            >
              <MenuItem value="all">All Topics</MenuItem>
              {analyticsData.map((item, index) => (
                <MenuItem key={index} value={index.toString()}>
                  {item.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {filter === '' ? (
          <Box
            sx={{
              py: 8,
              px: 4,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              mb: 4,
            }}
          >
            <Typography
              sx={{
                color: '#6A4CA7',
                fontSize: '1.5rem',
                fontWeight: 600,
                mb: 2,
              }}
            >
              👋 Welcome to Learning Hub!
            </Typography>
            <Typography
              sx={{
                color: '#666',
                fontSize: '1.1rem',
                lineHeight: 1.6,
              }}
            >
              Please select a topic from the dropdown to explore our analytics.
              <br />
              We help communities use data to understand, empathize, and stop cyberbullying!
            </Typography>
          </Box>
        ) : (
          <>
            <Typography
              sx={{
                color: '#8B4513',
                fontSize: '1.3rem',
                mb: 2,
              }}
              fontWeight={600}
            >
              Let's explore our amazing data and insights! 📊
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px',
              }}
            >
              {filteredCards.length === 1 ? (
                <Box
                  onClick={() => handleCardClick(parseInt(filter))}
                  sx={{
                    width: '100%',
                    maxWidth: '400px',
                    p: { xs: 3, sm: 4 },
                    m: 1,
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: cardColors[parseInt(filter) % cardColors.length],
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    '&:hover': {
                      boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                      cursor: 'pointer',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    zIndex: 1,
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
                    {filteredCards[0].title}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {cardIcons[parseInt(filter) % cardIcons.length]}
                  </Box>

                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 500,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {filteredCards[0].summary}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    },
                    gap: { xs: 2, sm: 3, md: 4 },
                  }}
                >
                  {filteredCards.map((item, index) => (
                    <Box
                      key={index}
                      onClick={() => handleCardClick(index)}
                      sx={{
                        p: { xs: 3, sm: 4 },
                        m: 1,
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
                        position: 'relative',
                        zIndex: 1,
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
              )}
            </Box>
          </>
        )}

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
    </Box>
  );
}
