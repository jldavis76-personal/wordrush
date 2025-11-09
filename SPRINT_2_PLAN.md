# Sprint 2: Content Expansion
**Duration:** Week 2 of v1.5 Development
**Sprint Goal:** Expand content library to support 2+ weeks of daily engagement
**Total Estimated Hours:** 16 hours

---

## Sprint Objectives

By the end of Sprint 2, WordRush will:
1. Have 10-15 reading passages for variety and replayability
2. Have 52 sight words organized in progressive difficulty sets
3. Support passage selection (random or by choice)
4. Include content validated by target age groups
5. Provide engaging content for 2+ weeks of daily use

---

## Sprint Backlog

### TASK 1: Complete Reading Passage Library
**Priority:** 🔴 Critical
**Estimated Time:** 6 hours
**Assignee:** Content Creator / Developer

#### User Story
```
As a child user
I want many different stories to read
So that I stay engaged and excited about reading each day
```

#### Current State
- **6 reading passages** exist (from Sprint 1)
  - 4 fiction: Tortoise/Hare, Lost Puppy, Magic Paintbrush, Friendship Garden
  - 2 non-fiction: Bees/Honey, Penguins
- All passages are "medium" difficulty
- Random selection works, but limited variety
- Need 4-9 more passages to hit 10-15 target

#### Acceptance Criteria
- [ ] 4-9 new reading passages created (10-15 total)
- [ ] Mix maintains balance: 60% fiction, 40% non-fiction
- [ ] Passages span difficulty levels: 30% easy, 50% medium, 20% hard
- [ ] Each passage is 150-200 words (age-appropriate)
- [ ] Each passage has 2-3 comprehension questions
- [ ] Questions test understanding with varied cognitive levels
- [ ] Content reviewed using CONTENT_GUIDELINES.md standards
- [ ] All passages stored in content.ts with proper metadata
- [ ] No duplicate themes or repetitive content

#### Technical Requirements

**1. Content Distribution Strategy**

Target: **12 total passages** (balanced distribution)

**Fiction (7 passages total):**
- Classic tales/fables: 3 passages
- Adventure stories: 2 passages
- Friendship/feelings: 2 passages

**Non-Fiction (5 passages total):**
- Animals: 2 passages
- Science/Nature: 2 passages
- How Things Work: 1 passage

**Difficulty Distribution:**
- Easy (4 passages): 120-150 words, 2 questions, Grade 2 level
- Medium (6 passages): 150-180 words, 3 questions, Grade 2-3 level
- Hard (2 passages): 180-220 words, 3-4 questions, Grade 3-4 level

**2. New Passage Requirements**

Each passage must include in data structure:
```typescript
{
  id: string;              // Unique identifier (kebab-case)
  title: string;           // Engaging title
  text: string;            // Story content
  wordCount: number;       // Actual word count
  category: 'fiction' | 'non-fiction';
  difficulty: 'easy' | 'medium' | 'hard';
  questions: ComprehensionQuestion[];
}
```

**3. Create 6 New Passages**

**NEW Passage 7 - Easy Fiction: "The Helpful Ant" (135 words)**
```
Category: Fiction (Fable)
Difficulty: Easy
Theme: Helping others, kindness
Reading Level: Grade 2

Story: A tiny ant was walking by a pond when she heard a cry for help.
A dove had fallen into the water and could not fly away! The ant saw a
leaf nearby. She pushed the leaf into the water. The dove climbed onto
the leaf and floated to safety. "Thank you, little ant!" said the dove.

A few days later, a hunter came to the forest. He wanted to catch the dove.
The ant saw the hunter and knew she had to help her friend. She climbed up
the hunter's leg and bit him. "Ouch!" yelled the hunter. The dove heard the
noise and flew away to safety. The ant and dove smiled at each other. True
friends help each other!

Questions:
1. Who fell into the water?
   - The ant
   - The dove ✓
   - The hunter

2. How did the ant help the dove escape from the hunter?
   - She pushed him
   - She bit him ✓
   - She yelled at him

3. What lesson does this story teach?
   - Friends help each other ✓
   - Birds can't swim
   - Ants are strong
```

**NEW Passage 8 - Easy Non-Fiction: "Butterflies" (140 words)**
```
Category: Non-Fiction (Nature)
Difficulty: Easy
Theme: Life cycles, insects
Reading Level: Grade 2

Story: Butterflies are beautiful insects with colorful wings. But they
don't start out that way! A butterfly's life has four stages.

First, a mother butterfly lays tiny eggs on a leaf. After a few days,
a caterpillar hatches from each egg. The caterpillar is very hungry!
It eats leaves all day long and grows bigger and bigger.

Next, the caterpillar makes a hard shell around itself called a chrysalis.
Inside the chrysalis, something amazing happens. The caterpillar changes
into a butterfly! This takes about two weeks.

Finally, the chrysalis opens and a butterfly comes out. Its wings are wet
at first, but they dry in the sun. Soon the butterfly can fly away to find
flowers and start the cycle again!

Questions:
1. What comes out of a butterfly egg?
   - A butterfly
   - A caterpillar ✓
   - A chrysalis

2. What does a caterpillar eat?
   - Flowers
   - Other bugs
   - Leaves ✓

3. How long does it take to change inside the chrysalis?
   - Two days
   - Two weeks ✓
   - Two months
```

**NEW Passage 9 - Medium Fiction: "The Curious Cloud" (175 words)**
```
Category: Fiction (Adventure)
Difficulty: Medium
Theme: Curiosity, exploration
Reading Level: Grade 3

Story: Carlo was a small white cloud who lived in the sky. Every day, he
watched the other clouds drift across the sky, but he wanted to see what
was below. One morning, Carlo decided to float down closer to Earth.

First, he floated over a sparkling ocean. He saw dolphins jumping and
splashing in the waves. "How wonderful!" thought Carlo. He drifted lower
and crossed over a green forest. Birds were singing in the tall trees, and
a deer was drinking from a stream.

Next, Carlo floated over a busy city. He saw children playing in parks,
cars driving on streets, and people walking with colorful umbrellas. Carlo
realized the world was full of amazing things!

As the sun began to set, Carlo floated back up to join his cloud friends.
"Where have you been?" they asked. Carlo smiled and said, "I've been
exploring! You should all come with me tomorrow!" The clouds agreed, excited
to see the world below.

Questions:
1. What did Carlo see in the ocean?
   - Fish swimming
   - Dolphins jumping ✓
   - Boats sailing

2. Why did Carlo float down to Earth?
   - He was curious about what was below ✓
   - He was lost
   - The wind pushed him

3. How do you think Carlo felt about his adventure?
   - Scared and worried
   - Excited and happy ✓
   - Bored and tired
```

**NEW Passage 10 - Medium Non-Fiction: "How Rainbows Form" (168 words)**
```
Category: Non-Fiction (Science)
Difficulty: Medium
Theme: Weather, light
Reading Level: Grade 2-3

Story: Have you ever seen a rainbow after a rainstorm? Rainbows are one
of nature's most beautiful sights! They happen when sunlight and water
work together.

Sunlight looks white, but it's actually made of many colors mixed together.
These colors are red, orange, yellow, green, blue, indigo, and violet. When
sunlight shines through raindrops in the air, something magical happens.

The water droplets act like tiny prisms. They bend the sunlight and split
it into all its different colors. Each color bends a slightly different
amount, which is why we see them separated in a rainbow's arc.

You can only see a rainbow when the sun is behind you and rain is in front
of you. That's why rainbows often appear when a storm is ending and the sun
comes back out. Next time it rains, look for a rainbow! Try to spot all seven
colors in the sky.

Questions:
1. How many colors are in a rainbow?
   - Five
   - Seven ✓
   - Ten

2. What splits sunlight into different colors?
   - Clouds
   - Water droplets ✓
   - The moon

3. When can you see a rainbow?
   - During a thunderstorm
   - When the sun is behind you and rain is ahead ✓
   - Only at night
```

**NEW Passage 11 - Medium Fiction: "The Brave Little Mouse" (182 words)**
```
Category: Fiction (Adventure)
Difficulty: Medium
Theme: Courage, problem-solving
Reading Level: Grade 3

Story: Mia was the smallest mouse in her family, but she had the biggest
heart. One day, her little brother Max got stuck in a hole in the garden
wall. He was too scared to move!

"Help!" squeaked Max. Mia ran to find help, but all the bigger mice were
too large to fit through the hole. She realized she would have to save Max
herself, even though she was frightened.

Mia took a deep breath and squeezed through the narrow opening. The hole
was dark and scary, but she could hear Max crying nearby. "I'm coming!"
she called out bravely.

Following Max's voice, Mia found him stuck between two stones. She pushed
and pushed until the stones moved just enough. "You can do it!" she
encouraged. Together, they squeezed through and made it back home.

"You saved me!" said Max, hugging his sister. Their mother smiled proudly.
"Mia, you were very brave today. Being small doesn't mean you can't do big
things!" From that day on, Mia knew that courage comes in all sizes.

Questions:
1. Why couldn't the bigger mice help Max?
   - They were scared
   - They were too large to fit through the hole ✓
   - They didn't care

2. What did Mia have to do to save Max?
   - Call for adult help
   - Push stones to free him ✓
   - Dig a new tunnel

3. What did Mia learn from this experience?
   - Small creatures can be brave and helpful ✓
   - Holes are dangerous
   - Brothers are annoying
```

**NEW Passage 12 - Hard Non-Fiction: "The Amazing Octopus" (205 words)**
```
Category: Non-Fiction (Animals)
Difficulty: Hard
Theme: Marine biology, animal adaptations
Reading Level: Grade 3-4

Story: The octopus is one of the ocean's most fascinating creatures. This
intelligent animal has eight long arms covered with suction cups. Each arm
can move independently, which means the octopus can do eight different things
at once!

But that's not all that makes octopuses special. They have three hearts! Two
hearts pump blood to their gills to get oxygen, and the third heart pumps blood
to the rest of their body. Octopuses also have blue blood instead of red because
it contains copper instead of iron.

Perhaps the most amazing ability of an octopus is camouflage. They can change
the color and texture of their skin in less than a second! This helps them hide
from predators and sneak up on prey. Special cells in their skin called
chromatophores expand and contract to create different colors and patterns.

When threatened, an octopus has another trick. It can squirt dark ink into the
water, creating a smoky cloud. This confuses predators and gives the octopus time
to escape. Some octopuses can even squeeze through tiny spaces because they have
no bones! Scientists continue to study these remarkable animals to understand their
incredible abilities.

Questions:
1. How many hearts does an octopus have?
   - One
   - Two
   - Three ✓

2. What are chromatophores?
   - The octopus's arms
   - Special cells that change color ✓
   - The octopus's three hearts

3. Which of these is NOT mentioned as an octopus ability?
   - Changing color
   - Squirting ink
   - Flying ✓

4. Why can octopuses squeeze through tiny spaces?
   - They are very small
   - They have no bones ✓
   - They are very thin
```

**4. Update content.ts**

Add new passages to the READING_PASSAGES array:
```typescript
// Add to src/data/content.ts

// Add the 6 new passage objects to READING_PASSAGES array
// Ensure each has all required fields: id, title, text, wordCount, category, difficulty, questions
```

**5. Content Quality Checklist**

For each passage, verify:
- [ ] Word count is accurate
- [ ] Reading level matches stated difficulty (use Hemingway Editor)
- [ ] No grammatical or spelling errors
- [ ] Content is age-appropriate (no scary/inappropriate themes)
- [ ] Story has clear beginning, middle, end (fiction)
- [ ] Information is accurate (non-fiction)
- [ ] Questions can be answered from text
- [ ] Correct answer is clearly indicated
- [ ] Distractors are plausible but clearly wrong

#### Testing Checklist

**Content Validation:**
- [ ] Read each passage aloud - flows naturally
- [ ] Verify word count with text editor
- [ ] Check readability score (target: Grade 2-4)
- [ ] Ensure questions are answerable without guessing
- [ ] Verify correct answers are marked properly

**Technical Testing:**
- [ ] All 12 passages appear in random rotation
- [ ] Each passage renders correctly in ReadingRace
- [ ] Questions display properly
- [ ] Answer selection works
- [ ] Correct/incorrect feedback works
- [ ] WPM calculation accurate for all passages

**User Testing:**
- [ ] Have 8-year-old read easy passage - can complete?
- [ ] Have 8-year-old read medium passage - appropriate challenge?
- [ ] Have 8-year-old read hard passage - too difficult or just right?
- [ ] Note which passages are most engaging
- [ ] Gather feedback on question clarity

#### Dependencies
- None (can start immediately)

#### Definition of Done
- ✅ 12 total reading passages available (6 new + 6 existing)
- ✅ Difficulty distribution: 4 easy, 6 medium, 2 hard
- ✅ Category distribution: 7 fiction, 5 non-fiction
- ✅ All passages meet CONTENT_GUIDELINES.md standards
- ✅ All passages tested in app
- ✅ Content validated with target age group (if possible)
- ✅ Code committed to branch

---

### TASK 2: Expand Sight Word Sets for Progressive Learning
**Priority:** 🔴 Critical
**Estimated Time:** 5 hours
**Assignee:** Content Creator / Developer

#### User Story
```
As a child learning to read
I want to practice new sight words each week
So that I can build my vocabulary progressively
```

#### Current State
- **10 sight words** in single list: 'I', 'a', 'am', 'the', 'see', 'can', 'go', 'we', 'my', 'you'
- No organization by difficulty
- No progression system
- Word Catcher picks from all 10 words randomly
- Limited replayability

#### Acceptance Criteria
- [ ] 52 total sight words added (Dolch Pre-K through Grade 1)
- [ ] Words organized into 5 progressive word sets
- [ ] Each set has 10-12 words of similar difficulty
- [ ] Word sets align with educational standards (Dolch list)
- [ ] Data structure supports word set selection
- [ ] Word set progression logic implemented
- [ ] UI shows current word set (e.g., "Word Set 1 of 5")
- [ ] Ability to select specific word set or rotate sequentially

#### Technical Requirements

**1. Sight Word Organization Strategy**

Use Dolch Sight Words (standard educational resource):

**Set 1 - Pre-K (10 words)** - CURRENT
- a, I, the, see, can, go, we, my, you, and

**Set 2 - Kindergarten Easy (12 words)** - NEW
- in, is, it, at, he, she, to, me, be, for, not, are

**Set 3 - Kindergarten Advanced (10 words)** - NEW
- up, down, come, here, look, this, that, with, have, they

**Set 4 - Grade 1 Easy (10 words)** - NEW
- like, play, good, new, want, help, find, run, said, away

**Set 5 - Grade 1 Advanced (10 words)** - NEW
- came, make, day, get, take, give, going, where, when, what

**Total: 52 words across 5 sets**

**2. Update Data Structure**

Modify `src/data/content.ts`:

```typescript
export interface SightWordSet {
  id: number;
  name: string;
  level: string;
  words: string[];
  description: string;
}

export const SIGHT_WORD_SETS: SightWordSet[] = [
  {
    id: 1,
    name: "Word Set 1",
    level: "Pre-K",
    words: ['a', 'I', 'the', 'see', 'can', 'go', 'we', 'my', 'you', 'and'],
    description: "Starting words - the very basics!"
  },
  {
    id: 2,
    name: "Word Set 2",
    level: "Kindergarten Easy",
    words: ['in', 'is', 'it', 'at', 'he', 'she', 'to', 'me', 'be', 'for', 'not', 'are'],
    description: "Building your word power!"
  },
  {
    id: 3,
    name: "Word Set 3",
    level: "Kindergarten Advanced",
    words: ['up', 'down', 'come', 'here', 'look', 'this', 'that', 'with', 'have', 'they'],
    description: "You're getting good at this!"
  },
  {
    id: 4,
    name: "Word Set 4",
    level: "Grade 1 Easy",
    words: ['like', 'play', 'good', 'new', 'want', 'help', 'find', 'run', 'said', 'away'],
    description: "Advanced reader mode!"
  },
  {
    id: 5,
    name: "Word Set 5",
    level: "Grade 1 Advanced",
    words: ['came', 'make', 'day', 'get', 'take', 'give', 'going', 'where', 'when', 'what'],
    description: "Master level - you're amazing!"
  }
];

// For backward compatibility, keep SIGHT_WORDS pointing to Set 1
export const SIGHT_WORDS = SIGHT_WORD_SETS[0].words;
```

**3. Update WordCatcher Component**

Modify `src/screens/WordCatcher.tsx`:

```typescript
// Add to imports
import { SIGHT_WORD_SETS, SightWordSet } from '../data/content';

// Add to component props
interface WordCatcherProps {
  currentCoins: number;
  onComplete: (coinsEarned: number, score: number, totalWords: number) => void;
  onBack: () => void;
  // NEW: Allow passing current word set
  wordSetId?: number; // Defaults to 1 if not provided
}

// Add state for current word set
const [currentWordSet, setCurrentWordSet] = useState<SightWordSet>(() => {
  const setId = wordSetId || 1;
  return SIGHT_WORD_SETS.find(set => set.id === setId) || SIGHT_WORD_SETS[0];
});

// Use currentWordSet.words instead of SIGHT_WORDS throughout
const [currentWordIndex, setCurrentWordIndex] = useState(0);
const currentWord = currentWordSet.words[currentWordIndex];

// Update completion handler to pass word set info
const handleAnswer = (selectedWord: string) => {
  const correct = selectedWord === currentWordSet.words[currentWordIndex];

  if (correct) {
    setCorrectCount((prev) => prev + 1);
    // ... existing logic
  }

  // Check if this was the last word
  if (currentWordIndex === currentWordSet.words.length - 1) {
    // Activity complete
    const finalScore = correctCount + (correct ? 1 : 0);
    const earned = finalScore * 3;
    onComplete(earned, finalScore, currentWordSet.words.length);
  } else {
    setCurrentWordIndex((prev) => prev + 1);
  }
};

// Add UI to show current word set
// In JSX, add badge showing word set:
<div className="text-center mb-4">
  <span className="inline-block px-4 py-2 bg-primary-light rounded-full text-sm font-medium">
    {currentWordSet.name} - {currentWordSet.level}
  </span>
  <p className="text-xs text-text-secondary mt-1">
    {currentWordSet.description}
  </p>
</div>

// Update progress indicator to use currentWordSet.words.length
<div className="text-sm text-text-secondary mb-4">
  Word {currentWordIndex + 1} of {currentWordSet.words.length}
</div>
```

**4. Add Word Set Selection to ActivitySelection**

Modify `src/screens/ActivitySelection.tsx`:

```typescript
// Add state for word set selection
const [selectedWordSet, setSelectedWordSet] = useState(1);

// Update Word Catcher button to show word set selector
<div className="mb-4">
  <label className="block text-sm font-medium text-text-secondary mb-2">
    Choose Word Set:
  </label>
  <div className="flex gap-2 flex-wrap">
    {SIGHT_WORD_SETS.map(set => (
      <button
        key={set.id}
        onClick={() => setSelectedWordSet(set.id)}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          selectedWordSet === set.id
            ? 'bg-primary text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Set {set.id}
      </button>
    ))}
  </div>
  <p className="text-xs text-text-secondary mt-2">
    {SIGHT_WORD_SETS.find(s => s.id === selectedWordSet)?.description}
  </p>
</div>

// Pass selectedWordSet to WordCatcher
{currentScreen === 'word-catcher' && currentProfile && (
  <WordCatcher
    currentCoins={currentProfile.coins}
    onComplete={handleWordComplete}
    onBack={handleBackToMenu}
    wordSetId={selectedWordSet}
  />
)}
```

**5. Persistence for Word Set Progress**

Add to Profile type in `src/types.ts`:

```typescript
export interface Profile {
  id: ProfileId;
  name: string;
  age: number;
  coins: number;
  unlockedItems: UnlockableItem[];
  activityHistory: ActivityResult[];
  currentWordSet?: number; // NEW: Track which word set they're on
  completedWordSets?: number[]; // NEW: Track which sets they've mastered
}
```

Update App.tsx to initialize new fields:
```typescript
currentWordSet: 1,
completedWordSets: [],
```

**6. Word Set Completion Tracking**

Add logic to mark word set as "mastered" when score is high:

```typescript
// In App.tsx handleWordComplete
const handleWordComplete = (coinsEarned: number, score: number, totalWords: number) => {
  if (!currentProfileId) return;

  const result: WordActivityResult = {
    timestamp: new Date(),
    coinsEarned,
    activityType: 'words',
    score,
    totalWords,
  };

  // Check if they got 80%+ correct (mastery)
  const masteryThreshold = 0.8;
  const percentCorrect = score / totalWords;

  setProfiles((prev) => {
    const profile = prev[currentProfileId];
    const currentSet = profile.currentWordSet || 1;
    const completed = profile.completedWordSets || [];

    // If mastered and not already in completed list
    const newCompleted = percentCorrect >= masteryThreshold && !completed.includes(currentSet)
      ? [...completed, currentSet]
      : completed;

    // Auto-advance to next set if mastered
    const nextSet = percentCorrect >= masteryThreshold && currentSet < 5
      ? currentSet + 1
      : currentSet;

    return {
      ...prev,
      [currentProfileId]: {
        ...profile,
        coins: profile.coins + coinsEarned,
        activityHistory: [...profile.activityHistory, result],
        currentWordSet: nextSet,
        completedWordSets: newCompleted,
      },
    };
  });
};
```

#### Testing Checklist

**Data Validation:**
- [ ] All 52 words are correct spellings
- [ ] No duplicate words across sets
- [ ] Words align with Dolch list standards
- [ ] Sets progress from easy to hard

**Technical Testing:**
- [ ] All 5 word sets selectable
- [ ] Word set selection persists in profile
- [ ] Each set displays correct words
- [ ] Progress indicator shows correct count
- [ ] Completion tracking works (80% mastery)
- [ ] Auto-advance to next set works
- [ ] Completed sets badge/indicator shows

**User Testing:**
- [ ] Set 1 appropriate for 5-year-old
- [ ] Set 2-3 show clear progression
- [ ] Set 4-5 challenging but achievable
- [ ] Word set descriptions are encouraging
- [ ] UI is clear about which set is active

#### Implementation Notes

**Educational Progression:**
- Sets 1-2: High-frequency words (appear most in children's books)
- Sets 3-4: Action words and descriptors
- Set 5: Question words and complex terms

**Gamification Ideas (Optional):**
- Show badges/stars for completed sets
- Unlock new avatar items for completing sets
- Show total vocabulary count (e.g., "You know 34 sight words!")

#### Dependencies
- None (can work in parallel with Task 1)

#### Definition of Done
- ✅ 52 sight words organized in 5 sets
- ✅ Word set selection UI implemented
- ✅ Progress tracking for word sets
- ✅ Auto-advancement on mastery
- ✅ Profile persistence includes word set data
- ✅ All sets tested with target age group
- ✅ Code committed to branch

---

### TASK 3: Add Passage Selection & Management UI
**Priority:** 🟡 High
**Estimated Time:** 3 hours
**Assignee:** Developer

#### User Story
```
As a child user
I want to choose which story to read
So that I can pick topics that interest me
```

#### Current State
- Passages selected randomly only
- No user choice in content
- No way to replay favorite passages
- No indication of which passages completed
- Can't filter by difficulty or category

#### Acceptance Criteria
- [ ] Passage selection screen before starting Reading Race
- [ ] Shows all available passages with metadata
- [ ] Displays title, category, difficulty, word count
- [ ] Visual indicators for completed passages
- [ ] Filter by difficulty (easy/medium/hard)
- [ ] Filter by category (fiction/non-fiction)
- [ ] "Random" option still available
- [ ] Favorite passages can be bookmarked
- [ ] Clean, kid-friendly UI design

#### Technical Requirements

**1. Create PassageSelector Component**

Create new file `src/components/PassageSelector.tsx`:

```typescript
import React, { useState } from 'react';
import { ReadingPassage } from '../data/content';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

interface PassageSelectorProps {
  passages: ReadingPassage[];
  completedPassageIds: string[];
  onSelect: (passage: ReadingPassage) => void;
  onRandom: () => void;
  onBack: () => void;
}

export const PassageSelector: React.FC<PassageSelectorProps> = ({
  passages,
  completedPassageIds,
  onSelect,
  onRandom,
  onBack,
}) => {
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  // Filter passages based on selections
  const filteredPassages = passages.filter(passage => {
    if (difficultyFilter && passage.difficulty !== difficultyFilter) return false;
    if (categoryFilter && passage.category !== categoryFilter) return false;
    return true;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Card className="max-w-4xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2">Choose Your Story</h1>
          <p className="text-text-secondary">Pick a story to read, or let us surprise you!</p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6 flex-wrap justify-center">
          {/* Difficulty Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Difficulty:</label>
            <div className="flex gap-2">
              <Button
                variant={difficultyFilter === null ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter(null)}
              >
                All
              </Button>
              <Button
                variant={difficultyFilter === 'easy' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('easy')}
              >
                Easy
              </Button>
              <Button
                variant={difficultyFilter === 'medium' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('medium')}
              >
                Medium
              </Button>
              <Button
                variant={difficultyFilter === 'hard' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setDifficultyFilter('hard')}
              >
                Hard
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Type:</label>
            <div className="flex gap-2">
              <Button
                variant={categoryFilter === null ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter(null)}
              >
                All
              </Button>
              <Button
                variant={categoryFilter === 'fiction' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter('fiction')}
              >
                Fiction
              </Button>
              <Button
                variant={categoryFilter === 'non-fiction' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCategoryFilter('non-fiction')}
              >
                Non-Fiction
              </Button>
            </div>
          </div>
        </div>

        {/* Random Option */}
        <div className="mb-6">
          <Button
            variant="secondary"
            size="lg"
            onClick={onRandom}
            className="w-full"
          >
            🎲 Surprise Me! (Random Story)
          </Button>
        </div>

        {/* Passage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredPassages.map(passage => {
            const isCompleted = completedPassageIds.includes(passage.id);

            return (
              <button
                key={passage.id}
                onClick={() => onSelect(passage)}
                className="text-left p-4 border-2 rounded-lg hover:border-primary hover:bg-primary-light transition-all relative"
              >
                {isCompleted && (
                  <div className="absolute top-2 right-2 text-2xl">✅</div>
                )}

                <h3 className="font-bold text-lg mb-2">{passage.title}</h3>

                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(passage.difficulty)}`}>
                    {passage.difficulty}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600 font-medium">
                    {passage.category}
                  </span>
                </div>

                <p className="text-sm text-text-secondary">
                  {passage.wordCount} words • {passage.questions.length} questions
                </p>
              </button>
            );
          })}
        </div>

        {filteredPassages.length === 0 && (
          <p className="text-center text-text-secondary py-8">
            No stories match your filters. Try different options!
          </p>
        )}

        {/* Back Button */}
        <div className="mt-6">
          <Button variant="outline" onClick={onBack} className="w-full">
            ← Back to Menu
          </Button>
        </div>
      </Card>
    </div>
  );
};
```

**2. Update App.tsx to Use PassageSelector**

```typescript
// Add new screen state
type Screen = 'profile-selection' | 'activity-selection' | 'passage-selection' | 'reading-race' | 'word-catcher' | 'avatar-shop';

// Add state for selected passage
const [selectedPassage, setSelectedPassage] = useState<ReadingPassage | null>(null);

// Update navigation from activity selection
const handleStartReadingRace = () => {
  setCurrentScreen('passage-selection');
};

// Handle passage selection
const handlePassageSelect = (passage: ReadingPassage) => {
  setSelectedPassage(passage);
  setCurrentScreen('reading-race');
};

const handleRandomPassage = () => {
  const randomIndex = Math.floor(Math.random() * READING_PASSAGES.length);
  setSelectedPassage(READING_PASSAGES[randomIndex]);
  setCurrentScreen('reading-race');
};

// Get completed passage IDs from activity history
const getCompletedPassageIds = (): string[] => {
  if (!currentProfile) return [];

  return currentProfile.activityHistory
    .filter(activity => activity.activityType === 'reading')
    .map(activity => (activity as ReadingActivityResult).passageId)
    .filter((id, index, self) => self.indexOf(id) === index); // unique IDs
};

// Add passage selection screen to render
{currentScreen === 'passage-selection' && (
  <PassageSelector
    passages={READING_PASSAGES}
    completedPassageIds={getCompletedPassageIds()}
    onSelect={handlePassageSelect}
    onRandom={handleRandomPassage}
    onBack={handleBackToMenu}
  />
)}

// Update ReadingRace to accept selected passage
{currentScreen === 'reading-race' && currentProfile && selectedPassage && (
  <ReadingRace
    currentCoins={currentProfile.coins}
    onComplete={handleReadingComplete}
    onBack={handleBackToMenu}
    passage={selectedPassage}
  />
)}
```

**3. Update ReadingRace to Accept Passage Prop**

Modify `src/screens/ReadingRace.tsx`:

```typescript
interface ReadingRaceProps {
  currentCoins: number;
  onComplete: (coinsEarned: number, wpm: number, score: number, totalQuestions: number, passageId: string) => void;
  onBack: () => void;
  passage: ReadingPassage; // NEW: Accept passage instead of random selection
}

export const ReadingRace: React.FC<ReadingRaceProps> = ({
  currentCoins,
  onComplete,
  onBack,
  passage, // Use this instead of random selection
}) => {
  // Remove random selection logic
  // const [currentPassage] = useState(() => { ... });

  // Use passage prop directly
  const currentPassage = passage;

  // Update onComplete call to include passageId
  const handleFinish = () => {
    // ... existing logic
    onComplete(earned, wpm, correctCount, currentPassage.questions.length, currentPassage.id);
  };
};
```

**4. Update ActivityResult Type**

Update `src/types.ts`:

```typescript
export interface ReadingActivityResult extends BaseActivityResult {
  activityType: 'reading';
  wpm: number;
  score: number;
  totalQuestions: number;
  passageId: string; // NEW: Track which passage was completed
}
```

**5. Update handleReadingComplete in App.tsx**

```typescript
const handleReadingComplete = (
  coinsEarned: number,
  wpm: number,
  score: number,
  totalQuestions: number,
  passageId: string
) => {
  if (!currentProfileId) return;

  const result: ReadingActivityResult = {
    timestamp: new Date(),
    coinsEarned,
    activityType: 'reading',
    wpm,
    score,
    totalQuestions,
    passageId, // NEW: Store passage ID
  };

  setProfiles((prev) => ({
    ...prev,
    [currentProfileId]: {
      ...prev[currentProfileId],
      coins: prev[currentProfileId].coins + coinsEarned,
      activityHistory: [...prev[currentProfileId].activityHistory, result],
    },
  }));
};
```

#### Testing Checklist

**UI/UX Testing:**
- [ ] Passage selector displays all passages
- [ ] Filters work correctly (difficulty + category)
- [ ] Completed passages show checkmark
- [ ] "Random" button works
- [ ] Passage cards are clickable and responsive
- [ ] Mobile layout looks good
- [ ] Back button works

**Functionality Testing:**
- [ ] Selected passage loads in ReadingRace
- [ ] Passage ID stored in activity history
- [ ] Completed passages tracked correctly
- [ ] Filters can be combined (e.g., "Easy Fiction")
- [ ] "All" filter shows all passages

**Edge Cases:**
- [ ] What if no passages match filters? (Show message)
- [ ] What if all passages completed? (Still allow replay)
- [ ] Navigate back from passage selector - works?

#### Dependencies
- Task 1 must be complete (need all passages available)

#### Definition of Done
- ✅ PassageSelector component created
- ✅ Filters working (difficulty + category)
- ✅ Completed passages tracked
- ✅ Random option available
- ✅ Clean, kid-friendly UI
- ✅ Mobile responsive
- ✅ Integration tested end-to-end
- ✅ Code committed to branch

---

### TASK 4: Content Quality Testing & Validation
**Priority:** 🟡 High
**Estimated Time:** 2 hours
**Assignee:** Developer / Content Reviewer

#### User Story
```
As a parent
I want to be confident the content is age-appropriate and educational
So that my child learns effectively and safely
```

#### Current State
- New content created but not tested with real users
- No formal content review process
- Unknown if difficulty levels are accurate
- Questions not validated for clarity

#### Acceptance Criteria
- [ ] All 12 passages tested for readability (Flesch-Kincaid)
- [ ] Difficulty ratings validated (easy/medium/hard match actual reading level)
- [ ] At least 2 passages tested with target age group (5 and 8 year olds)
- [ ] Questions validated for clarity and answerability
- [ ] Content reviewed for accuracy (non-fiction facts checked)
- [ ] No inappropriate content (violence, scary themes, etc.)
- [ ] Feedback documented for future content creation

#### Technical Requirements

**1. Readability Testing**

For each passage, verify:
- Flesch-Kincaid Grade Level matches stated difficulty
  - Easy: Grade 1-2 (ages 6-7)
  - Medium: Grade 2-3 (ages 7-8)
  - Hard: Grade 3-4 (ages 8-9)

Tools:
- Hemingway Editor (http://hemingwayapp.com/)
- Readable.com
- Microsoft Word readability statistics

Create checklist:
```markdown
## Readability Test Results

### Fiction Passages
- [ ] The Tortoise and the Hare - Grade: ___ (Target: Medium 2-3)
- [ ] The Lost Puppy - Grade: ___ (Target: Medium 2-3)
- [ ] The Magic Paintbrush - Grade: ___ (Target: Medium 2-3)
- [ ] The Friendship Garden - Grade: ___ (Target: Medium 2-3)
- [ ] The Helpful Ant - Grade: ___ (Target: Easy 1-2)
- [ ] The Curious Cloud - Grade: ___ (Target: Medium 2-3)
- [ ] The Brave Little Mouse - Grade: ___ (Target: Medium 2-3)

### Non-Fiction Passages
- [ ] How Bees Make Honey - Grade: ___ (Target: Medium 2-3)
- [ ] Penguins of Antarctica - Grade: ___ (Target: Medium 2-3)
- [ ] Butterflies - Grade: ___ (Target: Easy 1-2)
- [ ] How Rainbows Form - Grade: ___ (Target: Medium 2-3)
- [ ] The Amazing Octopus - Grade: ___ (Target: Hard 3-4)
```

**2. User Testing Protocol**

If possible, test with actual children:

**Test with 5-year-old (Son's profile):**
- Word Catcher Set 1 (Pre-K words)
- Can they recognize the words when spoken?
- Are the options confusing?
- Do they need help or can they play independently?

**Test with 8-year-old (Daughter's profile):**
- Easy passage: "The Helpful Ant"
- Medium passage: "The Curious Cloud"
- Hard passage: "The Amazing Octopus"

Questions to assess:
- Can they read the passage independently?
- Do they understand what they read?
- Are questions clear?
- Is difficulty appropriate?
- Do they enjoy the content?

**3. Content Accuracy Review**

For non-fiction passages, verify facts:
- [ ] Bees - Nectar collection, honey production process
- [ ] Penguins - Habitat, swimming ability, cold adaptation
- [ ] Butterflies - Life cycle stages, metamorphosis
- [ ] Rainbows - 7 colors, light refraction science
- [ ] Octopus - 3 hearts, 8 arms, blue blood, chromatophores

Resources:
- National Geographic Kids
- Britannica Kids
- Educational science websites

**4. Question Quality Review**

For each passage, verify:
- [ ] All questions answerable from passage text
- [ ] Correct answers are clearly correct
- [ ] Distractors are plausible but clearly wrong
- [ ] No trick questions
- [ ] Age-appropriate language
- [ ] Mix of literal and inferential questions

**5. Document Findings**

Create test results document:
```markdown
## Content Testing Results - Sprint 2

### Readability Assessment
- 4 passages at Easy level (Grade 1-2): PASS/FAIL
- 6 passages at Medium level (Grade 2-3): PASS/FAIL
- 2 passages at Hard level (Grade 3-4): PASS/FAIL

### User Testing Feedback
**5-year-old tester:**
- Word Set 1: [observations]
- Enjoyment: [rating]
- Difficulty: [too easy / just right / too hard]

**8-year-old tester:**
- Easy passage: [observations]
- Medium passage: [observations]
- Hard passage: [observations]
- Favorite passage: [name]

### Content Accuracy
- All non-fiction facts verified: YES/NO
- Sources: [list sources]

### Recommendations
- [Any content adjustments needed]
- [Difficulty re-ratings]
- [Question clarifications]
```

#### Testing Checklist

**Pre-Testing:**
- [ ] Install readability checking tools
- [ ] Prepare testing environment
- [ ] Recruit child testers (if available)

**Readability Testing:**
- [ ] Test all 12 passages with Hemingway Editor
- [ ] Document grade levels
- [ ] Flag any passages that don't match target
- [ ] Adjust content if needed

**User Testing:**
- [ ] Test Word Catcher with 5-year-old
- [ ] Test 3 reading passages with 8-year-old
- [ ] Observe without helping
- [ ] Note struggles and successes
- [ ] Ask for feedback

**Content Review:**
- [ ] Fact-check all non-fiction content
- [ ] Review all questions for clarity
- [ ] Check for inappropriate content
- [ ] Verify educational value

**Documentation:**
- [ ] Create test results document
- [ ] Log all findings
- [ ] Create action items for fixes
- [ ] Update CONTENT_GUIDELINES.md if needed

#### Dependencies
- Task 1 (content creation) must be complete

#### Definition of Done
- ✅ All 12 passages readability-tested
- ✅ At least 2 passages user-tested with real children
- ✅ All non-fiction facts verified
- ✅ Test results documented
- ✅ Any necessary content adjustments made
- ✅ Confidence in content quality and appropriateness

---

## Sprint 2 Schedule

### Recommended Order

**Day 1 (Monday):**
- 🏃 Task 1: Create 3 new passages (3h)
- 🏃 Task 2: Begin sight word expansion (2h)

**Day 2 (Tuesday):**
- 🏃 Task 1: Create 3 more passages (3h)
- 🏃 Task 2: Complete sight word sets implementation (3h)

**Day 3 (Wednesday):**
- 🏃 Task 3: Build PassageSelector UI (3h)
- 🏃 Task 4: Begin content testing (1h)

**Day 4 (Thursday):**
- 🏃 Task 3: Complete passage selection integration (remainder)
- 🏃 Task 4: User testing with children (1h)
- 🏃 Integration Testing (2h)

**Day 5 (Friday):**
- 🏃 Bug Fixes (2h)
- 🏃 Final QA Testing (1h)
- ✅ Sprint Review (1h)
- ✅ Sprint Retrospective (0.5h)

---

## Testing Strategy

### Content Testing (Throughout Sprint)
- Readability testing after each passage created
- Fact-checking as non-fiction content is written
- Question validation before committing

### Integration Testing (Day 4)
- Test full flow: Profile → Activity → Passage Selection → Reading
- Test word set progression
- Test filters and selections
- Test data persistence (passage completion tracking)
- Cross-browser testing

### User Acceptance Testing (Day 4-5)
- Test with 5-year-old: Word sets appropriate?
- Test with 8-year-old: Passages appropriate?
- Gather qualitative feedback
- Observe engagement and completion

---

## Definition of Done (Sprint Level)

Sprint 2 is complete when:

- [ ] 12 reading passages available (100% increase from Sprint 1)
- [ ] 52 sight words in 5 progressive sets (420% increase)
- [ ] Passage selection UI implemented and working
- [ ] Word set selection implemented and working
- [ ] All content tested for quality and appropriateness
- [ ] TypeScript builds with zero errors
- [ ] No console errors during normal use
- [ ] Data persists correctly (passage IDs, word sets)
- [ ] Code pushed to git branch
- [ ] Documentation updated (if needed)
- [ ] Ready for Sprint 3 (Progress Dashboard)

---

## Risk Management

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Content creation takes longer than 6h | Medium | Medium | Start with templates, use AI for initial drafts, accept 10-12 passages instead of 15 |
| Can't access children for user testing | High | Low | Use online readability tools, test with adult reviewers, defer user testing to Sprint 3 |
| Passage selector UI more complex than estimated | Low | Medium | Use simple list first, enhance later; 3h should be sufficient |
| Sight word sets integration breaks existing functionality | Low | High | Test thoroughly, maintain backward compatibility |

---

## Success Metrics

At the end of Sprint 2, we should achieve:

- **Content Variety:** 12 passages (200% of Sprint 1 end state)
- **Word Vocabulary:** 52 words (520% of Sprint 1 end state)
- **User Choice:** 100% of users can choose their content
- **Content Quality:** 100% of passages meet readability standards
- **Engagement:** Sufficient variety for 2+ weeks daily use

---

## Sprint Retrospective Questions

To discuss at end of Sprint 2:

1. **What went well?**
   - Was content creation easier with templates?
   - Did the AI assistance help?
   - Were estimates accurate?

2. **What could be improved?**
   - Content creation workflow
   - Testing process
   - User testing access

3. **Action items for Sprint 3:**
   - Based on user feedback, what content adjustments?
   - Process improvements for future content
   - Technical debt identified

---

## Next Sprint Preview

**Sprint 3: Progress Tracking & Motivation**
- Build Progress Dashboard screen
- Implement achievement badges system
- Add streak tracking (consecutive days)
- Create parent-facing analytics

---

## Appendix: Content Writing Tips

### Fiction Writing Formula
1. **Setup** (30%): Introduce character, setting, problem
2. **Challenge** (40%): Character faces obstacle, makes choices
3. **Resolution** (30%): Problem solved, lesson learned

### Non-Fiction Writing Formula
1. **Hook** (20%): Interesting fact or question
2. **Explanation** (60%): Clear, sequential information
3. **Conclusion** (20%): Summary or call-to-action

### Question Writing Formula
- **Question 1:** Literal - direct fact from text
- **Question 2:** Inferential - requires understanding context
- **Question 3:** Personal/Opinion - connection or reflection

### Readability Checklist
- ✅ Short sentences (8-12 words average)
- ✅ Simple words (no jargon)
- ✅ Active voice ("The cat chased the mouse" not "The mouse was chased")
- ✅ Clear paragraph breaks
- ✅ Concrete examples
- ✅ Context clues for new vocabulary

---

*Document Version: 1.0*
*Created: 2025-11-09*
*Sprint Start: TBD*
*Sprint End: TBD*
*Sprint Duration: 1 Week*
