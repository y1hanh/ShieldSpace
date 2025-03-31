import { Box, Typography } from "@mui/material";
import Nav from "./component/nav";
import { Outlet } from "react-router";
import WebTitle from "./component/webTitle";

function App() {
  console.log("App component rendered");
  const unUsed = "";
  return (
    <div className="App">
      <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent:"space-between", alignItems: 'center',padding: '1rem'}}>
        <WebTitle />
        <Nav />
      </Box>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
