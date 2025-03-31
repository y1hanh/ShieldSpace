import { Box, Button } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";
import { routes } from "../routes";

export default function Nav() {
  console.log("Nav component rendered");
  const [value, setValue] = useState(0);


  return (
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
  );
}