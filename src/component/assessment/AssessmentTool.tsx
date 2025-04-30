import { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PageLayoutBox from '../PageLayOutBox';
import { getEmotions } from '../../api';
import { useAssessment } from '../../slice/assessmentSlice';
import { useNavigate } from 'react-router';

export default function AssessmentTool() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const { setUserInput, setAnalysisResult } = useAssessment();

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (trimmed.length < 3) {
      alert('Please enter at least 3 words.');
      return;
    }

    try {
      const response = await getEmotions({ user_input: trimmed });
      setUserInput(trimmed);
      setAnalysisResult(JSON.stringify(response));
      setInput('');
      navigate('/AssessmentResult');
    } catch (err) {
      console.error('Failed to submit', err);
      alert('Submission failed.');
    }
  };

  return (
    <PageLayoutBox
      id="assessment"
      innerSx={{
        backgroundColor: '#F0F6FA',
        borderRadius: '12px',
        width:{
          xs: '60%',
          sm: '90%',
          md: '100%',
        },
        py: 6,
        transition: 'all 0.3s ease',
        
      }}
      header={
        <Box
          sx={{
            width: '100%',
            mx: 'auto',
            px: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="#4B4072" mb={4} textAlign="center">
            Assessment Tool
          </Typography>
          <Typography fontSize="16px" color="#555555" mb={4} textAlign="center">
            Paste the message you received to see if it is bullying.
          </Typography>

          <Box
            sx={{
              width: '100%',
              maxWidth: '700px',
              backgroundColor: '#fff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <TextField
              fullWidth
              placeholder="Paste the message or comment here..."
              variant="standard"
              slotProps={{ input: { disableUnderline: true } }}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              sx={{ fontSize: '1.1rem' }}
            />
            <IconButton
              onClick={handleSubmit}
              sx={{
                backgroundColor: '#f89b5e',
                color: 'white',
                ml: 1,
                width: 50,
                height: 50,
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: '#f57c00',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>

          <Typography
            fontSize="14px"
            color="#555555"
            mt={4}
            sx={{ fontStyle: 'italic', textAlign: 'center' }}
          >
            We'll help you understand if this is cyberbullying and suggest ways to respond.
          </Typography>
        </Box>
      }
    >
      <Box />
    </PageLayoutBox>
  );
}
// import { useState } from 'react';
// import { Box, Typography, TextField, IconButton, Button, Fade, Grow } from '@mui/material';
// import SendIcon from '@mui/icons-material/Send';
// import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import PageLayoutBox from '../PageLayOutBox';
// import MessageAnalysis from './MessageAnalysis';
// import { getEmotions } from '../../api';
// import { useAssessment } from '../../slice/assessmentSlice';

// export default function AssessmentTool() {
//   const [input, setInput] = useState('');
//   const [submitted, setSubmitted] = useState(false);
//   const [showResult, setShowResult] = useState(false);

//   const { setUserInput, setAnalysisResult } = useAssessment();

//   const handleSubmit = async () => {
//     const trimmed = input.trim();
//     if (trimmed.length < 3) {
//       alert('Please enter at least 3 words.');
//       return;
//     }

//     try {
//       const response = await getEmotions({ user_input: trimmed });
//       setUserInput(trimmed);
//       setAnalysisResult(JSON.stringify(response));

//       setInput('');
//       setSubmitted(true);
//       setTimeout(() => {
//         setShowResult(true);
//       }, 280);
//     } catch (err) {
//       console.error('Failed to submit', err);
//       alert('Submission failed.');
//     }
//   };

//   const resetAssessment = () => {
//     localStorage.removeItem('analysisResult');
//     localStorage.removeItem('userInput');
//     setInput('');
//     setSubmitted(false);
//     setShowResult(false);
//   };

//   return (
//     <PageLayoutBox
//       id="assessment"
//       innerSx={{
//         backgroundColor: '#E2F3FF',
//         py: 6,
//       }}
//       header={
//         <>
//           <Typography variant="h4" fontWeight="bold" color="#4B4072" mb={4}>
//             Assessment Tool
//           </Typography>
//           {!submitted && (
//             <Typography fontSize="16px" color="#555555" mb={4}>
//               Paste the message you received to see if it is bullying.
//             </Typography>
//           )}

//           <Box
//             sx={{
//               borderRadius: '20px',
//               position: 'relative',
//               p: 3,
//               gap: 3,
//               justifyContent: 'space-between',
//               mx: 'auto',
//               display: 'flex',
//               alignItems: 'center',
//             }}
//           >
//             {/* {submitted ? (
//               <Fade in={showResult} timeout={1000}>
//                 <Grow in={showResult} timeout={1000}>
//                   <Box sx={{ width: { xs: '100%', sm: '500px' } }}>
//                     <MessageAnalysis />
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//                       <Button
//                         variant="contained"
//                         onClick={resetAssessment}
//                         startIcon={<RestartAltIcon />}
//                         sx={{
//                           backgroundColor: '#f89b5e',
//                           color: 'white',
//                           borderRadius: '25px',
//                           px: 4,
//                           textTransform: 'none',
//                           '&:hover': {
//                             backgroundColor: '#f57c00',
//                           },
//                         }}
//                       >
//                         Analyze Again
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Grow>
//               </Fade>
//             ) : ( */}
//             {/* <> */}
//             <Box sx={{ flex: 1 }}>
//               <Box
//                 sx={{
//                   backgroundColor: '#fff',
//                   borderRadius: '12px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   px: 2,
//                   py: 1,
//                   border: '1px solid #ddd',
//                 }}
//               >
//                 <TextField
//                   fullWidth
//                   placeholder="Paste the message here..."
//                   InputProps={{ disableUnderline: true }}
//                   variant="standard"
//                   value={input}
//                   onChange={e => setInput(e.target.value)}
//                   onKeyDown={e => e.key === 'Enter' && handleSubmit()}
//                   sx={{
//                     fontSize: {
//                       xs: '0.9rem',
//                       sm: '1rem',
//                       md: '1.1rem',
//                     },
//                     width: {
//                       xs: '100%',
//                       sm: '400px',
//                       md: '700px',
//                     },
//                     mx: 'auto',
//                   }}
//                 />
//                 <IconButton
//                   onClick={handleSubmit}
//                   sx={{
//                     backgroundColor: '#f89b5e',
//                     color: 'white',
//                     ml: 1,
//                     width: 50,
//                     height: 50,
//                     borderRadius: '50%',
//                     '&:hover': {
//                       backgroundColor: '#f57c00',
//                     },
//                   }}
//                 >
//                   <SendIcon />
//                 </IconButton>
//               </Box>
//               <Typography fontSize="14px" color="#555555" mt={4} sx={{ fontStyle: 'italic' }}>
//                 We'll help you understand if this is cyberbullying and suggest ways to respond.
//               </Typography>
//             </Box>
//           </Box>
//         </>
//       }
//     >
//       <Box />
//     </PageLayoutBox>
//   );
// }
