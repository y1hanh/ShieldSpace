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
          top: '70px',
          left: 0,
          zIndex: 1000,
          width: 'auto',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Lottie
          animationData={animationData}
          loop={false}
          style={{
            width: '40vw',
            maxWidth: '400px',
            maxHeight: '300px',
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
