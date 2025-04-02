import { Box, Typography, Button, Chip } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Security';
import PageLayoutBox from '../component/PageLayoutBox';

export default function GamePage() {
  console.log('GamePage component rendered');

  return (
    <PageLayoutBox
      header={
        <>
          <Typography sx={{ color: '#3A4559', fontWeight: 600 }} variant="h5">
            Fun Games with Purpose
          </Typography>
          <Typography sx={{ color: '#7A7A9D' }} variant="body1">
            Play these games to build resilience, practice managing difficult situations, and have
            fun along the way!
          </Typography>
        </>
      }
    >
      {/* Game Card */}
      <Box
        sx={{
          width: '80%',
          padding: '2rem',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '2rem',
          borderTop: '6px solid #FF9966',
        }}
      >
        {/* Icon Section */}
        <Box
          sx={{
            width: '100px',
            height: '100px',
            backgroundColor: '#fff5f0',
            borderRadius: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ShieldIcon sx={{ fontSize: 60, color: '#dd6b20' }} />
        </Box>

        {/* Text Content */}
        <Box sx={{ flex: 1, marginLeft: '2rem', marginBottom: '2rem' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#3A4559' }}>
            Digital Defender
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#f7954d', mt: 1 }}>
            FEATURED GAME
          </Typography>
          <Typography variant="body2" sx={{ color: '#7A7A9D', mt: 1 }}>
            Navigate through a digital world, building shields against negative comments and
            collecting power-ups that teach you real-world strategies for handling cyberbullying.
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600, mt: 1.5 }}>
            Skills you'll practice:
          </Typography>

          {/* Skill Tags */}
          <Box sx={{ display: 'flex', gap: '0.5rem', mt: 1.5, flexWrap: 'wrap' }}>
            <Chip label="Resilience" sx={{ backgroundColor: '#66CCFF33', color: '#3A4559' }} />
            <Chip label="Problem Solving" sx={{ backgroundColor: '#FFB3C633', color: '#3A4559' }} />
            <Chip
              label="Emotional Control"
              sx={{ backgroundColor: '#FFCC9933', color: '#3A4559' }}
            />
          </Box>
        </Box>

        {/* Play Button */}
        <Box sx={{ marginLeft: '2rem' }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: '35%',
              minWidth: '80px',
              minHeight: '66px',
              backgroundColor: '#f7954d',
              color: '#fff',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'uppercase',
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            Play
          </Button>
        </Box>
      </Box>
    </PageLayoutBox>
  );
}
