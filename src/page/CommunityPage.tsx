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
          flexWrap: {
            xs: 'wrap',
            md: 'nowrap',
          },
          width: '80%',
          marginTop: '2rem',
          gap: '1rem',
        }}
      >
        {/* CARD 1 */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '5px solid #66CCFF',
            borderRadius: '12px',
          }}
        >
          <Box
            sx={{
              width: '60px',
              height: '60px',
              backgroundColor: '#e3f2fd',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <GroupsIcon sx={{ fontSize: 30, color: '#72b6f1' }} />
          </Box>
          <Typography fontWeight={600} color="#3A4559" sx={{ padding: '0.1rem 1rem' }}>
            Teen Support Circle
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginY: '0.1rem', color: '#7A7A9D', padding: '1.2rem 0.1rem' }}
          >
            For teens 13-17 to share experiences and support each other.
          </Typography>
          <Button
            variant="contained"
            sx={{
              fontSize: '10px',
              backgroundColor: '#FFCC99',
              color: '#3A4559',
              borderRadius: '25px',
              paddingX: '1.5rem',
              paddingY: '0.3rem',
            }}
          >
            Join Community
          </Button>
        </Box>

        {/* CARD 2 */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '5px solid #FFB3C6',
            borderRadius: '12px',
          }}
        >
          <Box
            sx={{
              width: '60px',
              height: '60px',
              backgroundColor: '#ffe5ec',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <PublicIcon sx={{ fontSize: 30, color: '#f89ba8' }} />
          </Box>
          <Typography fontWeight={600} color="#3A4559" sx={{ padding: '0.1rem 1rem' }}>
            Cultural Identity
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginY: '0.1rem', color: '#7A7A9D', padding: '1.2rem 0.1rem' }}
          >
            Support for those experiencing cultural or racial harassment.
          </Typography>
          <Button
            variant="contained"
            sx={{
              fontSize: '10px',
              backgroundColor: '#FFB3C6',
              color: '#3A4559',
              borderRadius: '25px',
              paddingX: '1.5rem',
              paddingY: '0.3rem',
            }}
          >
            Join Community
          </Button>
        </Box>

        {/* CARD 3 */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#FFFFFF',
            padding: '1.5rem',
            textAlign: 'center',
            borderTop: '5px solid #FF9966',
            borderRadius: '12px',
          }}
        >
          <Box
            sx={{
              width: '60px',
              height: '60px',
              backgroundColor: '#fff3e6',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <StarBorderIcon sx={{ fontSize: 30, color: '#f9b864' }} />
          </Box>
          <Typography fontWeight={600} color="#3A4559" sx={{ padding: '0.1rem 1rem' }}>
            Recovery & Success
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginY: '0.1rem', color: '#7A7A9D', padding: '1.2rem 0.1rem' }}
          >
            Share stories of overcoming bullying and building resilience.
          </Typography>
          <Button
            variant="contained"
            sx={{
              fontSize: '10px',
              backgroundColor: '#66CCFF',
              color: '#FFFFFF',
              borderRadius: '25px',
              paddingX: '1.5rem',
              paddingY: '0.3rem',
            }}
          >
            Join Community
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
