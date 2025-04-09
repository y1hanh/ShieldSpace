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
        gap: 2,
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
      <Button
        variant="contained"
        onClick={onClick}
        sx={{
          backgroundColor: color,
          color: 'white',
          borderRadius: '25px',
          textTransform: 'none',
          px: 4,
          mt: 'auto',
          '&:hover': {
            backgroundColor: `${color}CC`,
          },
        }}
      >
        {buttonLabel}
      </Button>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            px: 6,
            flexWrap: 'wrap',
          }}
        >
          <img
            src="/logo.png"
            alt="Logo"
            style={{ marginBottom: '1rem', maxWidth: '40%', height: 'auto' }}
          />

          <Box sx={{ textAlign: 'center', maxWidth: '400px' }}>
            <Typography variant="h3" fontWeight="bold" color="white" gutterBottom>
              You're Not Alone
            </Typography>
            <Typography variant="h6" fontWeight={500} color="white" gutterBottom>
              Cyberbullying hurts.
            </Typography>
            <Typography variant="h6" fontWeight={500} color="white" gutterBottom>
              But you're stronger than you know.
            </Typography>
            <Typography variant="h6" fontWeight={500} color="white" gutterBottom>
              This tool helps you reflect, heal and grow — one step at a time.
            </Typography>
          </Box>
        </Box>
      }
    >
      <AssessmentTool />
     
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 5.9,
          justifyContent: 'center',
          width: '100%',
          maxWidth: '900px',
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
          onClick={() => window.open('https://www.esafety.gov.au/key-topics/cyberbullying/report-cyberbullying', '_blank')}
        />
        <SupportCard
          icon={<EmojiPeopleIcon />}
          title="Support Someone Else"
          subtitle="Learn how to help others"
          buttonLabel="Learn How"
          color="#64b5f6"
          onClick={() => window.open('https://www.esafety.gov.au/key-topics/cyberbullying/how-to-help-someone-deal-with-cyberbullying', '_blank')}
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
