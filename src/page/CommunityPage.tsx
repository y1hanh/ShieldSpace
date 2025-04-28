import { Box, Typography, Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PageLayoutBox from '../component/PageLayOutBox';

export default function CommunityPage() {
  const cards = [
    {
      title: 'Support Forums',
      buttonText: 'Join Forum',
      icon: <GroupsIcon fontSize="large" sx={{ color: '#B39DDB' }} />,
    },
    {
      title: 'Local Groups',
      buttonText: 'Find Groups',
      icon: <PublicIcon fontSize="large" sx={{ color: '#B39DDB' }} />,
    },
    {
      title: 'School Programs',
      buttonText: 'View Programs',
      icon: <StarBorderIcon fontSize="large" sx={{ color: '#B39DDB' }} />,
    },
    {
      title: 'Volunteer Hub',
      buttonText: 'Get Involved',
      icon: <GroupsIcon fontSize="large" sx={{ color: '#B39DDB' }} />,
    },
  ];

  return (
    <PageLayoutBox
      header={
        <>
          <Typography sx={{ color: '#4A4A6A', fontWeight: 600, mb: 3 }} variant="h4">
            Resources & Community
          </Typography>
          <Typography sx={{ color: '#7A7A9D' }} variant="body1">
            Access trusted resources, find support, and join a community dedicated to creating safer
            online spaces for everone.
          </Typography>
        </>
      }
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            minWidth: '50%',
            padding: '1rem',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: 1,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4">What Would You Do?</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '3rem',
        }}
      >
        <Typography variant="h4" sx={{ color: '#4A4A6A', fontWeight: 500, mb: 3 }}>
          Support{' '}
          <Box
            component="span"
            sx={{
              borderBottom: '3px solid #FF6B4A',
              display: 'inline',
              paddingBottom: '4px',
            }}
          >
            Com
          </Box>
          munities
        </Typography>
        <Typography variant="body1" sx={{ color: '#4A4A6A' }}>
          Connect with others who understand your experience and can provide support
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 4,
          mt: 4,
          mb: 4,
        }}
      >
        {cards.map((card, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#E6E0F4',
              borderRadius: '16px',
              width: 180,
              height: 260,
              padding: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            {/* Icon Circle */}
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#dcd0f7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
              }}
            >
              {card.icon}
            </Box>

            {/* Title */}
            <Typography
              variant="h6"
              sx={{
                color: '#4A4A6A',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {card.title}
            </Typography>

            {/* Button */}
            <Button
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#b39ddb',
                borderRadius: '20px',
                textTransform: 'none',
                px: 3,
                '&:hover': {
                  backgroundColor: '#a58cd3',
                },
              }}
            >
              {card.buttonText}
            </Button>
          </Box>
        ))}
      </Box>
    </PageLayoutBox>
  );
}
