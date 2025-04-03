import { Box, Typography, Button, Chip } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Security';
import PageLayoutBox from '../component/PageLayOutBox';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import DiamondIcon from '@mui/icons-material/Diamond';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarRateIcon from '@mui/icons-material/StarRate';
import { useState } from 'react';
import DigitalDefender from '../component/DigitDefender';

export default function GamePage() {
  const [gameStarted, setGameStarted] = useState(false);

  const totalGames = 10;
  const gamesCompleted = 7;

  const progress = Math.round((gamesCompleted / totalGames) * 100);
  if (gameStarted) {
    return <DigitalDefender />;
  }

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
            onClick={() => setGameStarted(true)}
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
      <Box
        component="img"
        src="../public/gameskill.png"
        sx={{ maxWidth: '86%', marginTop: '1rem' }}
      />

      <Box
        sx={{
          width: '81.5%',
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '1rem',
          marginTop: '2rem',
          borderTop: '6px solid #FFB3C6',
        }}
      >
        <Typography fontWeight={600} color="#3A4559" mb={1}>
          Your Game Progress
        </Typography>

        {/* Progress Bar */}
        <Box
          sx={{
            height: '1.5rem',
            backgroundColor: '#e0e0e0',
            borderRadius: '1rem',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Filled progress bar */}
          <Box
            sx={{
              width: `${progress}%`,
              backgroundColor: '#66CCFF',
              height: '100%',
              transition: 'width 0.3s ease',
            }}
          />

          {/* Centered text */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 600,
              fontSize: '0.8rem',
              color: 'white',
              pointerEvents: 'none',
            }}
          >
            {progress}% Complete
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            marginTop: '1.5rem',
            gap: '1rem',
          }}
        >
          <Chip
            icon={<FiberManualRecordIcon sx={{ fontSize: 20 }} />}
            label="7 Games Completed"
            sx={{
              backgroundColor: '#FFF7F9',
              borderRadius: '30px',
              paddingX: '1rem',
              height: '60px',
              fontWeight: 500,
              color: '#3A4559',
              '& .MuiChip-icon': {
                color: '#ec6b87',
              },
            }}
          />
          <Chip
            icon={<DiamondIcon sx={{ fontSize: 20 }} />}
            label="12 Skills Unlocked"
            sx={{
              backgroundColor: '#F0FAFF',
              borderRadius: '30px',
              paddingX: '1rem',
              height: '60px',
              fontWeight: 500,
              color: '#3A4559',
              '& .MuiChip-icon': {
                color: '#60a5fa',
              },
            }}
          />
          <Chip
            icon={<EmojiEventsIcon sx={{ fontSize: 20 }} />}
            label="3 Badges Earned"
            sx={{
              backgroundColor: '#FFF5F0',
              borderRadius: '30px',
              paddingX: '1rem',
              height: '60px',
              fontWeight: 500,
              color: '#3A4559',
              '& .MuiChip-icon': {
                color: '#f8b84e',
              },
            }}
          />
          <Chip
            icon={<StarRateIcon sx={{ fontSize: 20 }} />}
            label="Next Badge: 3 more games"
            sx={{
              backgroundColor: '#FFFAF5',
              borderRadius: '30px',
              paddingX: '1rem',
              height: '60px',
              fontWeight: 500,
              color: '#3A4559',
              '& .MuiChip-icon': {
                color: '#f8c663',
              },
            }}
          />
        </Box>

        {/* View All Achievements Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#f89b5e',
              borderRadius: '20px',
              paddingX: '2rem',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            View All Achievements
          </Button>
        </Box>
      </Box>
    </PageLayoutBox>
  );
}
