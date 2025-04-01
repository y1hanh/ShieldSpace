import { Box, Container } from "@mui/material";
import Nav from "./component/nav";
import { Outlet } from "react-router";

function App() {
  console.log("App component rendered");
  const unUsed = "";
  return (
    <div className="App">
      <Box sx={{position: "fixed", top: 0, left: 0, width: "100vw", zIndex: 1000, bgcolor: "#FFFFFF"}}>
        <Nav />
      </Box>

      <Box sx={{bgcolor: "#F0F6FA", width: "100vw", height: "100vh", marginTop: "5rem"}}>
        <Outlet />
      </Box>
    </div>
  );
}

export default App;
