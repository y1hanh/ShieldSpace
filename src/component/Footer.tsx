import { Box, Typography, Link } from '@mui/material';

export default function Footer() {
  const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Analyser', href: '/assessment' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Scenarios', href: '/resources' },
    { label: 'Resources & Community', href: '/community' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1B1B2F',
        color: 'white',
        px: { xs: 2, sm: 4 },
        py: 4,
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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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

        {/* Links */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
          }}
        >
          {footerLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              underline="hover"
              sx={{
                color: '#aaa',
                fontSize: '0.9rem',
                '&:hover': {
                  color: '#fff',
                },
              }}
            >
              {label}
            </Link>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          borderTop: '1px solid #444',
          mt: 3,
          pt: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: '#888' }}>
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}