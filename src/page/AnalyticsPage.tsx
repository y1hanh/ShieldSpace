import { Box, Typography } from '@mui/material';
import PageLayoutBox from '../component/PageLayOutBox';
import { CountBullyingDiagram } from '../component/CountBullyingDiagram';

export default function AnalyticsPage() {
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
      <CountBullyingDiagram />
    </PageLayoutBox>
  );
}
