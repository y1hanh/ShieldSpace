import { Box, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        height: 'auto',
        textAlign: 'center',
        position: 'relative',
        bottom: 0,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 NoMoreBullying. All rights reserved.
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ cursor: 'pointer', mt: 1 }}
        onClick={() =>
          window.open(
            'https://eportfolio.monash.edu/view/view.php?t=fc488d57e8e651034fb3',
            '_blank'
          )
        }
      >
        About Us
      </Typography>
    </Box>
  );
}
