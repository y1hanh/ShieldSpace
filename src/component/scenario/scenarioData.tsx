export type QuizCardProps = {
  image: string;
  alt: string;
  scenario: string[];
  choices: {
    text: string;
    feedback: string;
    right?: boolean;
  }[];
  answer: string;
};

export const quizData: QuizCardProps[] = [
  {
    image: '/quiz1.jpg',
    alt: 'A girl looking at a phone with a sad face',
    scenario: [
      'You see someone posting mean comments about your classmate online.',
      ' What should you do?',
    ],
    choices: [
      {
        text: 'Join in and comment',
        feedback: 'Joining in encourages bullying and makes it worse.',
      },
      {
        text: 'Ignore it',
        feedback: "Ignoring may stop it for you, but it doesn't help your classmate.",
      },
      {
        text: 'Report it and support your classmate',
        feedback: 'Best choice! You help stop the bullying and support your classmate.',
        right: true,
      },
      {
        text: 'Share it with more people',
        feedback: 'Sharing it makes the bullying spread and causes more harm.',
      },
    ],
    answer: 'Report it and support your classmate',
  },
  {
    image: '/quiz2.jpg',
    alt: 'Two kids looking at a screen together, one upset and one supportive',
    scenario: [
      'A friend sends you a funny meme about another student that could hurt their feelings',
      ' What can you do?',
    ],
    choices: [
      { text: 'Laugh and share it', feedback: 'Laughing and sharing can hurt the student more.' },
      {
        text: "Tell your friend it's not kind",
        feedback: "Correct! You help your friend understand why it's wrong.",
        right: true,
      },
      { text: 'Ignore it', feedback: 'Ignoring allows harmful behavior to continue.' },
      {
        text: 'Post it on your story',
        feedback: 'Posting it spreads the harm and makes it public.',
      },
    ],
    answer: "Tell your friend it's not kind",
  },
  {
    image: '/quiz3.jpg',
    alt: 'A girl looking at a phone with a sad face',
    scenario: ["Someone you don't know sends you a rude message.", ' What should you do?'],
    choices: [
      {
        text: 'Reply with a rude message',
        feedback: 'Responding fuels the conflict and can escalate things.',
      },
      {
        text: 'Block and report them',
        feedback: 'Correct! Block and report to stop them from contacting you.',
        right: true,
      },
      {
        text: 'Post the message to embarrass them',
        feedback: 'Posting back keeps the negativity going.',
      },
      {
        text: 'Ignore and delete it',
        feedback: 'Ignoring helps you avoid engaging but reporting is better.',
      },
    ],
    answer: 'Block and report them',
  },
];
