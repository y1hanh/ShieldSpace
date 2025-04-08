import React from 'react';
import { Box } from '@mui/material';

const PageLayoutBox = ({ header, children, outerSx = {}, innerSx = {} }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        ...outerSx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          mt: 4,
          mb: 4,
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          width: '100%',
          maxWidth: '900px',
          boxSizing: 'border-box',
          ...innerSx,
        }}
      >
        {header}
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayoutBox;
