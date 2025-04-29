import { Box } from '@mui/material';
import AssessmentTool from '../component/assessment/AssessmentTool';

/**
 * AssessmentPage Component
 *
 * A tool for users to assess their emotional responses and receive feedback
 * Includes a chat interface, progress tracking, and skills development section
 */
export default function AssessmentPage() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AssessmentTool />
    </Box>
  );
}
