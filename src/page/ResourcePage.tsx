import { Box, Typography, Button } from '@mui/material';

export default function ResourcePage() {
  console.log('ResourcePage component rendered');
  const steps = [
    {
      number: '1.',
      title: 'Identify Trusted Adults',
      description: 'List 3 adults you can talk to about online issues',
      bgColor: '#eaf6ff', 
    },
    {
      number: '2.',
      title: 'Document Evidence',
      description: 'Learn how to take screenshots and save harmful messages',
      bgColor: '#fff4ee', 
    },
    {
      number: '3.',
      title: 'Create Response Scripts',
      description: 'Prepare responses or know when not to engage',
      bgColor: '#fdf4f7', 
    },
    {
      number: '4.',
      title: 'Know Emergency Resources',
      description: 'Save helpline numbers on your phone for quick access',
      bgColor: '#fef9f4', 
    },
  ];
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
          flexDirection: 'column',
          textAlign: 'left',
          width: '85%',
          marginTop: '2rem',
          gap: '1rem',
        }}
      >
        <Typography
          sx={{ color: '#3A4559', fontWeight: 600, marginBottom: '-0.5rem' }}
          variant="h5"
        >
          Resource Library
        </Typography>
        <Box
          sx={{
            height: '3px',
            width: '60px',
            backgroundColor: '#f7954d',
            borderRadius: '2px',
            marginBottom: '0.5rem',
          }}
        />
        <Typography sx={{ color: '#7A7A9D' }} variant="body1">
          Access tools, guides, and suport resources to help you navigate cyberbullying.
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '90%',
          flexWrap: {
            xs: 'wrap',
            md: 'nowrap',
          },
          marginTop: '2rem',
          gap: '1rem',
        }}
      >
        {[
          {
            title: 'Reporting Guides',
            description: 'Step-by-step instructions for reporting bullying on different platforms.',
            button: 'View Guides',
            icon: '✔️',
          },
          {
            title: 'Mental Health Tools',
            description: 'Resources for managing stress, anxiety, and building resilience.',
            button: 'Access Tools',
            icon: '🧠',
          },
          {
            title: 'Educational Resources',
            description: 'Information about cyberbullying, digital citizenship, and online safety.',
            button: 'Learn More',
            icon: '📚',
          },
          {
            title: 'Templates & Scripts',
            description: 'Pre-written templates for talking to schools, parents, and platforms.',
            button: 'Get Templates',
            icon: '📝',
          },
        ].map((item, index) => (
          <Box
            key={index}
            sx={{
              
              backgroundColor: '#fff',
              borderRadius: '1rem',
              padding: '1.2rem 0rem',
              borderTop: '5px solid #f8bbd0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Icon in Circle */}
            <Box
              sx={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: '#fdeaf1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                mb: 2,
              }}
            >
              {item.icon}
            </Box>

            {/* Title & Description */}
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3A4559'}}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#7A7A9D', mt: 1 }}>
              {item.description}
            </Typography>

            {/* Button */}
            <Box
              sx={{
                marginTop: '1.5rem',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#f8bbd0',
                  color: '#3A4559',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: '0.2s',
                  '&:hover': {
                    backgroundColor: '#f48fb1',
                  },
                }}
              >
                {item.button}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: '85%',
          backgroundColor: '#f9fbfc',
          borderRadius: '16px',
          padding: '2rem',
          marginTop: '3rem',
          position: 'relative',
          borderTop: '5px solid #66CCFF',
        }}
      >
        {/* Title */}
        <Typography variant="h6" sx={{ color: '#3A4559', fontWeight: 600 }}>
          What Support Do You Need?
        </Typography>
        <Typography variant="body2" sx={{ color: '#7A7A9D', mb: 3 }}>
          Use this guide to find the right resources for your situation
        </Typography>
        <Box
          component="img"
          src="../public/support-flow.png" 
          alt="Support flow chart"
          sx={{
            maxWidth: '100%',
            marginTop: '1rem',
          }}
        />
      </Box>
      <Box
      sx={{
        backgroundColor: '#fff',
        padding: '2rem',
        marginTop: '3rem',
        width: '90%',
        borderRadius: '16px',
        borderTop: '5px solid #FF9966',
      }}
    >
      {/* Section Title */}
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#3A4559', mb: 1 }}>
        Emergency Support
      </Typography>
      <Typography variant="body2" sx={{ color: '#7A7A9D', mb: 3 }}>
        If you're in immediate distress or need urgent support, these services are available 24/7.
      </Typography>

      {/* Support Cards */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          gap: '1rem',
        }}
      >
        {/* Card 1: Kids Helpline */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: '0 0 1rem 1rem',
            borderTop: '6px solid #FF9966',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3A4559' }}>
            Kids Helpline
          </Typography>
          <Typography variant="body2" sx={{ color: '#7A7A9D', mt: 1 }}>
            Free, private counseling service for young people aged 5–25.
          </Typography>
          <Typography variant="h6" sx={{ color: '#f89b5e', mt: 2 }}>
            1800 55 1800
          </Typography>
        </Box>

        {/* Card 2: Lifeline */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: '0 0 1rem 1rem',
            borderTop: '6px solid #FF9966',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3A4559' }}>
            Lifeline
          </Typography>
          <Typography variant="body2" sx={{ color: '#7A7A9D', mt: 1 }}>
            Crisis support and suicide prevention services.
          </Typography>
          <Typography variant="h6" sx={{ color: '#f89b5e', mt: 2 }}>
            13 11 14
          </Typography>
        </Box>

        {/* Card 3: eSafety Commissioner */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: '0 0 1rem 1rem',
            borderTop: '6px solid #FF9966',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            padding: '1.5rem',
            textAlign: 'center',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3A4559' }}>
            eSafety Commissioner
          </Typography>
          <Typography variant="body2" sx={{ color: '#7A7A9D', mt: 1 }}>
            Report serious cyberbullying affecting Australian children.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#f89b5e',
              color: '#fff',
              borderRadius: '30px',
              paddingX: '1.5rem',
              paddingY: '0.5rem',
              fontSize: '0.875rem',
              marginTop: '1.2rem',
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            Online Reporting Form
          </Button>
        </Box>
      </Box>
    </Box> 
    <Box
      sx={{
        backgroundColor: '#fff',
        borderTop: '6px solid #80d0ff',
        borderRadius: '16px',
        padding: '2rem',
        width: '90%',
        marginTop: '3rem',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, color: '#3A4559', mb: 2 }}>
        Create Your Personal Safety Plan
      </Typography>

      {/* Step Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
          },
          gap: '1rem',
        }}
      >
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: step.bgColor,
              padding: '1.25rem',
              borderRadius: '12px',
              border: '1px solid #E4E2E2',
            }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#3A4559' }}>
              {step.number} {step.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#7A7A9D', mt: 0.5 }}>
              {step.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>   
    </Box>
  );
}
