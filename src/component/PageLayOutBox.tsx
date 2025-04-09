import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface PageLayoutBoxProps {
  children: ReactNode;
  header?: ReactNode;
  outerSx?: {};
  innerSx?: SxProps<Theme>;
}

const PageLayoutBox = ({ header, children, outerSx = {}, innerSx = {} }: PageLayoutBoxProps) => {
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
          mb: 2,
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          width: '100%',
          maxWidth: '1200px',
          boxSizing: 'border-box',
          ...innerSx,
        }}
      >
        {header}
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayoutBox;
