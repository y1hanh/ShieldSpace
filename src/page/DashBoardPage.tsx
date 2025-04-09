import {
  Box,
  Typography,
  Button,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import AssessmentTool from '../component/AssessmentTool';
import PageLayoutBox from '../component/PageLayOutBox';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { TypographyProps } from '@mui/material';

// Replace the float keyframes with slideIn
const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Create styled component for the animated logo
const AnimatedLogo = styled.img`
  height: auto;
  animation: ${slideIn} 1.2s ease-out forwards;
  @media (max-width: 600px) {
    width: 280px;
    max-width: 85%;
  }
  @media (min-width: 601px) and (max-width: 900px) {
    width: 320px;
    max-width: 85%;
  }
  @media (min-width: 901px) {
    width: 400px;
    max-width: 85%;
  }
`;

// Add text fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled components for text
const TextContainer = styled(Box)`
  text-align: left;
  padding: 2rem;
  border-radius: 16px;
  @media (max-width: 600px) {
    padding: 1.5rem;
    text-align: center;
    margin: 0 1rem;
  }
`;

interface AnimatedTypographyProps extends TypographyProps {
  delay?: string;
}

const AnimatedTypography = styled(Typography)<AnimatedTypographyProps>`
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  opacity: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

export default function DashBoardPage() {
  const faqList = [
    {
      question: 'What exactly is cyberbullying?',
      answer: (
        <>
          Cyberbullying refers to the use of digital platforms to harass, intimidate, or harm
          children and young people, causing emotional distress. This behavior occurs across various
          online environments including social media platforms, gaming communities, applications,
          and other electronic services. Examples include harmful or hurtful content shared through
          posts, comments, text messages, chat conversations, livestreams, memes, images, videos,
          and email communications.{' '}
          <a
            href="https://www.esafety.gov.au/key-topics/cyberbullying"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'underline' }}
          >
            Learn more
          </a>
          .
        </>
      ),
    },
    {
      question: 'How do I report cyberbullying on social media?',
      answer: (
        <>
          <Typography sx={{ mb: 1 }}>
            1. First, report directly to the social media platform where the bullying is occurring.
            Most platforms have built-in reporting features for harmful content.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            2. If the platform doesn't remove the content within 48 hours, you can report to the{' '}
            <a
              href="https://www.esafety.gov.au/report"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#1976d2', textDecoration: 'underline' }}
            >
              eSafety Commissioner
            </a>
            . This is specifically for:
          </Typography>
          <ul style={{ marginTop: 0, marginBottom: 8, paddingLeft: '1.2rem' }}>
            <li>Children under 18 who are being cyberbullied</li>
            <li>Adults who need to report on behalf of a child</li>
          </ul>
          <Typography sx={{ mb: 1 }}>3. When reporting to eSafety, you'll need to:</Typography>
          <ul style={{ marginTop: 0, paddingLeft: '1.2rem' }}>
            <li>Provide evidence of the cyberbullying (screenshots)</li>
            <li>Show that you've already reported to the social media service</li>
          </ul>
        </>
      ),
    },
    {
      question: 'Will the bullying get worse if I report it?',
      answer: (
        <>
          <Typography sx={{ mb: 1 }}>
            While it's a common fear, reporting cyberbullying typically does not make the situation
            worse. In fact:
          </Typography>
          <ul style={{ marginTop: 0, marginBottom: 8, paddingLeft: '1.2rem' }}>
            <li>Most cyberbullies back down when confronted by authority figures</li>
            <li>The majority of cyberbullying situations improve after reporting</li>
            <li>
              Reporting creates a record of the behaviour, which helps establish patterns if needed
              later
            </li>
            <li>
              Schools, platforms, and authorities can't address problems they don't know about.
            </li>
          </ul>
          <a
            href="https://socialmediavictims.org/cyberbullying/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'underline' }}
          >
            Learn more
          </a>
        </>
      ),
    },
    {
      question: "How can I help a friend who's being cyberbullied?",
      answer: (
        <>
          <Typography sx={{ mb: 1 }}>
            1. Listen and support them – let them know it's not their fault.
          </Typography>
          <Typography sx={{ mb: 1 }}>2. Help collect evidence with screenshots.</Typography>
          <Typography sx={{ mb: 1 }}>
            3. Assist with reporting to the platform and blocking bullies.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            4. Suggest a temporary break from the platform if needed.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            5. Connect them with trusted adults or support services.
          </Typography>
          <Typography sx={{ mb: 1 }}>6. Check-in regularly to show you care.</Typography>
          <Typography sx={{ mb: 1 }}>7. Stand up for them when it's safe to do so.</Typography>
          <a
            href="https://www.esafety.gov.au/key-topics/cyberbullying/how-to-help-someone-deal-with-cyberbullying"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'underline' }}
          >
            Know more
          </a>
        </>
      ),
    },
    {
      question: 'Should I tell my parents or teachers about cyberbullying?',
      answer: (
        <>
          <Typography sx={{ mb: 1 }}>
            • You're not alone in this – Dealing with online bullying can make you feel really
            isolated, but remember that parents and teachers have helped lots of kids through these
            exact situations before.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            • They can step in where you can't – Your school has rules against bullying, and parents
            have ways to help that aren't available to you, like talking to other parents or
            reaching out to your school's leadership.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            • They'll be there for you emotionally – Just having someone who really listens and
            tells you your feelings matter can make a huge difference when you're going through
            something tough.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            • They can help gather proof – Adults can help you take screenshots, keep track of
            what's happening, and file proper reports with social media platforms or whoever needs
            to know.
          </Typography>
          <Typography sx={{ mb: 1 }}>
            • They'll keep an eye out for you – Parents and teachers can watch how things develop
            and jump in quickly if the bullying doesn't stop or gets worse.
          </Typography>
          <a
            href="https://www.esafety.gov.au/parents/issues-and-advice/cyberbullying"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1976d2', textDecoration: 'underline' }}
          >
            Know more
          </a>
        </>
      ),
    },
  ];

  const SupportCard = ({ icon, title, subtitle, buttonLabel, color, onClick }) => (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '1rem',
        borderLeft: `6px solid ${color}`,
        backgroundColor: '#fff',
        p: 3,
        textAlign: 'center',
        width: {
          xs: '80%', // Full width on very small screens
          sm: '30%', // Roughly one-third of container width
        },
        minWidth: {
          xs: '100px', // Minimum width to maintain readability
          sm: '220px', // Smaller minimum on tablets
          md: '250px', // Slightly larger on desktop
        },
        maxWidth: {
          xs: '100%',
          sm: '32%',
          md: '30%',
          lg: '20%',
        },
        minHeight: {
          xs: '5vh',
          sm: '8vh',
          md: '9vh',
          lg: '13vh',
        },
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}20`,
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography fontWeight={700}>{title}</Typography>
          <Typography color="text.secondary" variant="body2">
            {subtitle}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto' }}>
        <Button
          variant="contained"
          onClick={onClick}
          sx={{
            backgroundColor: color,
            color: 'white',
            borderRadius: '25px',
            textTransform: 'none',
            maxWidth: '60%',
            px: 4,
            mt: 'auto',
            '&:hover': {
              backgroundColor: `${color}CC`,
            },
          }}
        >
          {buttonLabel}
        </Button>
      </Box>
    </Paper>
  );

  return (
    <PageLayoutBox
      innerSx={{
        backgroundColor: '#FFD9C2',
        justifyContent: 'center',
        height: '50%',
      }}
      header={
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'center', md: 'space-between' },
            alignItems: 'center',
            minHeight: { xs: '60vh', md: 'auto' },
            py: { xs: 4, md: 6 },
            px: { xs: 2, sm: 4, md: 6 },
            gap: { xs: 4, md: 2 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <AnimatedLogo src="/logo.png" alt="Logo" />
          </Box>

          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: '60%' },
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <TextContainer>
              <AnimatedTypography
                variant="h2"
                fontWeight="bold"
                color="white"
                gutterBottom
                delay="0.2s"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                  letterSpacing: '0.5px',
                  marginBottom: '1rem',
                }}
              >
                You're Not Alone
              </AnimatedTypography>
              <AnimatedTypography
                variant="h5"
                fontWeight={500}
                color="white"
                gutterBottom
                delay="0.4s"
                sx={{
                  opacity: 0.9,
                  marginBottom: '0.5rem',
                }}
              >
                Cyberbullying hurts.
              </AnimatedTypography>
              <AnimatedTypography
                variant="h4"
                fontWeight={600}
                color="white"
                gutterBottom
                delay="0.6s"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                  marginBottom: '1rem',
                  borderLeft: '4px solid white',
                  paddingLeft: '1rem',
                  marginLeft: '-1rem',
                }}
              >
                But you're stronger than you know.
              </AnimatedTypography>
              <AnimatedTypography
                variant="h6"
                fontWeight={400}
                color="white"
                delay="0.8s"
                sx={{
                  opacity: 0.9,
                  lineHeight: 1.6,
                  letterSpacing: '0.3px',
                }}
              >
                This tool helps you reflect, heal and grow, one step at a time.
              </AnimatedTypography>
            </TextContainer>
          </Box>
        </Box>
      }
    >
      <AssessmentTool />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, sm: 2, md: 3, lg: 4 },
          justifyContent: 'space-between',
          alignItems: 'stretch',
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: '800px',
            md: '1200px',
          },
          mt: 3,
        }}
      >
        <SupportCard
          icon={<LocalPhoneIcon />}
          title="24/7 Helpline"
          subtitle="Call 1800 55 1800"
          buttonLabel="Call Now"
          color="#f89b5e"
          onClick={() => window.open('https://kidshelpline.com.au/', '_blank')}
        />
        <SupportCard
          icon={<AssignmentIcon />}
          title="Report Cyberbullying"
          subtitle="File an official report"
          buttonLabel="Report"
          color="#f48fb1"
          onClick={() =>
            window.open(
              'https://www.esafety.gov.au/key-topics/cyberbullying/report-cyberbullying',
              '_blank'
            )
          }
        />
        <SupportCard
          icon={<EmojiPeopleIcon />}
          title="Support Someone Else"
          subtitle="Learn how to help others"
          buttonLabel="Learn How"
          color="#64b5f6"
          onClick={() =>
            window.open(
              'https://www.esafety.gov.au/key-topics/cyberbullying/how-to-help-someone-deal-with-cyberbullying',
              '_blank'
            )
          }
        />
      </Box>

      {/* FAQ Section */}
      <Box sx={{ mt: 6, backgroundColor: '#f1f8ff', borderRadius: '1rem', py: 2 }}>
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
          Common Questions
        </Typography>
        {faqList.map((item, index) => (
          <Accordion key={index} sx={{ mb: 1, backgroundColor: '#fff' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </PageLayoutBox>
  );
}
