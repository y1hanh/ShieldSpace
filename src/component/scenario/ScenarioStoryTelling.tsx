import { Box, Typography } from '@mui/material';

export default function ScenarioStoryTelling() {
  const sections = [
    {
      title: 'Recognition',
      description: 'Learn to identify different forms of cyberbullying and understand their impact',
      icon: '🔍',
      color: '#E0F4FF', // Soft blue background
    },
    {
      title: 'Response',
      description:
        'Develop practical strategies to respond effectively when you encounter online bullying',
      icon: '💪',
      color: '#E6FFE0', // Soft green background
    },
    {
      title: 'Resources',
      description: 'Discover helpful resources and who to turn to when you need additional support',
      icon: '📚',
      color: '#FFE0E6', // Soft pink background
    },
  ];

  return (
    <>
      <Box
        sx={{
          maxWidth: '1000px',
          mx: 'auto',
          mt: 4,
          mb: 4,
          px: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--background-secondary)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: 'var(--text-title)',
            textAlign: 'center',
            marginTop: { xs: 3, sm: 4 },
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            padding: { xs: '0 10px', sm: '0 20px', md: '0' },
            animation: 'slideIn 0.8s ease-out',
          }}
        >
          Scenarios: What Would You Do?
        </Typography>
        <Typography
          color="var(--text-body)"
          mb={2}
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
            animation: 'slideIn 0.8s ease-out',
          }}
        >
          Real stories. Real choices. Learn how to stay safe and support your friends online.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 3,
            mb: 2,
          }}
        >
          {sections.map((section, index) => (
            <Box
              key={index}
              sx={{
                flex: 1,
                textAlign: 'center',
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: section.color,
                borderRadius: '16px',
                padding: '24px',
                border: '2px solid rgba(255,255,255,0.8)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
                opacity: 0,
                animation: `slideIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${index * 0.2}s`,
                '@keyframes slideIn': {
                  '0%': {
                    opacity: 0,
                    transform: 'translateY(30px) scale(0.9)',
                  },
                  '100%': {
                    opacity: 1,
                    transform: 'translateY(0) scale(1)',
                  },
                },
              }}
            >
              <Typography
                sx={{
                  color: 'var(--text-subtitle)',
                  fontSize: { xs: '1.3rem', sm: '1.6rem' },
                  fontWeight: 'bold',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.08)',
                }}
              >
                <span style={{ fontSize: '1.8em' }}>{section.icon}</span>
                {section.title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: 'var(--text-body)',
                  fontWeight: '600',
                  lineHeight: '1.8',
                  letterSpacing: '0.3px',
                }}
              >
                {section.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
