import React from 'react';
import { Box, Typography } from '@mui/material';

const GameLayOutBox = ({ header, children, outerSx = {}, innerSx = {} }) => {
  return (
    <Box sx={{ padding: '2rem', ...outerSx }}>
      {/* Header Box */}
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '1rem',
          padding: '1.5rem',
          mb: '2rem',
          border: '3px solid #E0E0E0',
          textAlign: 'center',
          ...innerSx,
        }}
      >
        <Typography variant="h5" fontWeight={600} mb={2}>
          {header || 'Digital Defender: Choose Your Path'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Play this game to build resilience, practice managing difficult situations, and learn how
          to handle cyberbullying.
        </Typography>
      </Box>

      {/* Children content */}
      {children}
    </Box>
  );
};

export default GameLayOutBox;
