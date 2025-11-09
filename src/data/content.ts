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
    difficulty: 'easy',
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
    difficulty: 'easy',
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
    difficulty: 'hard',
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
  {
    id: 'helpful-ant',
    title: "The Helpful Ant",
    text: `A tiny ant was walking by a pond when she heard a cry for help. A dove had fallen into the water and could not fly away! The ant saw a leaf nearby. She pushed the leaf into the water. The dove climbed onto the leaf and floated to safety. "Thank you, little ant!" said the dove.

A few days later, a hunter came to the forest. He wanted to catch the dove. The ant saw the hunter and knew she had to help her friend. She climbed up the hunter's leg and bit him. "Ouch!" yelled the hunter. The dove heard the noise and flew away to safety. The ant and dove smiled at each other. True friends help each other!`,
    wordCount: 135,
    category: 'fiction',
    difficulty: 'easy',
    questions: [
      {
        question: "Who fell into the water?",
        options: ["The ant", "The dove", "The hunter"],
        correctIndex: 1,
      },
      {
        question: "How did the ant help the dove escape from the hunter?",
        options: ["She pushed him", "She bit him", "She yelled at him"],
        correctIndex: 1,
      },
      {
        question: "What lesson does this story teach?",
        options: ["Friends help each other", "Birds can't swim", "Ants are strong"],
        correctIndex: 0,
      },
    ]
  },
  {
    id: 'butterflies',
    title: "Butterflies",
    text: `Butterflies are beautiful insects with colorful wings. But they don't start out that way! A butterfly's life has four stages.

First, a mother butterfly lays tiny eggs on a leaf. After a few days, a caterpillar hatches from each egg. The caterpillar is very hungry! It eats leaves all day long and grows bigger and bigger.

Next, the caterpillar makes a hard shell around itself called a chrysalis. Inside the chrysalis, something amazing happens. The caterpillar changes into a butterfly! This takes about two weeks.

Finally, the chrysalis opens and a butterfly comes out. Its wings are wet at first, but they dry in the sun. Soon the butterfly can fly away to find flowers and start the cycle again!`,
    wordCount: 140,
    category: 'non-fiction',
    difficulty: 'easy',
    questions: [
      {
        question: "What comes out of a butterfly egg?",
        options: ["A butterfly", "A caterpillar", "A chrysalis"],
        correctIndex: 1,
      },
      {
        question: "What does a caterpillar eat?",
        options: ["Flowers", "Other bugs", "Leaves"],
        correctIndex: 2,
      },
      {
        question: "How long does it take to change inside the chrysalis?",
        options: ["Two days", "Two weeks", "Two months"],
        correctIndex: 1,
      },
    ]
  },
  {
    id: 'curious-cloud',
    title: "The Curious Cloud",
    text: `Carlo was a small white cloud who lived in the sky. Every day, he watched the other clouds drift across the sky, but he wanted to see what was below. One morning, Carlo decided to float down closer to Earth.

First, he floated over a sparkling ocean. He saw dolphins jumping and splashing in the waves. "How wonderful!" thought Carlo. He drifted lower and crossed over a green forest. Birds were singing in the tall trees, and a deer was drinking from a stream.

Next, Carlo floated over a busy city. He saw children playing in parks, cars driving on streets, and people walking with colorful umbrellas. Carlo realized the world was full of amazing things!

As the sun began to set, Carlo floated back up to join his cloud friends. "Where have you been?" they asked. Carlo smiled and said, "I've been exploring! You should all come with me tomorrow!" The clouds agreed, excited to see the world below.`,
    wordCount: 175,
    category: 'fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "What did Carlo see in the ocean?",
        options: ["Fish swimming", "Dolphins jumping", "Boats sailing"],
        correctIndex: 1,
      },
      {
        question: "Why did Carlo float down to Earth?",
        options: ["He was curious about what was below", "He was lost", "The wind pushed him"],
        correctIndex: 0,
      },
      {
        question: "How do you think Carlo felt about his adventure?",
        options: ["Scared and worried", "Excited and happy", "Bored and tired"],
        correctIndex: 1,
      },
    ]
  },
  {
    id: 'how-rainbows-form',
    title: "How Rainbows Form",
    text: `Have you ever seen a rainbow after a rainstorm? Rainbows are one of nature's most beautiful sights! They happen when sunlight and water work together.

Sunlight looks white, but it's actually made of many colors mixed together. These colors are red, orange, yellow, green, blue, indigo, and violet. When sunlight shines through raindrops in the air, something magical happens.

The water droplets act like tiny prisms. They bend the sunlight and split it into all its different colors. Each color bends a slightly different amount, which is why we see them separated in a rainbow's arc.

You can only see a rainbow when the sun is behind you and rain is in front of you. That's why rainbows often appear when a storm is ending and the sun comes back out. Next time it rains, look for a rainbow! Try to spot all seven colors in the sky.`,
    wordCount: 168,
    category: 'non-fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "How many colors are in a rainbow?",
        options: ["Five", "Seven", "Ten"],
        correctIndex: 1,
      },
      {
        question: "What splits sunlight into different colors?",
        options: ["Clouds", "Water droplets", "The moon"],
        correctIndex: 1,
      },
      {
        question: "When can you see a rainbow?",
        options: ["During a thunderstorm", "When the sun is behind you and rain is ahead", "Only at night"],
        correctIndex: 1,
      },
    ]
  },
  {
    id: 'brave-little-mouse',
    title: "The Brave Little Mouse",
    text: `Mia was the smallest mouse in her family, but she had the biggest heart. One day, her little brother Max got stuck in a hole in the garden wall. He was too scared to move!

"Help!" squeaked Max. Mia ran to find help, but all the bigger mice were too large to fit through the hole. She realized she would have to save Max herself, even though she was frightened.

Mia took a deep breath and squeezed through the narrow opening. The hole was dark and scary, but she could hear Max crying nearby. "I'm coming!" she called out bravely.

Following Max's voice, Mia found him stuck between two stones. She pushed and pushed until the stones moved just enough. "You can do it!" she encouraged. Together, they squeezed through and made it back home.

"You saved me!" said Max, hugging his sister. Their mother smiled proudly. "Mia, you were very brave today. Being small doesn't mean you can't do big things!" From that day on, Mia knew that courage comes in all sizes.`,
    wordCount: 182,
    category: 'fiction',
    difficulty: 'medium',
    questions: [
      {
        question: "Why couldn't the bigger mice help Max?",
        options: ["They were scared", "They were too large to fit through the hole", "They didn't care"],
        correctIndex: 1,
      },
      {
        question: "What did Mia have to do to save Max?",
        options: ["Call for adult help", "Push stones to free him", "Dig a new tunnel"],
        correctIndex: 1,
      },
      {
        question: "What did Mia learn from this experience?",
        options: ["Small creatures can be brave and helpful", "Holes are dangerous", "Brothers are annoying"],
        correctIndex: 0,
      },
    ]
  },
  {
    id: 'amazing-octopus',
    title: "The Amazing Octopus",
    text: `The octopus is one of the ocean's most fascinating creatures. This intelligent animal has eight long arms covered with suction cups. Each arm can move independently, which means the octopus can do eight different things at once!

But that's not all that makes octopuses special. They have three hearts! Two hearts pump blood to their gills to get oxygen, and the third heart pumps blood to the rest of their body. Octopuses also have blue blood instead of red because it contains copper instead of iron.

Perhaps the most amazing ability of an octopus is camouflage. They can change the color and texture of their skin in less than a second! This helps them hide from predators and sneak up on prey. Special cells in their skin called chromatophores expand and contract to create different colors and patterns.

When threatened, an octopus has another trick. It can squirt dark ink into the water, creating a smoky cloud. This confuses predators and gives the octopus time to escape. Some octopuses can even squeeze through tiny spaces because they have no bones! Scientists continue to study these remarkable animals to understand their incredible abilities.`,
    wordCount: 205,
    category: 'non-fiction',
    difficulty: 'hard',
    questions: [
      {
        question: "How many hearts does an octopus have?",
        options: ["One", "Two", "Three"],
        correctIndex: 2,
      },
      {
        question: "What are chromatophores?",
        options: ["The octopus's arms", "Special cells that change color", "The octopus's three hearts"],
        correctIndex: 1,
      },
      {
        question: "Which of these is NOT mentioned as an octopus ability?",
        options: ["Changing color", "Squirting ink", "Flying"],
        correctIndex: 2,
      },
      {
        question: "Why can octopuses squeeze through tiny spaces?",
        options: ["They are very small", "They have no bones", "They are very thin"],
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
