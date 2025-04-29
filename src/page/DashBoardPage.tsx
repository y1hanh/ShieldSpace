import { Box, Typography } from '@mui/material';
import AssessmentTool from '../component/AssessmentTool';
import BullyingKindsPieChart from '../component/visualizations/BullyingKindsPieChart';

export default function DashBoardPage() {
  const cardBoxStyle = {
    maxWidth: {
      xs: '100%',
      sm: '180px',
      md: '25%',
      lg: '25%',
    },
    backgroundColor: '#F8F8F8',
    padding: '1.2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',

    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    },
  };

  const cardTextStyle = {
    color: '#555555',
    mb: 3,
    textAlign: 'center',
  };

  const contentBoxTitle = {
    fontWeight: 'bold',
    color: '#4B3F72',
    textAlign: 'center',
    mb: 2,
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          padding: '2rem',
        }}
      >
        {/* Section 1  */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ padding: '4rem' }}>
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4B3F72', mb: 5 }}>
              What feels small... <br /> can hurt big.
            </Typography>

            <Typography sx={{ color: '#333' }}>
              Our Message Analyser helps identify cyberbullying, understand its emotional impact,
              and find ways to respond.
            </Typography>
          </Box>

          {/* section1 image  */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              component="img"
              src="/l_image.png"
              sx={{
                maxWidth: {
                  xs: '100%',
                  sm: '70%',
                  md: '60%',
                },
                height: 'auto',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* section2 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#F9FBFC',
          width: '100%',
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: '#4B3F72', textAlign: 'center', mt: 5 }}
        >
          How Cyberbullying Affects Us
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding: '3rem',
          }}
        >
          <Box sx={cardBoxStyle}>
            <Typography variant="h5" sx={contentBoxTitle}>
              A regular Scroll
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box component="img" src="/l_image2.png" sx={{ maxWidth: '70%', height: 'auto' }} />
            </Box>
            <Typography sx={cardTextStyle}>
              Emily was checking her messages like she always does - memes, class updates, group
              chats.
            </Typography>
          </Box>

          <Box sx={cardBoxStyle}>
            <Typography variant="h5" sx={contentBoxTitle}>
              The shift
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box component="img" src="/l_image3.png" sx={{ maxWidth: '70%', height: 'auto' }} />
            </Box>
            <Typography sx={cardTextStyle}>
              The words stayed with her. Emily began hestating before she posted again.
            </Typography>
          </Box>
          <Box sx={cardBoxStyle}>
            <Typography variant="h5" sx={contentBoxTitle}>
              Taking Action
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box component="img" src="/l_image4.png" sx={{ maxWidth: '70%', height: 'auto' }} />
            </Box>
            <Typography sx={cardTextStyle}>
              With our tool, Emily can identify hurtful messages, understand their impact, and learn
              effective ways to respond.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ mx: 'auto', mt: 2, p: 3 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', color: '#4B3F72', textAlign: 'center', mb: 2 }}
        >
          It's common than you think...
        </Typography>
        <Typography sx={{ color: '#333', textAlign: 'center', mb: 2 }}>
          Insights from 100,000 Tweets
        </Typography>
        <BullyingKindsPieChart
          colorScheme={['#E6E0F4', '#F8F8F8', '#F8F8F8', '#F8F8F8', '#F8F8F8']}
        />
      </Box>
      {/* <AssessmentTool /> */}
    </>
  );
}
