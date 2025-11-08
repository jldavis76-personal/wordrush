import { ComprehensionQuestion, ShopItem } from '../types';

// Reading passage for daughter's Reading Race
export const READING_PASSAGE = {
  title: "The Tortoise and the Hare",
  text: `Once upon a time, there was a hare who was very proud of how fast he could run. He would often tease the tortoise for being so slow.

One day, the tortoise got tired of the hare's boasting. "Let's have a race," said the tortoise. The hare laughed and agreed, thinking it would be an easy win.

When the race began, the hare zoomed ahead quickly. He was so far ahead that he decided to take a nap under a tree. "I have plenty of time," he thought.

Meanwhile, the tortoise kept moving slowly but steadily. He never stopped. He passed the sleeping hare without making a sound.

When the hare woke up, he raced to the finish line as fast as he could. But it was too late! The tortoise had already won the race.

The hare learned an important lesson that day: Slow and steady wins the race.`,
  wordCount: 150,
};

export const COMPREHENSION_QUESTIONS: ComprehensionQuestion[] = [
  {
    question: "Who challenged the Tortoise to a race?",
    options: ["The Tortoise", "The Hare", "The Fox"],
    correctIndex: 1,
  },
  {
    question: "Who won the race?",
    options: ["The Hare", "The Fox", "The Tortoise"],
    correctIndex: 2,
  },
];

// Sight words for son's Word Catcher game
export const SIGHT_WORDS = ['I', 'a', 'am', 'the', 'see', 'can', 'go', 'we', 'my', 'you'];

// Avatar shop items
export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'hat',
    name: 'Cool Hat',
    emoji: '🎩',
    cost: 10,
  },
  {
    id: 'glasses',
    name: 'Awesome Glasses',
    emoji: '🕶️',
    cost: 20,
  },
  {
    id: 'cape',
    name: 'Super Cape',
    emoji: '🦸',
    cost: 30,
  },
];
