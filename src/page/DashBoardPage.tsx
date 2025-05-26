import { Box, Button, Typography, Container, useMediaQuery } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import PolicyIcon from '@mui/icons-material/Policy';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function DashBoardPage() {
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:768px)');
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
          duration: 0.9,
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
          duration: 1.3,
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
    ':hover': {
      scale: 1.02,
      transition: '0.3s ease',
    },
  };

  const cardTextStyle = {
    color: '#555555',
    mb: 1,
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
      <Container maxWidth="lg">
        <Typography
          ref={headingRef}
          variant="h4"
          sx={{
            padding: '2rem',
            opacity: 0,
            transform: 'translateY(20px)',
            fontWeight: 'bold',
            color: 'var(--text-title)',
            transition: 'all 1s ease-out',
          }}
        >
          We help you spot bullying in messages {isMobile ? '' : <br />} — and stand up to it.
        </Typography>

        {/* image Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            padding: '2rem',
            pt: 0,
            pb: 0,
          }}
        >
          <Box
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left',
              },
            }}
          >
            <Typography
              ref={descriptionRef}
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                color: 'var(--text-title)',
                transition: 'all 1s ease-out',
                mb: 2,
              }}
            >
              If someone sent you a message that felt off, check it here to see if it’s hurtful.
            </Typography>

            <Box
              ref={buttonRef}
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                justifyContent: { xs: 'center', md: 'flex-start' },
                bgcolor: 'rgba(255, 235, 235, 0.6)',
                borderRadius: '30px',
                padding: '8px 16px',
                transition: 'all 0.2s ease',
                maxWidth: 'fit-content',
                mt: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,0,0,0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 235, 235, 0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  '& .heart-icon': {
                    transform: 'scale(1.2)',
                  },
                },
              }}
              className="cursor-pointer"
              onClick={() => {
                document
                  .getElementById('section-2')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
            >
              <Typography
                sx={{
                  color: 'var(--text-title)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '1rem',
                  lineHeight: 1,
                }}
              >
                Why This Matters
              </Typography>
              <FavoriteIcon
                className="heart-icon"
                sx={{
                  color: 'red',
                  transition: 'transform 0.3s ease',
                  fontSize: '1.2rem',
                }}
              />
            </Box>
          </Box>

          {/* Image  */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              ref={imageRef}
              component="img"
              src="/l_image.png"
              sx={{
                opacity: 0,
                transform: 'translateY(20px)',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Box>
      </Container>

      {/* Section 3: bullying impact */}
      <Container maxWidth="lg" id="section-2">
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
              order: { xs: 1, md: 1 },
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

          <Box
            sx={{
              flex: { md: 1 },
              order: { xs: 2, md: 2 },
              padding: { xs: '0.5rem', md: '1rem' },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'var(--text-title)', mb: 3 }}>
              Why This Matters
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: 2,
                p: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <SentimentVeryDissatisfiedIcon />
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 500 }}
                >
                  Cyberbullying can deeply affect how teens feel: About 47% of teens experience
                  lower self-esteem. Around 43% feel isolated and alone. Nearly 36% report a sense
                  of helplessness.
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PolicyIcon />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 500,
                  }}
                >
                  <span
                    style={{
                      fontWeight: 600,
                      color: 'var(--text-title)',
                    }}
                  >
                    No More Bully{' '}
                  </span>
                  helps you understand these feelings and shows you what to do.
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  cursor: 'pointer',
                  ':hover': { scale: 1.02, transition: '0.3s ease', color: 'var(--text-title)' },
                }}
                onClick={() => {
                  document
                    .getElementById('section-3')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
              >
                <MenuBookIcon />
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, fontWeight: 500 }}
                >
                  Let's see how Emily found help when she got a mean message!
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Section 3 */}
      <Container
        id="section-3"
        maxWidth="lg"
        sx={{ backgroundColor: 'var(--background-secondary)' }}
      >
        <Box
          sx={{
            padding: '1rem',
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
              padding: '1rem',
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
                Emily was checking her messages, like always.
              </Typography>
              <Typography sx={cardTextStyle}>
                Then she saw: “Why do you even post this?” “No one cares about your opinion.”
              </Typography>
              <Typography sx={cardTextStyle}>It caught her off guard.</Typography>
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
              <Typography sx={cardTextStyle}>Emily kept thinking about it.</Typography>
              <Typography sx={cardTextStyle}>Was it just a joke?</Typography>
              <Typography sx={cardTextStyle}>
                She started to feel nervous about posting again…
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
                With No More Bully, Emily learned what those words really meant — and how to feel
                better again.
              </Typography>

              <Typography
                sx={{
                  ...cardTextStyle,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  fontWeight: 600,
                  color: '#4B3F72',
                  padding: '8px 12px',
                }}
              >
                Now she's stronger and supported
                <FavoriteIcon
                  className="heart-icon"
                  sx={{
                    color: 'red',
                    fontSize: '1.3rem',
                    animation: 'heartbeat 1.5s ease-in-out infinite',
                    '@keyframes heartbeat': {
                      '0%, 100%': { transform: 'scale(1)' },
                      '50%': { transform: 'scale(1.3)' },
                    },
                    filter: 'drop-shadow(0 0 2px rgba(255, 0, 0, 0.3))',
                  }}
                />
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem',
            position: 'relative',
            background: 'linear-gradient(180deg, #F8F9FA 0%, #E0F7FA 100%)',
            borderRadius: '24px',
            my: 4,
            boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
            border: '3px dashed #6A4CA7',
            overflow: 'hidden',
          }}
        >
          {/* Fun decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              left: 20,
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#FF9800',
              opacity: 0.7,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 30,
              right: 30,
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: '#4CAF50',
              opacity: 0.5,
            }}
          />

          {/* Video intro text with emoji and friendly styling */}
          <Box
            sx={{
              background: 'white',
              padding: '12px 25px',
              borderRadius: '30px',
              mb: 3,
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transform: 'rotate(-1deg)',
              maxWidth: '85%',
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#4B3F72',
                textAlign: 'center',
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
              }}
            >
              Now that we’ve seen how Emily was affected... Let’s find out how No More Bully can
              help you, too.
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: '#4B3F72',
              mb: 3,
              textAlign: 'center',
              fontSize: { xs: '1rem', sm: '1.15rem' },
              maxWidth: '650px',
              lineHeight: 1.5,
            }}
          >
            Watch this short video to see how it works!
          </Typography>

          {/* Video container with decorative frame */}
          <Box
            sx={{
              width: {
                xs: '95%',
                sm: '80%',
                md: '70%',
              },
              aspectRatio: '16/9',
              borderRadius: '12px',
              padding: '8px',
              background: 'white',
              boxShadow: '0 8px 15px rgba(0,0,0,0.15)',
              border: '5px solid #FFA726',
              position: 'relative',
              mb: 3,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -15,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60%',
                height: '25px',
                backgroundColor: '#FFA726',
                borderRadius: '25px 25px 0 0',
                zIndex: -1,
              },
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/LWGrHqCZiOg"
              title="YouTube video"
              style={{ border: 'none', borderRadius: '8px' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>

          {/* Skip video button */}
          <Box
            sx={{
              mt: 2,
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="text"
              onClick={() => {
                document
                  .getElementById('assessment-section')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              sx={{
                color: '#6A4CA7',
                fontWeight: 600,
                fontSize: '1rem',
                borderRadius: '20px',
                padding: '6px 16px',
                backgroundColor: 'rgba(106, 76, 167, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(106, 76, 167, 0.2)',
                  transform: 'scale(1.05)',
                },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              I’m Ready — Take Me to the Next Step
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Section 4: Assessment Tool - add ID for skip navigation */}
      <Box id="assessment-section" sx={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
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
          id="section-5"
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
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              p: 4,
              borderRadius: 1,
              maxWidth: '800px',
              mx: 'auto',
              width: {
                xs: '70%',
                sm: '90%',
              },
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4B3F72', mt: 2, mb: 2 }}>
              Is Someone Being Unkind?
            </Typography>

            <Typography sx={{ padding: '1rem', borderRadius: '8px', fontSize: '1.1rem' }}>
              Our friendly Message Helper can spot when someone's not being nice in messages. It
              helps you understand how it might make you feel and shows you what you can do about
              it!
            </Typography>

            <Box
              sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, mt: 3 }}
            >
              {/* first option: Learn more first */}
              <Box
                onClick={() => navigate('/assessment')}
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 3,
                  borderRadius: '16px',
                  background: 'var(--background)',
                  border: '3px solid var(--text-title)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 9px 0 var(--text-title)',
                    '& .arrow-icon': {
                      transform: 'translateX(5px)',
                    },
                  },
                  '&:active': {
                    transform: 'translateY(3px)',
                    boxShadow: '0 3px 0 var(--text-title)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    backgroundColor: '#F8BBD0',
                    zIndex: 0,
                  }}
                />

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: '#C2185B',
                    mb: 2,
                    zIndex: 1,
                    textShadow: '1px 1px 0 white',
                  }}
                >
                  Let's Check Together!
                </Typography>

                <Typography
                  sx={{
                    color: '#5D4037',
                    fontSize: '1rem',
                    mb: 3,
                    textAlign: 'center',
                    zIndex: 1,
                  }}
                >
                  Check a message and we'll help you understand if it's bullying
                </Typography>

                <Button
                  variant="contained"
                  endIcon={
                    <ArrowForwardIcon
                      className="arrow-icon"
                      sx={{ transition: 'transform 0.2s' }}
                    />
                  }
                  sx={{
                    backgroundColor: 'hsl(254, 33.30%, 49.40%) ',
                    color: 'white',
                    borderRadius: '30px',
                    py: 1,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    zIndex: 1,
                    '&:hover': {
                      backgroundColor: 'var(--text-title)',
                    },
                  }}
                >
                  Cyber Buddy
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
