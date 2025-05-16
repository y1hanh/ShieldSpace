import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import PageLayoutBox from '../component/PageLayOutBox';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useState } from 'react';

const eduCategories = [
  { value: 'all', label: 'All Resources' },
  { value: 'cyberbullying', label: 'Cyberbullying Info' },
  { value: 'parent', label: 'Parent Guides' },
  { value: 'research', label: 'Research & Data' },
  { value: 'education', label: 'Education Tools' },
];

const supCategories = [
  { value: 'all', label: 'All Support' },
  { value: 'counseling', label: 'Counseling Services' },
  { value: 'mental', label: 'Mental Health' },
  { value: 'workshops', label: 'School Workshops' },
  { value: 'prevention', label: 'Bullying Prevention' },
];

const edu_cards = [
  {
    title: 'Cyberbullying Information',
    subtitle: 'Understanding Cyberbullying',
    source: 'ReachOut Australia',
    image: '/s1.png',
    link: 'https://au.reachout.com/bullying/cyberbullying/what-is-cyberbullying',
    points: [
      'What is cyberbullying and examples',
      'Steps to handle cyberbullying',
    ],
    category: 'cyberbullying',
  },
  {
    title: 'Parent Guide',
    subtitle: 'Digital Safety Guide',
    source: 'eSafety Commissioner',
    image: '/s2.png',
    link: 'https://www.esafety.gov.au/parents/issues-and-advice/cyberbullying',
    points: [
      'Recognition and response guidance',
      'Building resilience tips',
    ],
    category: 'parent',
  },
  {
    title: 'Research Data',
    subtitle: 'Research & Data',
    source: 'Australian Institute of Health and Welfare',
    image: '/s3.png',
    link: 'https://humanrights.gov.au/our-work/childrens-rights/cyberbullying',
    points: [
      'Cyberbullying exposure statistics',
      'Mental health effects',
    ],
    category: 'research',
  },
  {
    title: 'Education Toolkit',
    subtitle: 'Parent & Educator Toolkit',
    source: 'Australian Human Rights Commission',
    image: '/s4.png',
    link: 'https://www.aihw.gov.au/reports/children-youth/negative-online-experiences',
    points: [
      'Online safety rights for children',
      'Online respect resources',
    ],
    category: 'education',
  },
];

const sup_cards = [
  {
    title: 'Counselling Services',
    subtitle: 'Webchat Counselling',
    source: 'Kids Helpline',
    image: '/s1.1.png',
    link: 'https://kidshelpline.com.au/get-help/webchat-counselling',
    points: [
      'Confidential help for ages 5-25',
      '24/7 webchat counselling',
    ],
    category: 'counseling',
  },
  {
    title: 'Mental Health Support',
    subtitle: 'Online Support',
    source: 'headspace',
    image: '/s2.1.png',
    link: 'https://headspace.org.au/online-and-phone-support/connect-with-us/',
    points: [
      'Youth mental health assistance',
      'Chat, webchat and phone help',
    ],
    category: 'mental',
  },
  {
    title: 'School Workshops',
    subtitle: 'School Programs',
    source: 'Project ROCKIT',
    image: '/s3.1.png',
    link: 'https://www.projectrockit.com.au/book-program/',
    points: [
      'Anti-bullying youth workshops',
      'Leadership and online behavior training',
    ],
    category: 'workshops',
  },
  {
    title: 'Bullying Prevention',
    subtitle: 'School Workshops',
    source: "Dolly's Dream",
    image: '/s4.1.png',
    link: 'https://www.dollysdream.org.au/what-we-do/school-workshops',
    points: [
      'Digital safety workshops',
      'Building kindness and resilience',
    ],
    category: 'prevention',
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
        width: { xs: '90%', sm: 350, md: 400 },
        height: {
          xs: '100%',
          sm: '100%',
          md: 430,
          lg: 430,
        },
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        overflow: 'hidden',
        gap: 1,
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: '#FFFFFF',
        border: '3px solid #FFD6E0',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
          border: `3px solid ${buttonColor}`,
        },
      }}
    >
      {/* Top Image */}
      <Box
        sx={{
          flex: '0 0 35%',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)',
          }
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
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800, 
              color: '#FF6B6B',
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '1.3rem',
              mb: 1
            }}
          >
            {card.subtitle}
          </Typography>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: buttonColor, 
              mb: 1, 
              fontWeight: 700,
              fontFamily: '"Comic Sans MS", cursive',
              fontSize: '1rem'
            }}
          >
            {card.source}
          </Typography>

          <List dense disablePadding>
            {card.points.map((point: string, idx: number) => (
              <ListItem key={idx} disableGutters sx={{ alignItems: 'flex-start'}}>
                <ListItemIcon
                  sx={{
                    minWidth: 24,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    pt: 1,
                  }}
                >
                  <FavoriteIcon sx={{ fontSize: 16, color: '#FF6B6B' }} />
                </ListItemIcon>
                <ListItemText
                  sx={{
                    '& .MuiTypography-root': {
                      fontSize: '1rem',
                      color: '#666',
                      lineHeight: 1.5,
                      fontFamily: '"Comic Sans MS", cursive',
                    }
                  }}
                >
                  {point}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Button */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Button
            variant="contained"
            size="large"
            href={card.link}
            target="_blank"
            sx={{
              backgroundColor: buttonColor,
              borderRadius: '30px',
              textTransform: 'none',
              mb: 6,
              px: 4,
              py: 1,
              alignSelf: 'center',
              fontWeight: 700,
              fontSize: '1.1rem',
              fontFamily: '"Comic Sans MS", cursive',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: buttonColor,
                transform: 'scale(1.1)',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            Let's Learn More! 🚀
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// --- CommunityPage ---
export default function CommunityPage() {
  const [eduFilter, setEduFilter] = useState('');
  const [supFilter, setSupFilter] = useState('');

  const filteredEduCards = edu_cards.filter(card => 
    eduFilter === 'all' || card.category === eduFilter
  );

  const filteredSupCards = sup_cards.filter(card => 
    supFilter === 'all' || card.category === supFilter
  );

  return (
    <PageLayoutBox
      header={
        <Box sx={{ 
          p: 4, 
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
            <PetsIcon sx={{ fontSize: 40, color: '#FF6B6B', mr: 2 }} />
            <Typography 
              variant="h4" 
              sx={{ 
                color: 'var(--text-title)', 
                fontWeight: 800,
                fontSize: '2.5rem'
              }}
            >
              Fun Learning & Friends Zone! 🌟
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#4A90E2', 
              fontWeight: 600, 
              lineHeight: 1.6,
              fontSize: '1.3rem'
            }}
          >
            Discover cool stuff, make new friends, and learn how to stay safe and happy online! 🎮
          </Typography>
        </Box>
      }
    >
      {/* Educational Resources Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '2rem',
          mb: '3rem',
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            minWidth: '50%',
            padding: '2rem',
            borderRadius: '30px',
            mx: 'auto',
            textAlign: 'center',
            backgroundColor: '#FFF5F5',
            border: '4px solid #FFD6E0',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 40, color: '#FF6B6B', mr: 2 }} />
            <Typography 
              sx={{ 
                color: '#FF6B6B', 
                fontSize: '2.3rem', 
                fontWeight: 800,
              }}
            >
              Super Cool Learning Stuff! 📚
            </Typography>
          </Box>

          {/* Education Filter Dropdown */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel sx={{ color: '#FF6B6B' }}>Choose a Topic</InputLabel>
              <Select
                value={eduFilter}
                onChange={(e) => setEduFilter(e.target.value)}
                label="Choose a Topic"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF6B6B',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF6B6B',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF6B6B',
                  },
                }}
              >
                {eduCategories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {!eduFilter ? (
            <Box sx={{ 
              py: 8, 
              px: 4, 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: '20px',
              mb: 4
            }}>
              <Typography 
                sx={{ 
                  color: '#FF6B6B', 
                  fontSize: '1.5rem', 
                  fontWeight: 600,
                  mb: 2
                }}
              >
                👋 Welcome to Learning Resources!
              </Typography>
              <Typography 
                sx={{ 
                  color: '#666', 
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}
              >
                Please select a topic from the dropdown to explore our educational resources.
                <br />
                We have information about cyberbullying, parent guides, research data, and more!
              </Typography>
            </Box>
          ) : (
            <>
              <Typography 
                sx={{ 
                  color: '#4A90E2', 
                  fontSize: '1.3rem', 
                  mb: 4,
                }} 
                fontWeight={600}
              >
                Let's learn together about being kind and staying safe online! 🌈
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
                {filteredEduCards.map((card, index) => (
                  <ResourceCard key={index} card={card} buttonColor="#FF6B6B" />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Support Communities Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: '2rem',
          mb: '3rem',
        }}
      >
        <Box
          sx={{
            display: 'inline-block',
            minWidth: '50%',
            padding: '2rem',
            borderRadius: '30px',
            mx: 'auto',
            textAlign: 'center',
            backgroundColor: '#F0F8FF',
            border: '4px solid #B5E0FF',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: '#4A90E2', mr: 2 }} />
            <Typography 
              sx={{ 
                color: '#4A90E2', 
                fontSize: '2.3rem', 
                fontWeight: 800,
              }}
            >
              Awesome Friends & Helpers! 🤗
            </Typography>
          </Box>

          {/* Support Filter Dropdown */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel sx={{ color: '#4A90E2' }}>Choose Support Type</InputLabel>
              <Select
                value={supFilter}
                onChange={(e) => setSupFilter(e.target.value)}
                label="Choose Support Type"
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '20px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4A90E2',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4A90E2',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#4A90E2',
                  },
                }}
              >
                {supCategories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {!supFilter ? (
            <Box sx={{ 
              py: 8, 
              px: 4, 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: '20px',
              mb: 4
            }}>
              <Typography 
                sx={{ 
                  color: '#4A90E2', 
                  fontSize: '1.5rem', 
                  fontWeight: 600,
                  mb: 2
                }}
              >
                👋 Welcome to Support Communities!
              </Typography>
              <Typography 
                sx={{ 
                  color: '#666', 
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}
              >
                Please select a support type from the dropdown above to find the help you need.
                <br />
                We offer counseling, mental health support, workshops, and more!
              </Typography>
            </Box>
          ) : (
            <>
              <Typography 
                sx={{ 
                  color: '#FF6B6B', 
                  fontSize: '1.3rem', 
                  mb: 4,
                }} 
                fontWeight={600}
              >
                Meet new friends and find helpers who care about you! 💖
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
                {filteredSupCards.map((card, index) => (
                  <ResourceCard key={index} card={card} buttonColor="#4A90E2" />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </PageLayoutBox>
  );
}
