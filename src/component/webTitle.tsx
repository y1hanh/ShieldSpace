import { Box, Typography } from "@mui/material";

export default function WebTitle() {
  return (
    <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center', alignItems: 'center'}}>
      <Box sx={{ backgroundColor: '#FF9966', width: '2.5rem', height:'2.5rem', borderRadius:'50%', marginRight:'0.2rem' }}></Box>
      <Typography sx={{ color: '#FF9966', fontWeight: 600, textWrap: "nowrap" }} variant="h5"> No More Bullying !</Typography>
    </Box>
  )
}
