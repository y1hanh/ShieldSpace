import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';

interface BentoLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

export default function BentoLayout({ title, description, children, stats }: BentoLayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: 2 },
        border: '1px solid #e0e0e0',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box>
        <Typography
          variant={isMobile ? 'subtitle1' : 'h6'}
          gutterBottom
          sx={{ wordBreak: 'break-word' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ wordBreak: 'break-word' }}
        >
          {description}
        </Typography>
      </Box>

      {stats && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(auto-fit, minmax(150px, 1fr))',
            },
            gap: { xs: 1, sm: 2 },
            mb: { xs: 1, sm: 2 },
          }}
        >
          {stats.map((stat, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                p: { xs: 1, sm: 2 },
                textAlign: 'center',
                borderRadius: 1,
              }}
            >
              <Typography
                variant={isMobile ? 'h5' : 'h4'}
                color="primary"
                sx={{ wordBreak: 'break-word' }}
              >
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                {stat.label}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}

      <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>{children}</Box>
    </Box>
  );
}
