import { Box } from '@mui/material';
import Nav from './component/nav';
import { Outlet } from 'react-router';
import { SecurePage } from './page/SecurePage';
import { useAuth } from './slice/authSlice';
import Footer from './component/Footer';

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
          background: 'linear-gradient(135deg, #E1F5FE 0%, #F3E5F5 50%, #EDE7F6 100%)',
          marginTop: '5rem',
          mx: 'auto',
        }}
      >
        <Outlet />
      </Box>

      <Box
        sx={{
          bottom: 0,
          left: 0,
          width: '100vw',
          zIndex: 1000,
          // bgcolor: '#FFFFFF',
        }}
      >
        <Footer />
      </Box>
    </div>
  ) : (
    <SecurePage></SecurePage>
  );
}

export default App;
