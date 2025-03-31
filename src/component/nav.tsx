import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";
import { routes } from "../routes";

export default function Nav() {
  console.log("Nav component rendered");
  const [value, setValue] = useState(0);


  return (
    <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent:"space-between", alignItems: 'center', padding: '0.5rem'}}>
      <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
        <Box sx={{ backgroundColor: '#FF9966', width: '2.5rem', height:'2.5rem', borderRadius:'50%', marginRight:'0.2rem' }}></Box>
        <Typography sx={{ color: '#FF9966', fontWeight: 600, textWrap: "nowrap" }} variant="h5"> No More Bullying !</Typography>
      </Box>
      <Box>
        {routes.map((route) => {
          return (
            <Button key={route.path}>
              <NavLink to={route.path} style={({ isActive, isPending, isTransitioning }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isActive ? "white" : "black",
                  viewTransitionName: isTransitioning ? "slide" : "",
                  backgroundColor:  isActive ? "#66CCFF": "transparent",
                  borderRadius: "1rem",
                  padding: "0.8rem",
                  textDecoration: "none",
                }}}>{route.name}</NavLink>
            </Button>
          );
        })}
      </Box>
      
    </Box>
  );
}