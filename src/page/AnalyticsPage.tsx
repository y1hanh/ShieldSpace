import { Box, Typography, Paper } from '@mui/material';
import PageLayoutBox from '../component/PageLayOutBox';
import { CountBullyingDiagram } from '../component/visualizations/CountBullyingDiagram';
import BullyingKindsPieChart from '../component/visualizations/BullyingKindsPieChart';

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
          variant="h4"
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
          borderRadius: '1rem',
          p: 3,
          backgroundColor: '#FFFFFF',
        }}
      >
        <BullyingKindsPieChart />
      </Box>
    </PageLayoutBox>
  );
}
