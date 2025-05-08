import { Box, Button, Typography, Container } from '@mui/material';
import BullyingKindsPieChart from '../component/visualizations/BullyingKindsPieChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';
import LazyLoadComponent from '../component/assessment/LazyLoadComponent';
import gsap from 'gsap';
import { Ref, RefObject, useEffect, useRef } from 'react';

export default function DashBoardPage() {
  // Animation refs
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    timeline
      .to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        buttonRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power2.out',
        },
        '-=0.5'
      );
  }, []);

  const cardBoxStyle = {
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    flex: {
      xs: '100%',
      sm: '45%',
      md: '25%',
    },
    backgroundColor: 'var(--card-background)',
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

  const navigate = useNavigate();
  return (
    <>
      {/* Section 1 */}
      <Container maxWidth="lg" sx={{ padding: '2rem 0' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 4,
          }}
        >
          {/* Text section */}
          <Box
            sx={{
              padding: '2rem',
              flex: {
                xs: '100%',
                md: '45%',
              },
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            <Typography
              ref={headingRef}
              variant="h3"
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                fontWeight: 'bold',
                color: 'var(--text-title)',
                mb: 5,
              }}
            >
              What feels small... <br /> can hurt big.
            </Typography>

            <Typography
              ref={descriptionRef}
              sx={{ opacity: 0, transform: 'translateY(20px)', color: 'var(--text-body)' }}
            >
              Our Message Analyser helps identify cyberbullying, understand its emotional impact,
              and find ways to respond.
            </Typography>

            <Button
              ref={buttonRef}
              variant="contained"
              onClick={() => navigate('/assessment')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                backgroundColor: '#f89b5e',
                color: 'white',
                borderRadius: '25px',
                px: 4,
                py: 1,
                mt: 2,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'var(--highlight)',
                },
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Image section */}
          <Box
            sx={{
              flex: {
                xs: '100%',
                md: '45%',
              },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              ref={imageRef}
              component="img"
              src="/l_image.png"
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                maxWidth: {
                  xs: '90%',
                  sm: '70%',
                  md: '70%',
                },
                height: 'auto',
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Section 2 */}
      <Container
        maxWidth="lg"
        sx={{ padding: '3rem 0', backgroundColor: 'var(--background-secondary)', mt: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 'bold', color: 'var(--text-title)', textAlign: 'center', mt: 5 }}
          >
            How Cyberbullying Affects Us
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              padding: '3rem',
              gap: 5,
            }}
          >
            {/* Card 1 */}
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

            {/* Card 2 */}
            <Box sx={cardBoxStyle}>
              <Typography variant="h5" sx={contentBoxTitle}>
                The shift
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box component="img" src="/l_image3.png" sx={{ maxWidth: '70%', height: 'auto' }} />
              </Box>
              <Typography sx={cardTextStyle}>
                The words stayed with her. Emily began hesitating before she posted again.
              </Typography>
            </Box>

            {/* Card 3 */}
            <Box sx={cardBoxStyle}>
              <Typography variant="h5" sx={contentBoxTitle}>
                Taking Action
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <Box component="img" src="/l_image4.png" sx={{ maxWidth: '70%', height: 'auto' }} />
              </Box>
              <Typography sx={cardTextStyle}>
                With our tool, Emily can identify hurtful messages, understand their impact, and
                learn effective ways to respond.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Section 3: Assessment Tool */}
      <Container maxWidth="lg" sx={{ padding: '3rem 0' }}>
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
          <LazyLoadComponent>
            <BullyingKindsPieChart
              colorScheme={['#E6E0F4', '#F8F8F8', '#F8F8F8', '#F8F8F8', '#F8F8F8']}
            />
          </LazyLoadComponent>
        </Box>
      </Container>
    </>
  );
}
