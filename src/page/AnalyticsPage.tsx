import { Box, Typography } from '@mui/material';
import PageLayoutBox from '../component/PageLayoutBox';

export default function AnalyticsPage() {
  console.log('AnalyticsPage component rendered');

  return (
    <PageLayoutBox
      header={
        <>
          <Typography sx={{ color: '#3A4559', fontWeight: 600 }} variant="h5">
            Bully Analytics
          </Typography>
          <Typography sx={{ color: '#7A7A9D' }} variant="body1">
            View data insights and patterns related to reported bullying incidents.
          </Typography>
        </>
      }
    >
      <Box sx={{ width: '80%', marginTop: '2rem' }}>
        <Typography variant="body2" color="#7A7A9D">
          Analytics content coming soon...
        </Typography>
      </Box>
    </PageLayoutBox>
  );
}
