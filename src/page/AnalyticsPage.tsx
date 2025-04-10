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
        <Box
          sx={{
            background: 'rgba(102, 204, 255, 0.05)',
            display: 'flex',
            gap: 3,
            p: 2,
            borderRadius: '1rem',
          }}
        >
          <CountBullyingDiagram />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Insights from 100,000 Tweets on Social Media
            </Typography>

            <Typography>Our analysis uncovered three major types of online bullying:</Typography>
            <Typography>
              <strong style={{ color: 'rgba(255, 206, 86, 0.9)' }}>• 32%</strong> involve hurtful
              remarks about a person’s <strong>gender or sexual orientation</strong>.
            </Typography>
            <Typography>
              <strong style={{ color: 'rgba(255, 99, 132, 0.9)' }}>• 34%</strong> of tweets include
              offensive comments related to <strong>race or nationality</strong>.
            </Typography>

            <Typography>
              <strong style={{ color: 'rgba(54, 162, 235, 0.9)' }}>• 34%</strong> contain negative
              statements targeting <strong>religion</strong>.
            </Typography>

            <Typography>
              These are all serious forms of cyberbullying — and none of them are okay. If you
              witness this kind of behavior online, don’t stay silent. Talk to a trusted adult or
              <a href="https://www.esafety.gov.au/report/forms" target="_blank">
                {' '}
                report it.
              </a>
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Data source:{' '}
              <a
                href="https://www.kaggle.com/datasets/momo12341234/cyberbully-detection-dataset"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cyberbully Detection Dataset on Kaggle
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </PageLayoutBox>
  );
}
