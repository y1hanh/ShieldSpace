export type QuizCardProps = {
  image: string;
  alt: string;
  scenario: string[];
  options: {
    label: string;
    description: string;
    reason: string;
  }[];
};

export const quizData: QuizCardProps[] = [
  {
    image: '/quiz1.png',
    alt: 'A girl looking at a phone with a sad face',
    scenario: ['You receive a mean comment about your photo online.', ' What should you do?'],
    options: [
      {
        label: "Ignore it and don't tell anyone",
        description: 'Pretend it never happened.',
        reason:
          'Ignoring it might seem easier, but telling a trusted adult helps you feel supported and safe.',
      },
      {
        label: 'Tell a parent, teacher, or trusted adult',
        description: 'Share what happened and ask for help.',
        reason:
          'Talking to someone you trust is the best way to get support and make sure the bullying is addressed.',
      },
      {
        label: 'Reply with a mean comment back',
        description: 'Fight back with more hurtful words.',
        reason:
          'Responding with meanness can make things worse and hurt you even more. It is better to seek help.',
      },
    ],
  },
  {
    image: '/quiz2.png',
    alt: 'Two kids looking at a screen together, one upset and one supportive',
    scenario: ['You see a classmate being bullied in a group chat.', ' What can you do?'],
    options: [
      {
        label: "Join in so you don't feel left out",
        description: 'Say something mean too, so others like you.',
        reason:
          'Joining in hurts someone even more and is not kind. It is important to stand up for what is right.',
      },
      {
        label: 'Tell the bully to stop and support your classmate',
        description: 'Speak up kindly and help your friend.',
        reason:
          'Standing up to bullying shows bravery and kindness. It helps your classmate feel cared for.',
      },
      {
        label: 'Ignore it and hope it stops',
        description: 'Stay silent and do nothing.',
        reason:
          'Ignoring bullying allows it to continue. Helping your friend by speaking up or getting help is better.',
      },
    ],
  },
];
