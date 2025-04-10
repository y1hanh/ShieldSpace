import React from 'react';
import { Typography, Button, Paper, List, ListItem, ListItemIcon, Box } from '@mui/material';
import CircleIcon from '@mui/icons-material/FiberManualRecord'; // For bullet points

export function StoryTelling() {
  const contentBoxSx = {
    p: { xs: 2, sm: 3 },
    display: 'flex',
    flexDirection: 'row',
    textAlign: 'center', // Center text
    gap: { xs: 1, sm: 1.5 },
    height: '100%',
    boxSizing: 'border-box', // Include padding/border in height/width
  };

  // Common styles for images
  const baseImageSx = {
    height: 'auto',
    objectFit: 'contain',
    maxWidth: '100%', // Prevent image overflow
    width: { xs: '100px', sm: '120px', md: '140px' }, // Responsive image size
    mt: 1,
  };

  const scrollToAssessment = () => {
    const element = document.getElementById('assessment');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Paper
        sx={{
          borderRadius: '1rem',
          overflow: 'hidden', // Ensures children respect the radius
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Section 1: Introduction */}
          <Box
            sx={{
              ...contentBoxSx,
              width: { xs: '100%', md: '50%' }, // Full width on mobile, half on desktop
              backgroundColor: '#FFEADD',
              borderRight: { md: '1px solid #eee' }, // Vertical divider
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight={700}
                color="#E67E22"
                gutterBottom
                sx={{ fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.6rem' } }}
              >
                Feeling hurt online? Let's figure it out together.
              </Typography>
              <Typography
                color="#594A41"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.3rem' } }}
              >
                Our self-assessment tool helps you understand hurtful messages and cope with their
                impact.
              </Typography>
            </Box>
            <Box component="img" src="/sad_face.png" alt="Boy looking at phone" sx={baseImageSx} />
          </Box>

          {/* Section 2: Meet Sam */}
          <Box
            sx={{
              ...contentBoxSx,
              width: { xs: '100%', md: '50%' }, // Full width on mobile, half on desktop
              backgroundColor: '#FFF6E0',
              borderTop: { xs: '1px solid #eee', md: 'none' }, // Horizontal divider on mobile
            }}
          >
            <Box sx={{ width: '60%' }}>
              <Typography
                variant="h5"
                fontWeight={700}
                color="#1A5276"
                gutterBottom
                sx={{ fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.6rem' } }}
              >
                Meet Sam
              </Typography>
              <Typography
                color="#594A41"
                sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.3rem' } }}
              >
                Mean texts used to make Sam feel nervous and alone. But he found a way to take back
                control.
              </Typography>
            </Box>
            <Box component="img" src="/sad_face.png" alt="Sad boy" sx={baseImageSx} />
          </Box>

          {/* Section 3: Emotional Assessment Tool */}
          <Box
            sx={{
              ...contentBoxSx,
              width: { xs: '100%', md: '50%' }, // Full width on mobile, half on desktop
              backgroundColor: '#E0F7FA',
              borderTop: '1px solid #eee', // Horizontal divider
              borderRight: { md: '1px solid #eee' }, // Vertical divider
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%',
                mt: 'auto',
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 1,
                  borderRadius: '8px',
                  borderBottomLeftRadius: '0',
                  backgroundColor: 'white',
                  mb: 1,
                  fontSize: { xs: '0.75rem', sm: '0.8rem' },
                  color: '#37474F',
                  maxWidth: '150px',
                  lineHeight: 1.3,
                }}
              >
                Hi there! I'm Emo-bot and I'll assist you on this journey
              </Paper>
              <Box
                component="img"
                src="/owl.png"
                alt="Emo-bot Owl"
                sx={{ ...baseImageSx, width: { xs: '60px', sm: '70px', md: '80px', lg: '100px' } }}
              />
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant="h5"
                fontWeight={700}
                color="#01579B"
                gutterBottom
                sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.4rem' } }}
              >
                Emotional Assessment Tool
              </Typography>
              <Typography color="#01579B" sx={{ mb: 1, fontSize: '0.9rem' }}>
                Paste a message to check how it may make someone feel:
              </Typography>
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  border: '1px solid #78909C',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  mb: 1,
                  width: 'auto',
                  display: 'inline-block',
                  maxWidth: '90%',
                  fontStyle: 'italic',
                  color: '#546E7A',
                  fontSize: '0.85rem',
                }}
              >
                "You're so weird, nobody likes you."
              </Paper>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: '#FFA726',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: '8px',
                  display: 'block',
                  mx: 'auto',
                  my: 1,
                  px: 3,
                  fontSize: '0.8rem',
                  '&:hover': { backgroundColor: '#FB8C00' },
                }}
                onClick={() => scrollToAssessment()}
              >
                ANALYZE
              </Button>
            </Box>
          </Box>

          {/* Section 4: Learn How to Respond */}
          <Box
            sx={{
              ...contentBoxSx,
              width: { xs: '100%', md: '50%' }, // Full width on mobile, half on desktop
              backgroundColor: '#FFEADD',
              borderTop: '1px solid #eee', // Horizontal divider
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h5"
                fontWeight={700}
                color="#01579B"
                gutterBottom
                sx={{ fontSize: { xs: '1.2rem', sm: '1.3rem', md: '1.6rem' } }}
              >
                Learn How to Respond
              </Typography>
              <List
                sx={{
                  p: 0,
                  display: 'inline-block',
                  textAlign: 'left',
                }}
              >
                {["What's okay and not okay.", 'Who you can talk to.', 'And more tips!'].map(
                  text => (
                    <ListItem key={text} sx={{ p: 0, mb: 0.2 }}>
                      <ListItemIcon sx={{ minWidth: '20px' }}>
                        <CircleIcon sx={{ fontSize: '8px', color: '#01579B' }} />
                      </ListItemIcon>
                      <Typography
                        color="#01579B"
                        sx={{ fontSize: { xs: '0.9rem', sm: '1rem', md: '1.3rem' } }}
                      >
                        {text}
                      </Typography>
                    </ListItem>
                  )
                )}
              </List>
            </Box>
            <Box sx={{ textAlign: 'center', mt: 'auto' }}>
              <Box component="img" src="/happy_face.png" alt="Happy boy waving" sx={baseImageSx} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
