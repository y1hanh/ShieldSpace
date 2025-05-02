import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { routes } from '../routes';

export default function Nav() {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever the route changes
  }, [location.pathname]);

  const toggleDrawer = open => () => {
    setDrawerOpen(open);
  };
  const mainRoutes = routes.filter(route => route.path !== '#');

  const scrollToTop = () => {
    navigate('/');
    const element = document.getElementById('dashboard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        padding: '0.5rem',
      }}
    >
      <Box
        onClick={() => scrollToTop()}
        sx={{ flex: 3, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <Box
          sx={{
            backgroundColor: '#FF9966',
            width: '1.2rem',
            height: '1.2rem',
            borderRadius: '50%',
            marginLeft: isMobile ? '0.5rem' : '5rem',
            marginRight: '0.5rem',
          }}
        />
        <Typography sx={{ color: 'Black', fontWeight: '600' }} variant="h6">
          No More Bully
        </Typography>
      </Box>

      {isMobile ? (
        <>
          <IconButton onClick={toggleDrawer(true)} edge="end">
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
              {mainRoutes.map(route => (
                <ListItem key={route.path} onClick={toggleDrawer(false)}>
                  <NavLink
                    to={route.path}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      fontWeight: isActive ? 'bold' : '',
                      color: isActive ? 'var(--highlight)' : 'black',
                      display: 'block',
                      width: '100%',
                      padding: '0.5rem',
                      borderRadius: '1.5rem',
                    })}
                  >
                    {route.name}
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'space-between',
            gap: 0.1,
            marginRight: isMobile ? '0.5rem' : '5rem',
          }}
        >
          {mainRoutes.map(route => (
            <NavLink
              to={route.path}
              style={({ isActive }) => ({
                fontSize: '1rem',
                color: isActive ? 'var(--highlight)' : 'black',
                padding: '0.8rem',
                textDecoration: 'none',
                fontFamily: 'Roboto, sans-serif',
              })}
            >
              {route.name}
            </NavLink>
          ))}
        </Box>
      )}
    </Box>
  );
}
