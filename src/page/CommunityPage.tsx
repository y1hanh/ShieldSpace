import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PageLayoutBox from '../component/PageLayOutBox';


const edu_cards = [
  {
    title: 'Cyberbullying Information',
    subtitle: 'Understanding Cyberbullying',
    source: 'ReachOut Australia',
    image: '/s1.png',
    link: 'https://au.reachout.com/bullying/cyberbullying/what-is-cyberbullying',  
    points: [
      'Explains what cyberbullying is, including examples',
      'Provides signs someone might be experiencing cyberbullying',
      'Offers practical steps for dealing with cyberbullying',
    ],
  },
  {
    title: 'Parent Guide',
    subtitle: 'Digital Safety Guide',
    source: 'eSafety Commissioner',
    image: '/s2.png',
    link:'https://www.esafety.gov.au/parents/issues-and-advice/cyberbullying',
    points: [
      'Provides guidance for parents to recognize and respond',
      'Lists practical steps like supporting children emotionally',
      'Recommends strategies for building resilience',
    ],
  },
  {
    title: 'Research Data',
    subtitle: 'Research & Data',
    source: 'Australian Institute of Health and Welfare',
    image: '/s3.png',
    link:'https://humanrights.gov.au/our-work/childrens-rights/cyberbullying',
    points: [
      "Offers data on children's exposure to cyberbullying",
      'Highlights the impact on mental health',
      'Provides statistics on trends and risks for youth',
    ],
  },
  {
    title: 'Education Toolkit',
    subtitle: 'Parent & Educator Toolkit',
    source: 'Australian Human Rights Commission',
    image: '/s4.png',
    link:'https://www.aihw.gov.au/reports/children-youth/negative-online-experiences',
    points: [
      "Highlights children's rights concerning online safety",
      'Focuses on legal frameworks protecting young people',
      'Shares educational resources on online respect',
    ],
  },
];

const sup_cards = [
  {
    title: 'Counselling Services',
    subtitle: 'Webchat Counselling',
    source: 'Kids Helpline',
    image: '/s1.1.png',
    link:'https://kidshelpline.com.au/get-help/webchat-counselling',
    points: [
      'Private, confidential counselling for ages 5–25.',
      'Immediate support for cyberbullying or anxiety.',
      '24/7 access to trained counsellors via webchat.',
    ],
  },
  {
    title: 'Mental Health Support',
    subtitle: 'Online Support',
    source: 'headspace',
    image: '/s2.1.png',
    link:'https://headspace.org.au/online-and-phone-support/connect-with-us/',
    points: [
      'Support for young people facing mental health challenges.',
      'Group chats, one-on-one webchat, and phone support.',
      'Promoting well-being and resilience in young Australians.',
    ],
  },
  {
    title: 'School Workshops',
    subtitle: 'School Programs',
    source: 'Project ROCKIT',
    image: '/s3.1.png',
    link:'https://www.projectrockit.com.au/book-program/',
    points: [
      'Workshops empowering youth to stand against bullying.',
      'Focus on empathy, leadership, and positive online behavior.',
      'Available nationwide for lasting cultural change.',
    ],
  },
  {
    title: 'Bullying Prevention',
    subtitle: 'School Workshops',
    source: "Dolly's Dream",
    image: '/s4.1.png',
    link:'https://www.dollysdream.org.au/what-we-do/school-workshops',
    points: [
      'Workshops on cyberbullying and digital safety.',
      'Focus on kindness, resilience, and safer online spaces.',
      'Inspired by Dolly Everett’s legacy to raise awareness.',
    ],
  },
];

// --- ResourceCard Component ---
interface Card {
  title: string;
  subtitle: string;
  source: string;
  image: string;
  points: string[];
  link: string; 
}

function ResourceCard({ card, buttonColor }: { card: Card; buttonColor: string }) {
  return (
    <Box
      sx={{
        width: { xs: '90%', sm: 350, md: 450 },
        height: 400,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        gap: 1,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      {/* Top Image */}
      <Box
        sx={{
          flex: '0 0 35%',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={card.image}
          alt="Card Top"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Content */}
      <Box
        sx={{
          backgroundColor: '#FFFFFF',
          flex: '1 0 65%',
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {card.subtitle}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#777', mb: 1 }}>
            {card.source}
          </Typography>

          <List dense disablePadding>
            {card.points.map((point: string, idx: number) => (
              <ListItem key={idx} disableGutters sx={{ alignItems: 'center' }}>
                <ListItemIcon
                  sx={{
                    minWidth: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <FiberManualRecordIcon sx={{ fontSize: 8, color: '#F45B48' }} />
                </ListItemIcon>
                <ListItemText
                  slotProps={{
                    primary: {
                      fontSize: '0.8rem',
                    },
                  }}
                >
                  {point}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Button */}
        <Button
          variant="contained"
          size="small"
          href={card.link}
          target="_blank"
          sx={{
            backgroundColor: buttonColor,
            borderRadius: '20px',
            textTransform: 'none',
            px: 2,
            mt: 1,
            mb: 2,
            alignSelf: 'center',
            '&:hover': {
              backgroundColor: '#d84a3b',
            },
          }}
        >
          Learn more
        </Button>
      </Box>
    </Box>
  );
}

// --- CommunityPage ---
export default function CommunityPage() {
  return (
    <PageLayoutBox
      header={
        <>
          <Typography variant="h4" sx={{ color: '#4A4A6A', fontWeight: 600, mb: 3 }}>
            Resources & Community
          </Typography>
          <Typography variant="body1" sx={{ color: '#7A7A9D', mb: 4 }}>
            Access trusted resources, find support, and join a community dedicated to creating safer
            online spaces for everyone.
          </Typography>
        </>
      }
    >
      {/* Educational Resources Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '1rem',
          mb: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            minWidth: '50%',
            padding: '1rem',
            //backgroundColor: '#D4F0F6',
            borderRadius: '16px',
            //boxShadow: 1,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Box textAlign="center" mt={1}>
            <Typography sx={{ color: '#333333', fontSize: '2rem', mb: 2 }}>
              Educational Resources
            </Typography>
            <Typography sx={{ color: '#7A7A9D' }} variant="body1">
              Empower yourself with knowledge and tools to recognize, prevent, and respond to
              bullying.
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 4,
                mt: 4,
                mb: 4,
              }}
            >
              {edu_cards.map((card, index) => (
                <ResourceCard key={index} card={card} buttonColor="#f45b48" />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Support Communities Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '1rem',
          mb: '2rem',
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            minWidth: '50%',
            padding: '1rem',
            //backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            //boxShadow: 1,
            mx: 'auto',
            textAlign: 'center',
          }}
        >
          <Box textAlign="center" mt={1}>
            <Typography sx={{ color: '#333333', fontSize: '2rem', mb: 2 }}>
              Support Communities
            </Typography>
            <Typography sx={{ color: '#7A7A9D' }} variant="body1">
              Connect with others who understand your experiences and get practical support.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 4,
                mt: 4,
                mb: 4,
              }}
            >
              {sup_cards.map((card, index) => (
                <ResourceCard key={index} card={card} buttonColor="#6A4CA7" />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayoutBox>
  );
}
