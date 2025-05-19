type Analytics = {
  title?: string;
  image: string;
  description: string;
  action?: string;
  summary?: string;
  actionUrl?: string;
  data?: string;
  dataLink?: string;
};
export const analyticsData: Analytics[] = [
  {
    summary: 'More kids are speaking up',
    title: 'Big Jump in Reports',
    image: 'timeline_bullying.png',
    description:
      'In 2019, only 500 kids reported online bullying. But in 2024, nearly 3,000 kids spoke up. That’s a BIG jump! ',
    actionUrl: '/assessment',
    action:
      'Try our assessment tool. It’s a great way to check in with yourself and see how you’re doing. 💪',
    data: 'Source: eSafety Commissioner Media Release (February 2025)',
    dataLink:
      'https://www.esafety.gov.au/newsroom/media-releases/safer-internet-day-calls-for-kindness-as-cyberbullying-reports-surge-over-450-in-five-years',
  },
  {
    summary: 'Mean stuff speaks on apps',
    title: 'Social Media Bullying',
    image: 'social_bullying.png',
    description:
      'YouTube (79%), Snapchat (69%), and TikTok (64%) are where most kids face mean stuff. 😢',
    actionUrl: '/resources',
    action:
      'Go to our scenarios section  and learn how to block, report, or stay safe on these platforms. You’ve got backup here! 💪 ',
    data: 'Source: Take a Tumble (2024)',
    dataLink: 'https://takeatumble.com.au/insights/lifestyle/cyberbullying-statistics/',
  },
  {
    summary: "It's mostly girls -- and bad for all",
    title: 'Who Gets Bullied?',
    image: 'gender_bullying.png',
    description:
      'Out of every 9 kids bullied, 6 are girls. 😔 But remember, bullying hurts everyone, no matter who you are.',
    actionUrl: '/resources',
    action:
      'Go to our scenarios section  and learn how to block, report, or stay safe on these platforms. You’ve got backup here! 💪 ',
    data: 'Source: eSafety Commissioner Media Release (February 2023)',
    dataLink:
      'https://www.esafety.gov.au/newsroom/media-releases/40-jump-in-child-bullying-reports-to-esafety',
  },
  {
    summary: 'Lots of kids keep quiet',
    title: 'Hiding The Hurt',
    image: 'reason_bullying.png',
    description:
      'Some people get bullied just for being different — because of their gender, race, or identity. And that’s NOT okay. 🚫',
    actionUrl: '/assessment',
    action: 'Try our assessment tool. If you feel uncomfortable to speak out. 💪',
  },
  {
    summary: 'Sometimes just being different ',
    title: 'Why Do They Bully?',
    image: 'reaction_bullying.png',
    description:
      '37% don’t tell anyone. 35% block the bully. Only 28% talk to someone they trust. That means many kids are hurting silently. 😶',
    actionUrl: '/assessment',
    action:
      'Try our assessment tool. It’s a great way to check in with yourself and see how you’re doing. 💪',
    data: 'Source: Parliament of New South Wales Research Service (March 2016)',
    dataLink:
      'https://www.parliament.nsw.gov.au/researchpapers/Documents/cyberbullying-of-children/Cyberbullying%20of%20Children.pdf',
  },
  {
    summary: 'Some kids hurt deep inside',
    title: 'Mean Feelings',
    image: 'feelings_bullying.png',
    description:
      'Some kids feel really bad inside — like low self-esteem (38%), feeling lonely (33%), or helpless (20%). 😢',
    actionUrl: '/assessment',
    action:
      'Try our assessment tool. It’s a great way to check in with yourself and see how you’re doing. 💪',
    data: 'Source: eSafety Commissioner Research',
    dataLink:
      'https://www.esafety.gov.au/research/youth-digital-dangers/negative-online-experiences',
  },
];
