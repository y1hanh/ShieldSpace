import React from 'react';
import { Box } from '@mui/material';

const PageLayoutBox = ({ header, children, outerSx = {}, innerSx = {} }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
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
          margin: 'auto',
          marginTop: '2rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          width: '80%',
          ...innerSx,
        }}
      >
        {header}
      </Box>

      {children}
    </Box>
  );
};

export default PageLayoutBox;
