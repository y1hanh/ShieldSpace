import { Box, Button, Typography, Container } from '@mui/material';
import BullyingKindsPieChart from '../component/visualizations/BullyingKindsPieChart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';
import LazyLoadComponent from '../component/LazyLoadComponent';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ChatIcon from '@mui/icons-material/Chat';

export default function DashBoardPage() {
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
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    /* transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    }, */
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
    <Box id="main-page">
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
              variant="h4"
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                fontWeight: 'bold',
                color: 'var(--text-title)',
                mb: 5,
                transition: 'all 1s ease-out',
              }}
            >
              We help you spot bullying in messages <br /> — and stand up to it.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mt: 3,
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(8px)',
                  },
                },
              }}
              className="cursor-pointer"
              onClick={() => {
                document.getElementById('section-2')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Typography sx={{ mb: 1, color: 'var(--text-title)' }}>
                See how cyberbullying affects us{' '}
              </Typography>
              <ArrowDownwardIcon sx={{ color: 'var(--text-title)' }} />
            </Box>
          </Box>

          {/* Image section */}
          <Box
            sx={{
              flex: {
                xs: '100%',
                md: '55%',
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
          <Box
            sx={{
              width: {
                xs: '90%',
                sm: '70%',
                md: '70%',
              },
              aspectRatio: '16/9',
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/LWGrHqCZiOg"
              title="YouTube video"
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Box>
        </Box>
      </Container>

      {/* Section 2 */}
      <Container
        maxWidth="lg"
        id="section-2"
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
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              viewport={{ once: true }}
              sx={cardBoxStyle}
            >
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
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              viewport={{ once: true }}
              sx={cardBoxStyle}
            >
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
            <Box
              component={motion.div}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 1 }}
              viewport={{ once: true }}
              sx={cardBoxStyle}
            >
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

      {/* Section 3: bullying impact */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 3, md: 5 },
            padding: { xs: '1.5rem', md: '2.5rem' },
          }}
        >
          <Box
            sx={{
              flex: { md: 1 },
              order: { xs: 2, md: 1 },
              padding: { xs: '0.5rem', md: '1rem' },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--text-title)', mb: 3 }}>
              Why This Matters
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                mb: 2,
              }}
            >
              Cyberbullying isn't just "mean words online"—it can deeply hurt the way we see
              ourselves and the world around us.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                mb: 2,
              }}
            >
              This chart shows the real emotional toll that online bullying takes on teens. Many
              feel less confident, alone, or even hopeless after receiving harmful messages.
            </Typography>
          </Box>

          <Box
            sx={{
              flex: { md: 1 },
              order: { xs: 1, md: 2 },
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              sx={{
                width: { xs: '100%', sm: '90%', md: '90%' },
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src="/impact_of_bullying.png"
                sx={{
                  width: '100%',
                  maxHeight: { xs: '350px', sm: '450px', md: '550px' },
                  objectFit: 'contain',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Section 4: Assessment Tool */}
      <Box sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            width: '100vw',
            height: '100%',
            backgroundImage: 'url(/bg.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.9,
            zIndex: 0,
          }}
        />
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            padding: '4rem 0',
            overflow: 'hidden',
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              p: 4,
              borderRadius: 4,
              maxWidth: '800px',
              mx: 'auto',
              width: {
                xs: '70%',
                sm: '90%',
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: '#f89b5e',
                width: 56,
                height: 56,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mx: 'auto',
              }}
            >
              <ChatIcon sx={{ color: 'white' }} />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4B3F72', mt: 2, mb: 2 }}>
              Is Someone Being Unkind? Let's Check Together!
            </Typography>

            <Typography
              ref={descriptionRef}
              sx={{ padding: '1rem', borderRadius: '8px', fontSize: '1.1rem' }}
            >
              Our friendly Message Helper can spot when someone's not being nice in messages. It
              helps you understand how it might make you feel and shows you what you can do about
              it!
            </Typography>

            <Button
              ref={buttonRef}
              variant="contained"
              onClick={() => navigate('/assessment')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#f89b5e',
                color: 'white',
                borderRadius: '25px',
                px: 4,
                py: 1.5,
                mt: 3,
                fontSize: '1.1rem',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'var(--highlight)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              Let's Go!
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
