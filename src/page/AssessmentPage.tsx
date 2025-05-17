import { Box } from '@mui/material';
import AssessmentTool from '../component/assessment/AssessmentTool';
import Lottie from 'lottie-react';
import animationData from '../animations/message_animation.json';

/**
 * AssessmentPage Component
 *
 * A tool for users to assess their emotional responses and receive feedback
 * Includes a chat interface, progress tracking, and skills development section
 */
export default function AssessmentPage() {
  return (
    <Box sx={{ height: '100vh', position: 'relative' }}>
      <Box
        sx={{
          position: 'fixed',
          top: { xs: '50px', sm: '70px' },
          left: 0,
          zIndex: 1000,
          width: 'auto',
          display: { xs: 'none', sm: 'flex' }, // Hide on extra small screens
          justifyContent: 'flex-start',
        }}
      >
        <Lottie
          animationData={animationData}
          loop={false}
          style={{
            maxWidth: '400px',
            maxHeight: '250px',
          }}
        />
      </Box>

      {/* Mobile-specific animation - shows only on small screens */}
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          width: '100%',
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          alignItems: 'flex-start',
          pointerEvents: 'none', // Allows interaction with elements below
        }}
      >
        <Lottie
          animationData={animationData}
          loop={false}
          style={{
            width: '400px',
            maxHeight: '180px',
          }}
        />
      </Box>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AssessmentTool />
      </Box>
    </Box>
  );
}
