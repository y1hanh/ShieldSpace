import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
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
  // const [accountAnchor, setAccountAnchor] = useState(null);
  // const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  // const { isLoggedIn, logout } = useAuth();

  const toggleDrawer = open => () => {
    setDrawerOpen(open);
  };

  // const handleAccountMenu = event => {
  //   setAccountAnchor(event.currentTarget);
  // };

  // const handleAccountClose = () => {
  //   setAccountAnchor(null);
  // };

  // const handleLogoutClick = () => {
  //   setLogoutDialogOpen(true);
  //   handleAccountClose();
  // };

  // const handleLogoutConfirm = () => {
  //   logout();
  //   setLogoutDialogOpen(false);
  //   navigate('/');
  // };

  // const handleLogoutCancel = () => {
  //   setLogoutDialogOpen(false);
  // };

  const mainRoutes = routes.filter(route => route.path !== '#');
  const accountRoutes = routes.find(route => route.path === '#')?.children || [];

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
        // justifyContent: 'space-between',
        // alignItems: 'center',
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
            marginLeft: '0.5rem',
            marginRight: '0.5rem',
          }}
        />
        <Typography sx={{ color: 'Black' }} variant="h5">
          No more Bully
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
                      color: isActive ? 'white' : 'black',
                      backgroundColor: isActive ? '#66CCFF' : 'transparent',
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
              {/* <ListItem>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#FF9966' }}>
                  Account
                </Typography>
              </ListItem> */}
              {/* {isLoggedIn ? (
                <ListItem onClick={handleLogoutClick}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: '#FF9966',
                      cursor: 'pointer',
                    }}
                  >
                    <LogoutIcon />
                    <Typography>Logout</Typography>
                  </Box>
                </ListItem>
              ) : (
                accountRoutes.map(route => (
                  <ListItem key={route.path} onClick={toggleDrawer(false)}>
                    <NavLink
                      to={route.path}
                      style={({ isActive }) => ({
                        textDecoration: 'none',
                        padding: '0.5rem',
                        fontWeight: isActive ? 'bold' : '',
                        color: isActive ? 'white' : 'black',
                        backgroundColor: isActive ? '#66CCFF' : 'transparent',
                        display: 'block',
                        width: '100%',
                        borderRadius: '0.5rem',
                      })}
                    >
                      {route.name}
                    </NavLink>
                  </ListItem>
                ))
              )} */}
            </List>
          </Drawer>
        </>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {mainRoutes.map(route => (
            <Button
              key={route.path}
              fullWidth
              sx={{
                flex: 1,
              }}
            >
              <NavLink
                to={route.path}
                style={({ isActive }) => ({
                  fontSize: '12px',
                  fontWeight: isActive ? 'bold' : '',
                  color: isActive ? 'white' : 'black',
                  backgroundColor: isActive ? '#66CCFF' : 'transparent',
                  borderRadius: '1.5rem',
                  padding: '0.8rem',
                  textDecoration: 'none',
                })}
              >
                {route.name}
              </NavLink>
            </Button>
          ))}

          {/* {isLoggedIn ? (
            <>
              <IconButton onClick={handleAccountMenu} sx={{ color: '#FF9966' }}>
                <AccountCircle sx={{ fontSize: 32 }} />
              </IconButton>
              <Menu
                anchorEl={accountAnchor}
                open={Boolean(accountAnchor)}
                onClose={handleAccountClose}
                sx={{
                  mt: 1,
                  minWidth: 150,
                  borderRadius: '1rem',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <MenuItem
                  onClick={handleLogoutClick}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <ListItemText
                    primary="Logout"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: '#FF9966',
                    }}
                  />
                  <LogoutIcon sx={{ ml: 1, color: '#FF9966' }} />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                onClick={handleAccountMenu}
                startIcon={<AccountCircle />}
                sx={{ color: '#FF9966' }}
              >
                Account
              </Button>
              <Menu
                anchorEl={accountAnchor}
                open={Boolean(accountAnchor)}
                onClose={handleAccountClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 150,
                    borderRadius: '1rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {accountRoutes.map(route => (
                  <MenuItem
                    key={route.path}
                    onClick={handleAccountClose}
                    component={NavLink}
                    to={route.path}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    <ListItemText primary={route.name} />
                  </MenuItem>
                ))}
              </Menu>
            </>
          )} */}
        </Box>
      )}

      {/* <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutCancel}
        PaperProps={{
          sx: {
            borderRadius: '1rem',
            padding: '1rem',
          },
        }}
      >
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} sx={{ color: '#666' }}>
            Cancel
          </Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            sx={{
              backgroundColor: '#FF9966',
              '&:hover': {
                backgroundColor: '#ff8855',
              },
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog> */}
    </Box>
  );
}
