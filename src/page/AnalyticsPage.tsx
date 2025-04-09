import { Box, Typography } from '@mui/material';
import PageLayoutBox from '../component/PageLayOutBox';
import { CountBullyingDiagram } from '../component/CountBullyingDiagram';

export default function AnalyticsPage() {
  return (
    <PageLayoutBox
      header={
        <Typography
          sx={{
            color: '#3A4559',
            fontWeight: 600,
            borderBottom: '4px solid #FF9966',
            display: 'inline-block',
            paddingBottom: 1,
          }}
          variant="h5"
        >
          Bullying Incidents Over Time
        </Typography>
      }
      innerSx={{ backgroundColor: 'transparent' }}
    >
      <Box
        sx={{
          mx: 'auto',
          mt: 2,
          backgroundColor: '#FFFFFF',
          borderRadius: '1rem',
          p: 3,
        }}
      >
        <CountBullyingDiagram />
      </Box>
    </PageLayoutBox>
  );
}
