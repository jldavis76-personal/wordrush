# WordRush - Claude.md

## Project Overview

WordRush is a reading practice application designed for kids ages 5-9. It makes reading fun through interactive activities and a reward system. The app features two different activities tailored to different age groups and skill levels, along with a simple avatar customization system to keep kids motivated.

**Purpose**: Help kids practice reading skills while making it engaging and rewarding.

**Target Users**: Two children (ages 5 and 8) with different reading levels.

## Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.0.8
- **Language**: TypeScript 5.2.2
- **Styling**: Tailwind CSS 3.4.0 with custom design system
- **Animation**: tailwindcss-animate 1.0.7
- **State Management**: React useState (no external state library)
- **Data Persistence**: None in V1 (all data in React state, resets on refresh)

## Project Structure

```
WordRush/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Basic UI components (Button, Card)
│   │   ├── Avatar.tsx     # Avatar display with unlocked items
│   │   └── CoinDisplay.tsx # Coin counter display
│   ├── data/              # Static content and game data
│   │   └── content.ts     # Reading passages, sight words, shop items
│   ├── screens/           # Main application screens
│   │   ├── ProfileSelection.tsx
│   │   ├── ActivitySelection.tsx
│   │   ├── ReadingRace.tsx      # Daughter's reading activity
│   │   ├── WordCatcher.tsx      # Son's sight word game
│   │   └── AvatarShop.tsx
│   ├── types.ts           # TypeScript type definitions
│   ├── index.css          # Tailwind imports and global styles
│   ├── main.tsx           # React entry point
│   └── App.tsx            # Main app component with state management
├── public/                # Static assets
├── index.html             # HTML entry point
├── vite.config.ts         # Vite configuration
├── tailwind.config.js     # Tailwind configuration with design system
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Current MVP Scope (V1)

### What's Included

✅ **Profile System**
- Two pre-configured profiles (Daughter age 8, Son age 5)
- Each profile tracks coins and unlocked avatar items
- Simple profile selection screen

✅ **Reading Race (Daughter, Age 8)**
- One reading passage: "The Tortoise and the Hare" (~150 words)
- Timer to calculate words per minute (WPM)
- 2 multiple-choice comprehension questions
- Coin rewards: 10 base + 5 per correct answer (max 20 coins)

✅ **Word Catcher (Son, Age 5)**
- 10 Dolch Pre-K sight words: I, a, am, the, see, can, go, we, my, you
- Multiple choice game (3 options per word)
- Optional text-to-speech using Web Speech API
- Coin rewards: 5 base + 1 per correct word (max 15 coins)

✅ **Avatar Shop**
- 3 unlockable items:
  - 🎩 Cool Hat (10 coins)
  - 🕶️ Awesome Glasses (20 coins)
  - 🦸 Super Cape (30 coins)
- Visual avatar preview with equipped items
- Purchase validation (check if user has enough coins)

✅ **Kid-Friendly Design System**
- Large, colorful buttons with emojis
- Playful animations (bounce effects on success)
- High contrast colors for readability
- Large text sizes (18px minimum)
- Mobile-first responsive design

### What's NOT Included (V2+ Features)

❌ Multiple reading passages
❌ Difficulty levels or adaptive learning
❌ LocalStorage or any data persistence
❌ Progress tracking over time (charts, history)
❌ Audio recording of kids reading
❌ Parent dashboard or settings
❌ Timer pause functionality
❌ Sound effects
❌ Dark mode
❌ More avatar items or customization options

## Data Model

All data is stored in React state in [App.tsx](src/App.tsx). Data resets on page refresh.

```typescript
// Main profiles state
const [profiles, setProfiles] = useState<Profiles>({
  daughter: {
    id: 'daughter',
    name: 'Daughter',
    age: 8,
    coins: 0,
    unlockedItems: [] // ['hat', 'glasses', 'cape']
  },
  son: {
    id: 'son',
    name: 'Son',
    age: 5,
    coins: 0,
    unlockedItems: []
  }
});

// Current session state
const [currentProfileId, setCurrentProfileId] = useState<ProfileId | null>(null);
const [currentScreen, setCurrentScreen] = useState<Screen>('profile-selection');
```

### Type Definitions

See [types.ts](src/types.ts) for all TypeScript interfaces:
- `Profile`: User profile data structure
- `ProfileId`: Type for profile identifiers ('daughter' | 'son')
- `UnlockableItem`: Avatar shop items ('hat' | 'glasses' | 'cape')
- `ShopItem`: Shop item display information
- `ComprehensionQuestion`: Reading comprehension question structure

## Key Design Decisions

### Why React State Instead of Backend?

**Decision**: Use only React state for V1, no backend or LocalStorage.

**Reasoning**:
1. **Speed**: Building a backend would add 2-3 hours to the MVP timeline
2. **Simplicity**: Easier to test and debug without database complexity
3. **Iteration**: Can test core gameplay first, then add persistence in V2
4. **Scope**: For a weekend prototype, persistence isn't critical

**Trade-offs**:
- Data resets on page refresh (acceptable for initial testing)
- Can't track progress over time yet
- No cross-device sync

### Why These Specific Activities?

**Reading Race (Age 8)**:
- Measures reading speed (WPM), which is important for 2nd-3rd grade
- Comprehension questions ensure understanding, not just speed-reading
- Classic fable provides moral lesson alongside reading practice

**Word Catcher (Age 5)**:
- Dolch sight words are proven foundation for early readers
- Recognition-based (multiple choice) is appropriate for pre-K/K level
- Text-to-speech helps connect written words to sounds

### Design System Choices

**Colors**:
- Bright, high-contrast colors for kid-friendliness
- Blue primary (#3B82F6) - energetic but not overwhelming
- Orange/gold secondary (#F59E0B) - associated with rewards and coins
- Green for success, red for errors - universal color meanings kids understand

**Typography**:
- 18px minimum body text (kids need larger text than adults)
- System font stack for fast loading and readability
- Bold, clear headings

**Spacing**:
- 8px grid system for visual consistency
- Generous padding (24px-32px) for touch-friendly design
- Large tap targets (56px+ height) for small fingers

**Interactivity**:
- Immediate visual feedback (hover effects, scale transforms)
- Celebration animations for positive reinforcement
- Emojis throughout for visual interest and fun

## Content Details

### Reading Passage

**Title**: The Tortoise and the Hare
**Word Count**: 150 words
**Reading Level**: 2nd-3rd grade
**Source**: Simplified Aesop's Fable

**Comprehension Questions**:
1. Who challenged the Tortoise to a race?
   - Options: The Tortoise, **The Hare** (correct), The Fox
2. Who won the race?
   - Options: The Hare, The Fox, **The Tortoise** (correct)

### Sight Words (Dolch Pre-K List)

Complete list of 10 words used in Word Catcher:
I, a, am, the, see, can, go, we, my, you

These are the most common words in children's books and represent foundational reading skills.

### Avatar Shop Items

1. **🎩 Cool Hat** - 10 coins
   - First unlock goal (achievable after 1-2 activities)
   - Positioned above avatar

2. **🕶️ Awesome Glasses** - 20 coins
   - Mid-tier goal (requires successful completion of activities)
   - Overlaid on avatar face

3. **🦸 Super Cape** - 30 coins
   - Premium item (requires multiple successful activities)
   - Positioned behind avatar

**Design Note**: Costs are calibrated so kids can unlock the first item quickly (positive reinforcement), while later items require more engagement.

## Development Guide

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Development Server

After running `npm run dev`, the app will be available at `http://localhost:5173`

### Adding New Content

**To add a new reading passage**:
1. Edit [src/data/content.ts](src/data/content.ts)
2. Update `READING_PASSAGE` object with new text and word count
3. Update `COMPREHENSION_QUESTIONS` array with 2 new questions

**To add new sight words**:
1. Edit [src/data/content.ts](src/data/content.ts)
2. Update `SIGHT_WORDS` array
3. Ensure words are appropriate for the age level

**To add new shop items**:
1. Edit [src/data/content.ts](src/data/content.ts)
2. Add new item to `SHOP_ITEMS` array
3. Update `UnlockableItem` type in [src/types.ts](src/types.ts)
4. Update [src/components/Avatar.tsx](src/components/Avatar.tsx) to render the new item

### Building for Production

```bash
npm run build
```

This will:
1. Run TypeScript compiler to check for errors
2. Build optimized production bundle with Vite
3. Output files to `dist/` directory

## Deployment

### Option 1: Netlify (Recommended)

1. Install Netlify CLI (optional):
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   # Build first
   npm run build

   # Deploy to Netlify
   netlify deploy --prod --dir=dist
   ```

3. Or use Netlify's drag-and-drop interface:
   - Go to https://app.netlify.com/drop
   - Drag the `dist/` folder

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Or connect GitHub repo in Vercel dashboard for automatic deployments

### Deployment Configuration

Both platforms auto-detect Vite projects. If needed, use these settings:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

## Future Roadmap (V2+)

### Phase 2: Persistence & Progress
- **LocalStorage integration**: Save profiles, coins, and unlocked items
- **Progress dashboard**: Show reading history, WPM trends over time
- **Streak tracking**: Encourage daily practice
- **More passages**: Add 5-10 reading passages at various levels

### Phase 3: AWS Serverless Backend
- **Technology**: DynamoDB + Lambda + API Gateway
- **Features**:
  - Cross-device sync
  - Parent dashboard (view kids' progress from phone)
  - Analytics (track which activities kids prefer)
  - More robust data storage

### Phase 4: Enhanced Features
- **More activities**:
  - Spelling practice
  - Vocabulary builder
  - Story sequencing
- **Difficulty levels**: Adaptive learning based on performance
- **More avatar customization**:
  - Multiple avatar characters
  - Backgrounds and themes
  - Animated items
- **Sound effects and music**: Optional audio feedback
- **Achievements/badges**: Beyond just coins
- **Multiplayer**: Siblings can challenge each other

### Phase 5: Content Expansion
- **Grade-level content**: Passages for K-5th grade
- **Subject variety**: Fiction, non-fiction, poetry, science
- **Custom content**: Parents can add their own passages
- **Audio narration**: Professional voice acting for passages

## Testing Notes

### What to Test with Kids on Monday

1. **Profile Selection**:
   - Can they easily identify and select their profile?
   - Are avatars large and clear enough?

2. **Reading Race (Daughter)**:
   - Is the passage at an appropriate difficulty?
   - Are the questions too easy or too hard?
   - Does she understand the timer concept?
   - Is the WPM display motivating or confusing?

3. **Word Catcher (Son)**:
   - Does he understand how to match the words?
   - Is text-to-speech working and helpful?
   - Are the sight words appropriate for his level?
   - Does he enjoy the feedback (✅/❌)?

4. **Coin System**:
   - Do they understand earning coins?
   - Is the first item (hat) unlockable quickly enough?
   - Are they motivated to earn more for bigger items?

5. **Overall Engagement**:
   - Do they want to play again?
   - Which activity do they prefer?
   - Any confusion in the UI?
   - Are buttons easy to tap on iPad?

### Known Limitations to Observe

- Data resets on refresh (explain to kids it's a prototype)
- No sound effects yet (add if they seem important)
- Only one passage for daughter (will she want variety?)
- Limited sight words for son (does he want more challenge?)

### Metrics to Track Informally

- Time spent in each activity
- Number of times they replay activities
- First reactions to coin rewards
- Which shop item they unlock first
- Any moments of confusion or frustration

## Technical Notes

### Web Speech API

The Word Catcher activity uses the browser's built-in Web Speech API:

```typescript
if ('speechSynthesis' in window) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = 0.8; // Slower for kids
  speechSynthesis.speak(utterance);
}
```

**Browser Support**:
- ✅ Chrome/Edge: Full support
- ✅ Safari: Full support
- ✅ Firefox: Full support
- ⚠️ Falls back gracefully if not supported

### Performance Considerations

- No images (using emojis for graphics) = fast loading
- Minimal dependencies = small bundle size
- Vite's fast refresh = smooth development experience
- Tailwind purges unused CSS = optimized production build

### Browser Compatibility

Tested on:
- Chrome 120+
- Safari 17+
- Firefox 120+
- Edge 120+

**Recommended**: Use on iPad Safari for the best kid-friendly experience.

## Contributing

This is a personal family project, but if you're building something similar:

1. Fork and customize for your kids' needs
2. Adjust reading levels based on your kids' abilities
3. Add content that interests your specific children
4. Modify coin costs based on how much engagement you want

## License

Personal project - use however you'd like for your own family!

## Questions?

For future development or if you want to extend this:
- Review the inline code comments in [src/App.tsx](src/App.tsx)
- Check the type definitions in [src/types.ts](src/types.ts)
- Look at the modular screen components in `src/screens/`

---

**Built with ❤️ for family learning**

*Version 1.0.0 - MVP*
*Created: November 2025*
