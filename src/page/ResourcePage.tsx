import { Box } from '@mui/material';
import ScenarioBasedQuiz from '../component/scenario/ScenarioBasedQuiz';

export default function ResourcePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      <ScenarioBasedQuiz />
    </Box>
  );
}
