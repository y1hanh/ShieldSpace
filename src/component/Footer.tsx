import { Box, Typography, Link, useMediaQuery, useTheme } from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1B1B2F',
        color: 'white',
        px: { xs: 2, sm: 4 },
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        {/* Company Info */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              mt: 2,
            }}
          >
            <Box
              component="img"
              src="/shield.png"
              alt="No More Bully Logo"
              sx={{
                height: { xs: '32px', sm: '36px' },
                width: 'auto',

                marginRight: '0.75rem',
                objectFit: 'contain',
                verticalAlign: 'middle',
              }}
            />
            <Link href="/" sx={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
              <Typography variant="h6" fontWeight="bold">
                No More Bully
              </Typography>
            </Link>
          </Box>
          <Typography variant="body2" sx={{ color: '#ccc', maxWidth: '90%' }}>
            We're dedicated to creating safer online spaces by providing tools and resources to
            combat cyberbullying.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          //borderTop: '1px solid #444',
          mt: 3,
          pt: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: '#888' }}>
          © {new Date().getFullYear()} No More Bully. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
