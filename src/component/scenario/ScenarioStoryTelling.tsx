import { Box, Typography } from '@mui/material';

export default function ScenarioStoryTelling() {
  const sections = [
    {
      title: 'Recognition',
      description: 'Learn to identify different forms of cyberbullying and understand their impact',
    },
    {
      title: 'Response',
      description:
        'Develop practical strategies to respond effectively when you encounter online bullying',
    },
    {
      title: 'Resources',
      description: 'Discover helpful resources and who to turn to when you need additional support',
    },
  ];

  return (
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
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          color: '#4B3F72',
          textAlign: 'center',
          marginTop: { xs: 3, sm: 4 },
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          padding: { xs: '0 10px', sm: '0 20px', md: '0' },
          // mb: { xs: 2, sm: 3 },
        }}
      >
        What would you do?
      </Typography>
      <Typography fontWeight="bold" color="#4B3F72" mb={3}>
        You'll Learn
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
            }}
          >
            <Typography
              sx={{
                color: '#60B5FF',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 'bold',
                mb: 1,
              }}
            >
              {section.title}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                color: '#555',
                fontWeight: '600',
              }}
            >
              {section.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
