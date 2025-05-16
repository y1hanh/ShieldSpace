import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 2 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#f89b5e',
                mr: 1,
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              No More Bully
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#ccc', maxWidth: '90%' }}>
            We're dedicated to creating safer online spaces by providing tools and resources to
            combat cyberbullying.
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 3,
            pt: 2,
            textAlign: 'right',
          }}
        >
          <Link
            href="https://bit.ly/ShieldSpace_FIT5120"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
          >
            <Typography variant="body2" sx={{ color: '#ccc', textDecoration: 'underline' }}>
              About Us
            </Typography>
          </Link>
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
