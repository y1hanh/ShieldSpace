import './theme.css';
import { Box } from '@mui/material';
import Nav from './component/nav';
import { Outlet } from 'react-router';
import { SecurePage } from './page/SecurePage';
import { useAuth } from './slice/authSlice';
import Footer from './component/Footer';

function App() {
  // const { secure } = useAuth();

  // return secure ?
  return (
    <div className="App">
      <Box
        className="bg-primary"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          zIndex: 1000,
          backgroundColor: 'var(--background-secondary)',
        }}
      >
        <Nav />
      </Box>

      <Box
        id="pages"
        sx={{
          marginTop: '4rem',
          mx: 'auto',
          background: 'var(--background)',
        }}
      >
        <Outlet />
      </Box>

      <Box
        sx={{
          bottom: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: 'var(--background-secondary)',
        }}
      >
        <Footer />
      </Box>
    </div>
    // ) : (
    //   <SecurePage></SecurePage>
  );
}

export default App;
