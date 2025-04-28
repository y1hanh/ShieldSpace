import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface PageLayoutBoxProps {
  children: ReactNode;
  header?: ReactNode;
  outerSx?: {};
  innerSx?: SxProps<Theme>;
  id?: string;
}

const PageLayoutBox = ({
  header,
  children,
  outerSx = {},
  innerSx = {},
  id,
}: PageLayoutBoxProps) => {
  return (
    <Box
      {...(id ? { id } : {})}
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
          mb: 2,
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          width: '100%',
          maxWidth: '1000px',
          boxSizing: 'border-box',
          ...innerSx,
        }}
      >
        {header}
      </Box>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1000px',
          boxSizing: 'border-box',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayoutBox;
