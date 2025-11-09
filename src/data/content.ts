import { ReadingPassage, ShopItem } from '../types';

// Reading passages for daughter's Reading Race
export const READING_PASSAGES: ReadingPassage[] = [
  {
    id: 'tortoise-hare',
    title: "The Tortoise and the Hare",
    text: `Once upon a time, there was a hare who was very proud of how fast he could run. He would often tease the tortoise for being so slow.

One day, the tortoise got tired of the hare's boasting. "Let's have a race," said the tortoise. The hare laughed and agreed, thinking it would be an easy win.

When the race began, the hare zoomed ahead quickly. He was so far ahead that he decided to take a nap under a tree. "I have plenty of time," he thought.

Meanwhile, the tortoise kept moving slowly but steadily. He never stopped. He passed the sleeping hare without making a sound.

When the hare woke up, he raced to the finish line as fast as he could. But it was too late! The tortoise had already won the race.

The hare learned an important lesson that day: Slow and steady wins the race.`,
    wordCount: 150,
    category: 'fiction',
    difficulty: 'medium',
    questions: [
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
    ]
  },
  {
    id: 'lost-puppy',
    title: "The Lost Puppy",
    text: `Maya was playing in the park when she heard a small whimper. Behind a bench, she found a tiny brown puppy with big sad eyes. The puppy had a red collar, but no name tag.

"Are you lost?" Maya asked gently. The puppy wagged its tail and licked her hand. Maya looked around the park, but she didn't see anyone searching for a puppy.

Maya decided to help. She asked other people in the park if they knew who the puppy belonged to. Finally, an old woman said she had seen a family looking for their pet near the playground.

Maya carried the puppy to the playground. A young boy was there with his mom, calling "Biscuit! Biscuit!" When the boy saw his puppy, his face lit up with joy.

"Thank you so much for finding Biscuit!" said the boy's mom. The boy gave Maya a big hug. Maya felt happy that she could help reunite Biscuit with his family.`,
    wordCount: 165,
    category: 'fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "Where did Maya find the puppy?",
        options: ["Behind a bench in the park", "At the playground", "In her backyard"],
        correctIndex: 0,
      },
      {
        question: "What did Maya do to help the puppy?",
        options: ["She took it home", "She asked people in the park", "She called the police"],
        correctIndex: 1,
      },
      {
        question: "What was the puppy's name?",
        options: ["Maya", "Buddy", "Biscuit"],
        correctIndex: 2,
      },
    ]
  },
  {
    id: 'bees-honey',
    title: "How Bees Make Honey",
    text: `Bees are amazing insects that make sweet, delicious honey. But how do they do it?

First, bees fly from flower to flower collecting nectar. Nectar is a sweet liquid found inside flowers. Bees have a special stomach just for storing nectar. One bee might visit hundreds of flowers in a single day!

When a bee's stomach is full of nectar, it flies back to the hive. Inside the hive, the bee passes the nectar to other worker bees. These bees chew the nectar and add special enzymes from their bodies. This starts to turn the nectar into honey.

The bees then spread the honey into honeycomb cells, which are small hexagon-shaped spaces made of wax. They fan their wings to help water evaporate from the honey, making it thick and sweet.

Finally, when the honey is ready, bees seal the honeycomb cells with wax. The honey can be stored for months and eaten when the bees need food. Thanks to bees, we can enjoy honey too!`,
    wordCount: 170,
    category: 'non-fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "What do bees collect from flowers?",
        options: ["Pollen", "Nectar", "Water"],
        correctIndex: 1,
      },
      {
        question: "Where do bees store honey?",
        options: ["In trees", "In honeycomb cells", "In their stomachs"],
        correctIndex: 1,
      },
      {
        question: "Why do bees fan their wings over the honey?",
        options: ["To cool it down", "To help water evaporate", "To attract other bees"],
        correctIndex: 1,
      },
    ]
  },
  {
    id: 'magic-paintbrush',
    title: "The Magic Paintbrush",
    text: `Lin loved to draw and paint. On her eighth birthday, her grandmother gave her a special present: a beautiful paintbrush with a golden handle.

"This is no ordinary paintbrush," said Grandmother with a mysterious smile. "Paint with your heart, and you'll see something wonderful."

That afternoon, Lin decided to test the paintbrush. She painted a bright yellow butterfly on her paper. Suddenly, the butterfly lifted off the page and fluttered around her room! Lin gasped in amazement.

Excited, Lin painted a rainbow. It appeared above her bed, glowing with real colors. She painted flowers, and they filled her room with sweet perfume. She painted a small bird, and it sang the prettiest song she had ever heard.

Lin realized the paintbrush was truly magical. But what should she paint next? She thought carefully. Lin decided to paint a big smile on her grandmother's face, because Grandmother had given her such a wonderful gift. That painting was her favorite of all.`,
    wordCount: 165,
    category: 'fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "Who gave Lin the paintbrush?",
        options: ["Her mother", "Her grandmother", "Her teacher"],
        correctIndex: 1,
      },
      {
        question: "What was the first thing Lin painted that came to life?",
        options: ["A rainbow", "A butterfly", "A bird"],
        correctIndex: 1,
      },
      {
        question: "What did Lin decide to paint for her grandmother?",
        options: ["Flowers", "A smile", "A butterfly"],
        correctIndex: 1,
      },
    ]
  },
  {
    id: 'penguins-antarctica',
    title: "Penguins of Antarctica",
    text: `Penguins are special birds that live in some of the coldest places on Earth. Many penguins make their home in Antarctica, where temperatures can drop to minus 40 degrees!

Unlike most birds, penguins cannot fly through the air. Instead, they are amazing swimmers. Penguins use their wings like flippers to zoom through the ocean. They can swim up to 15 miles per hour when chasing fish!

Penguins have several ways to stay warm in the freezing cold. They have a thick layer of fat under their skin called blubber. They also have waterproof feathers that trap warm air close to their bodies. When it gets really cold, penguins huddle together in big groups to share body heat.

Emperor penguins are the largest penguins in Antarctica. The males are very special dads. After the mother lays an egg, the father keeps it warm on his feet for two whole months without eating! He covers the egg with a special flap of skin to protect it from the cold.

Penguins are truly remarkable animals that have adapted perfectly to life in Antarctica.`,
    wordCount: 180,
    category: 'non-fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "Can penguins fly in the air?",
        options: ["Yes, they can fly", "No, but they can swim", "Only baby penguins can fly"],
        correctIndex: 1,
      },
      {
        question: "How do penguins stay warm?",
        options: ["They migrate to warmer places", "They have blubber and waterproof feathers", "They build warm nests"],
        correctIndex: 1,
      },
      {
        question: "What do male Emperor penguins do?",
        options: ["Hunt for fish", "Keep the egg warm on their feet", "Build the nest"],
        correctIndex: 1,
      },
    ]
  },
  {
    id: 'friendship-garden',
    title: "The Friendship Garden",
    text: `Alex, Maya, and Tom were best friends who lived on the same street. One spring day, they had a wonderful idea: they would plant a garden together!

Each friend wanted to plant something different. Alex loved bright colors, so he planted red tomatoes and orange carrots. Maya adored sweet things, so she planted strawberries and snap peas. Tom was fascinated by how tall things could grow, so he planted sunflowers and corn.

Every day after school, the three friends worked in their garden. They pulled weeds, watered the plants, and watched everything grow. Sometimes they disagreed about what to do, but they always worked it out by talking and listening to each other.

As summer arrived, their garden became beautiful and full of food. The tomatoes turned bright red. The strawberries grew sweet and juicy. The sunflowers stretched toward the sky, taller than all three friends standing on each other's shoulders!

The friends picked vegetables and fruits from their garden and shared them with their families. They learned that when friends work together, they can create something much more wonderful than they could make alone. Their friendship garden was a success!`,
    wordCount: 190,
    category: 'fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "How many friends worked on the garden?",
        options: ["Two", "Three", "Four"],
        correctIndex: 1,
      },
      {
        question: "What did Maya plant in the garden?",
        options: ["Sunflowers and corn", "Strawberries and snap peas", "Tomatoes and carrots"],
        correctIndex: 1,
      },
      {
        question: "What lesson did the friends learn?",
        options: ["Gardens are hard to grow", "Working together creates something wonderful", "Sunflowers grow very tall"],
        correctIndex: 1,
      },
    ]
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
