import { Box, Typography, Button } from '@mui/material';
import AssessmentTool from '../component/AssessmentTool';
import PageLayoutBox from '../component/PageLayOutBox';

export default function DashBoardPage() {
  return (
    <PageLayoutBox
      outerSx={
        {
          // add any layout-specific outer styling here if needed
        }
      }
      innerSx={{
        backgroundColor: '#FFD9C2',
        justifyContent: 'center',
        height: '50%',
      }}
      header={
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 6,
            textAlign: 'left',
          }}
        >
          <img
            src="/public/logo.png"
            alt="Logo"
            style={{ marginBottom: '1rem', maxWidth: '40%', height: 'auto' }}
          />

          <Box sx={{ textAlign: 'center', justifyContent: 'column' }}>
            <Typography variant="h4" fontWeight="bold" color="white" gutterBottom>
              You're Not Alone
            </Typography>

            <Typography variant="h6" fontWeight="500" color="white" gutterBottom>
              Cyberbullying hurts.
            </Typography>

            <Typography variant="h6" fontWeight="500" color="white" gutterBottom>
              But you're stronger than you know.
            </Typography>
            <Typography variant="h6" fontWeight="500" color="white" gutterBottom>
              This tool helps you reflect, heal and grow - one step at a time.
            </Typography>
          </Box>
        </Box>
      }
    >
      <AssessmentTool />
    </PageLayoutBox>
  );
}
