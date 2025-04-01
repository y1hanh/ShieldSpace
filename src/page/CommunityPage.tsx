import { Box, Typography, Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import PublicIcon from '@mui/icons-material/Public';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function CommunityPage() {
  console.log('CommunityPage component rendered');
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          textAlign: 'center',
          margin: 'auto',
          marginTop: '2rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '1rem',
          width: '80%',
        }}
      >
        <Typography sx={{ color: '#7A7A9D', fontWeight: 600 }} variant="h5">
          Support Community
        </Typography>
        <Typography sx={{ color: '#7A7A9D' }} variant="body1">
          conntect with peers who understand what you're going through and share experiences in a
          safe, moderated environment.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '80%',
          marginTop: '2rem',
          gap: '1rem',
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '5px solid #66CCFF',
          }}
        >
          <GroupsIcon sx={{ fontSize: 40, color: '#72b6f1', mb: 1 }} />
          <Typography fontWeight={600} color="#3A4559">Teen Support Circle</Typography>
          <Typography variant="body2" sx={{ marginY: '0.5rem' , color: '#7A7A9D'}}>
            For teens 13-17 to share experiences and support each other.
          </Typography>
          <Button variant="contained" sx={{ fontSize:'10px',backgroundColor: '#FFCC99' , color: '#3A4559', borderRadius: '25px'}}>Join Community</Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '5px solid #FFB3C6',
          }}
        >
          <PublicIcon sx={{ fontSize: 40, color: '#f89ba8', mb: 1 }} />
          <Typography fontWeight={600} color="#3A4559">Cultural Identity</Typography>
          <Typography variant="body2" sx={{ marginY: '0.5rem' , color: '#7A7A9D'}}>
            Support for those experiencing cultural or racial harassment.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ fontSize:'10px', backgroundColor: '#FFB3C6' , color: '#3A4559', borderRadius: '25px'}}>
            Join Community
          </Button>
        </Box>
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '5px solid #FF9966',
          }}
        >
          <StarBorderIcon sx={{ fontSize: 40, color: '#f9b864', mb: 1 }} />
          <Typography fontWeight={600} color="#3A4559">Recovery & Success</Typography>
          <Typography variant="body2" sx={{ marginY: '0.5rem' , color: '#7A7A9D'}}>
            Share stories of overcoming bullying and building resilience.
          </Typography>
          <Button variant="contained" sx={{ fontSize:'10px', backgroundColor: '#66CCFF' , color: '#FFFFFF', borderRadius: '25px'}}>
            Join Community
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
