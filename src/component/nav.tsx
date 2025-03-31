import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography, IconButton, Drawer, List, ListItem, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { routes } from "../routes";

export default function Nav() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ backgroundColor: '#FF9966', width: '1.5rem', height: '1.5rem', borderRadius: '50%', marginRight: '0.5rem' }} />
        <Typography sx={{ color: '#FF9966', fontWeight: 600 }} variant="h5">
          No More Bullying!
        </Typography>
      </Box>

      {isMobile ? (
        <>
          <IconButton onClick={toggleDrawer(true)} edge="end">
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List>
            {routes.map((route) => (
              <ListItem key={route.path} onClick={toggleDrawer(false)}>
                <NavLink
                  to={route.path}
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    padding: "0.5rem",
                    color: isActive ? "white" : "black",
                    backgroundColor: isActive ? "#66CCFF" : "transparent",
                    display: "block",
                    width: "100%",
                    borderRadius: "0.5rem",
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
        <Box>
          {routes.map((route) => (
            <Button key={route.path}>
              <NavLink
                to={route.path}
                style={({ isActive }) => ({
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "white" : "black",
                  backgroundColor: isActive ? "#66CCFF" : "transparent",
                  borderRadius: "1rem",
                  padding: "0.8rem",
                  textDecoration: "none",
                })}
              >
                {route.name}
              </NavLink>
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
}