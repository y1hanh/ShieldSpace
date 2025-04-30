// import { Box, Typography, Chip, TextField, Button } from '@mui/material';

// import AvatarSelect from './AvatarSelect';
// import { useState } from 'react';

// export default function DigitalDefender() {
//   const [gameStarted, setGameStarted] = useState(false);
//   const [name, setName] = useState('');

//   const handleStart = () => {
//     setGameStarted(true);
//   };

//   const displayName = name.trim() || 'User';

//   if (gameStarted) {
//     return <AvatarSelect playerName={displayName} />;
//   }

//   return (
//     <Box
//       sx={{
//         width: '80%',
//         backgroundColor: '#fff',
//         padding: '2rem',
//         borderRadius: '1rem',
//         border: '3px solid #f89b5e',
//         mx: 'auto',
//         marginTop: '5rem',
//       }}
//     >
//       {/* Featured label */}
//       <Box
//         sx={{
//           display: 'inline-block',
//           backgroundColor: '#fdecc8',
//           color: '#b36b00',
//           borderRadius: '10px',
//           fontWeight: 700,
//           fontSize: '0.75rem',
//           px: '0.5rem',
//           py: '0.2rem',
//           mb: 1,
//         }}
//       >
//         FEATURED GAME
//       </Box>

//       {/* Title */}
//       <Typography variant="h5" fontWeight={700} color="#3A4559" gutterBottom>
//         Digital Defender: Cyber Guardian
//       </Typography>

//       {/* Description */}
//       <Typography variant="body1" color="#555" mb={2}>
//         Navigate through a digital world, building shields against negative comments and collecting
//         power-ups that teach you real-world strategies for staying safe online.
//       </Typography>

//       {/* Tags */}
//       <Box sx={{ display: 'flex', gap: '1rem', mb: 3, flexWrap: 'wrap' }}>
//         <Chip label="Resilience" sx={{ backgroundColor: '#f3f3f3', fontWeight: 500 }} />
//         <Chip label="Problem Solving" sx={{ backgroundColor: '#f3f3f3', fontWeight: 500 }} />
//         <Chip label="Emotional Control" sx={{ backgroundColor: '#f3f3f3', fontWeight: 500 }} />
//       </Box>

//       {/* Name Input */}
//       <Typography variant="body1" color="#3A4559" mb={1}>
//         Enter your name to begin:
//       </Typography>
//       <TextField
//         fullWidth
//         placeholder="Your name"
//         value={name}
//         onChange={e => setName(e.target.value)}
//         sx={{
//           mb: 3,
//           backgroundColor: '#fafafa',
//           borderRadius: '6px',
//         }}
//       />

//       {/* Start Button */}
//       <Box sx={{ textAlign: 'center' }}>
//         <Button
//           onClick={handleStart}
//           variant="contained"
//           sx={{
//             backgroundColor: '#f89b5e',
//             fontWeight: 600,
//             paddingX: '2rem',
//             paddingY: '0.6rem',
//             borderRadius: '25px',
//             boxShadow: 2,
//             '&:hover': {
//               backgroundColor: '#f57c00',
//             },
//           }}
//         >
//           START GAME
//         </Button>
//       </Box>
//     </Box>
//   );
// }
