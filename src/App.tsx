import { Box } from '@mui/material';
import Nav from './component/nav';
import { Outlet } from 'react-router';
import { SecurePage } from './page/SecurePage';
import { useAuth } from './slice/authSlice';

function App() {
  const { secure } = useAuth();

  return secure ? (
    <div className="App">
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          zIndex: 1000,
          bgcolor: '#FFFFFF',
        }}
      >
        <Nav />
      </Box>

      <Box
        sx={{
          bgcolor: '#E2F3FF',
          // width: '100vw',
          height: '100vh',
          overflow: 'auto',
          marginTop: '5rem',
        }}
      >
        <Outlet />
      </Box>
    </div>
  ) : (
    <SecurePage></SecurePage>
  );
}

export default App;
