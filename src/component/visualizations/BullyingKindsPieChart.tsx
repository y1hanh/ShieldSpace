import { Box, Paper, Typography } from '@mui/material';
import { CountBullyingDiagram } from './CountBullyingDiagram';

export default function BullyingKindsPieChart({ colorScheme }: { colorScheme?: string[] }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(3, 1fr)',
        },
        gridTemplateRows: {
          xs: 'auto',
          sm: 'auto auto auto',
        },
        gap: { xs: 1.5, sm: 2 },
        p: { xs: 1, sm: 2 },
      }}
    >
      {/* Graph in the center */}
      <Box
        sx={{
          gridColumn: {
            xs: '1',
            sm: '2',
          },
          gridRow: {
            xs: '1',
            sm: '1 / span 3',
          },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: { xs: 2, sm: 0 },
        }}
      >
        <CountBullyingDiagram />
      </Box>

      {/* Top left box */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1, sm: 1.5 },
          borderRadius: '1rem',
          backgroundColor: colorScheme?.[0] || 'rgba(102, 204, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: { xs: 'auto', sm: '120px' },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          fontWeight="bold"
          gutterBottom
        >
          Insights from 100,000 Tweets
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          Our analysis uncovered three major types of online bullying
        </Typography>
      </Paper>

      {/* Top right box */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1, sm: 1.5 },
          borderRadius: '1rem',
          backgroundColor: colorScheme?.[1] || 'rgba(255, 206, 86, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: { xs: 'auto', sm: '120px' },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          fontWeight="bold"
          gutterBottom
        >
          Gender & Sexual Orientation
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: 'rgba(255, 206, 86, 0.9)',
            fontWeight: 'bold',
            mb: 0.5,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          32%
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          involve hurtful remarks about a person's gender or sexual orientation
        </Typography>
      </Paper>

      {/* Middle right box */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1, sm: 1.5 },
          borderRadius: '1rem',
          backgroundColor: colorScheme?.[2] || 'rgba(255, 99, 132, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: { xs: 'auto', sm: '120px' },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          fontWeight="bold"
          gutterBottom
        >
          Race & Nationality
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: 'rgba(255, 99, 132, 0.9)',
            fontWeight: 'bold',
            mb: 0.5,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          34%
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          include offensive comments related to race or nationality
        </Typography>
      </Paper>

      {/* Bottom right box */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1, sm: 1.5 },
          borderRadius: '1rem',
          backgroundColor: colorScheme?.[3] || 'rgba(54, 162, 235, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: { xs: 'auto', sm: '120px' },
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
          fontWeight="bold"
          gutterBottom
        >
          Religion
        </Typography>
        <Typography
          variant="h2"
          sx={{
            color: 'rgba(54, 162, 235, 0.9)',
            fontWeight: 'bold',
            mb: 0.5,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          34%
        </Typography>
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
          contain negative statements targeting religion
        </Typography>
      </Paper>

      {/* Bottom left box */}
      <Paper
        elevation={2}
        sx={{
          p: { xs: 1, sm: 1.5 },
          borderRadius: '1rem',
          backgroundColor: colorScheme?.[4] || 'rgba(102, 204, 255, 0.05)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minHeight: { xs: 'auto', sm: '120px' },
        }}
      >
        <Typography variant="body2" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }} gutterBottom>
          These are all serious forms of cyberbullying — and none of them are okay. If you witness
          this kind of behavior online, don't stay silent. Talk to a trusted adult or{' '}
          <a href="https://www.esafety.gov.au/report/forms" target="_blank">
            raise your concerns
          </a>
          .
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
        >
          Data source:{' '}
          <a
            href="https://www.kaggle.com/datasets/momo12341234/cyberbully-detection-dataset"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cyberbully Detection Dataset
          </a>
        </Typography>
      </Paper>
    </Box>
  );
}
