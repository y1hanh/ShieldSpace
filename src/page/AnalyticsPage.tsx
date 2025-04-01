import { Box, Typography } from '@mui/material';
export default function AnalyticsPage() {
  console.log('AnalyticsPage component rendered');
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
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
        }}
      >
        <Typography sx={{ color: '#3A4559', fontWeight: 600 }} variant="h5">
          Bullying Analytics
        </Typography>
      </Box>
    </Box>
  );
}
