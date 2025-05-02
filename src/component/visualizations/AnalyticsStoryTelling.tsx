import { Box, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AnalyticsStoryTelling() {
  const linesRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (linesRef.current.length) {
      gsap.to(linesRef.current, {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: 'power2.out',
        stagger: 0.3,
      });
    }
  }, []);

  const lines = [
    'These aren’t just charts. They’re stories.',
    'Stories of real people, real pain — and real chances to help.',
    'You don’t have to fix the whole world.',
    'Just be one kind voice.',
    'Because even one good message can change someone’s day.',
  ];

  return (
    <Box sx={{ textAlign: 'center', mb: 4 }}>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: 'var(--text-title)' }}>
        The Reality of Online Bullying
      </Typography>
      {lines.map((line, index) => (
        <Typography
          key={index}
          ref={el => {
            linesRef.current[index] = el;
          }}
          sx={{ opacity: 0, transform: 'translateY(20px)', color: 'var(--text-body)' }}
        >
          {line}
        </Typography>
      ))}
    </Box>
  );
}
