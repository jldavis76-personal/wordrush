# WordRush v1.5 Product Roadmap
*4-Week Development Plan*

## Executive Summary

WordRush v1.0 is a solid MVP with excellent core mechanics, but has critical gaps preventing production use. Version 1.5 focuses on **making the app production-ready** through data persistence, content expansion, and quality improvements. This roadmap balances high-impact features with realistic 4-week delivery timeline.

---

## Current State Assessment

**Strengths:**
- ✅ Excellent core gameplay mechanics (Reading Race, Word Catcher)
- ✅ Kid-friendly UI with great visual design
- ✅ Clean React/TypeScript architecture
- ✅ Responsive design works on tablets/mobile

**Critical Gaps:**
- ❌ No data persistence (users lose progress on refresh)
- ❌ Minimal content (1 reading passage, 10 sight words)
- ❌ Type signature bug preventing proper compilation
- ❌ Zero test coverage
- ❌ No progress tracking or analytics

---

## v1.5 Goals

**Primary Objective:** Transform MVP into production-ready application suitable for daily use by target children

**Success Criteria:**
1. Progress persists between sessions
2. Sufficient content variety for 2+ weeks of engagement
3. Parents can track child progress
4. Zero critical bugs
5. Basic test coverage for stability

---

## Feature Prioritization Framework

Each feature rated on:
- **Impact**: User value (High/Medium/Low)
- **Effort**: Development time (Small/Medium/Large)
- **Priority**: Overall ranking based on Impact/Effort ratio

---

# Proposed Features for v1.5

## 🔴 Critical Priority (Must Have)

### 1. Data Persistence with LocalStorage
**Impact:** HIGH | **Effort:** SMALL | **Time:** 4-6 hours

**Problem:** Users lose all progress on page refresh, destroying engagement and motivation.

**Solution:** Implement localStorage to persist:
- User profiles (coins, unlocked items)
- Activity completion history
- Session timestamps

**Why Critical:**
- Blocks all progress tracking features
- Destroys user engagement (coins reset daily)
- Required for any production use

**Implementation:**
- Add `useEffect` hooks in App.tsx to save/load state
- Create localStorage utility functions
- Add version migration logic for future updates

**Dependencies:** None

---

### 2. Fix Type Signature Bug
**Impact:** HIGH | **Effort:** SMALL | **Time:** 1 hour

**Problem:** Activity callbacks have mismatched type signatures causing TypeScript compilation issues:
- `App.tsx` expects: `(coinsEarned: number) => void`
- `ReadingRace.tsx` sends: `(coinsEarned, wpm, score) => void`
- `WordCatcher.tsx` sends: `(coinsEarned, score) => void`

**Solution:** Update parent component to accept and store all activity metrics

**Why Critical:**
- Prevents clean TypeScript build
- Loses valuable performance data (WPM, scores)
- Blocks future analytics features

**Dependencies:** None

---

### 3. Install Dependencies & Setup Development Environment
**Impact:** HIGH | **Effort:** SMALL | **Time:** 0.5 hours

**Problem:** npm dependencies not installed, build fails

**Solution:** Run `npm install` and verify build process

**Why Critical:**
- Blocks all development work
- Required to see TypeScript errors

**Dependencies:** None

---

## 🟡 High Priority (Should Have)

### 4. Content Expansion: Reading Passages
**Impact:** HIGH | **Effort:** MEDIUM | **Time:** 8-12 hours

**Problem:** Single reading passage kills replayability after 2-3 tries.

**Solution:** Add 10-15 age-appropriate reading passages:
- **Age 8+ Level:** 8 passages (150-200 words each)
  - Mix of fiction (fables, short stories)
  - Non-fiction (animals, science facts)
  - Varying difficulty (grades 2-3)
- **Age 5+ Level:** 4 passages (50-75 words each)
  - Simple sentences for beginning readers
  - Repetitive patterns

**Why High Priority:**
- Directly increases engagement time
- Enables repeated daily use
- Low technical complexity (content creation)

**Implementation:**
- Update `content.ts` data structure to array of passages
- Add passage selection logic (random or sequential)
- Add "Next Story" button to replay with new content

**Dependencies:** Data persistence (to track completed passages)

---

### 5. Progress Dashboard
**Impact:** HIGH | **Effort:** MEDIUM | **Time:** 6-8 hours

**Problem:** No way to see reading progress over time (critical for parents).

**Solution:** Add "Progress" screen showing:
- Total activities completed (by type)
- Total coins earned
- Best reading speed (WPM)
- Reading streak (consecutive days)
- Activity history (last 10 completions with scores)
- Simple charts/graphs (bar chart of scores over time)

**Why High Priority:**
- Enables parent visibility
- Motivates kids with visual progress
- Leverages data from type signature fix

**Implementation:**
- New `ProgressDashboard.tsx` screen
- Store activity history in localStorage
- Use simple CSS bar charts (no charting library needed initially)

**Dependencies:** Type signature fix, data persistence

---

### 6. Content Expansion: Sight Words
**Impact:** MEDIUM | **Effort:** SMALL | **Time:** 4-6 hours

**Problem:** Only 10 sight words limits Word Catcher replayability.

**Solution:** Expand to 52 Dolch Pre-K sight words in rotating sets:
- Keep 10 words per round (manageable for kids)
- Rotate through 5 different word sets
- Track which sets completed

**Why High Priority:**
- Quick win (low effort, clear value)
- Increases Word Catcher engagement 5x
- Aligns with educational standards

**Implementation:**
- Expand word list in `content.ts`
- Add word set selection logic
- Show "Word Set 1/5" indicator

**Dependencies:** None (nice to have persistence for set tracking)

---

### 7. Achievement Badges System
**Impact:** MEDIUM | **Effort:** MEDIUM | **Time:** 6-8 hours

**Problem:** Coins are only reward; need more milestone celebrations.

**Solution:** Add badge achievements:
- **Reading Badges:** "Speed Reader" (10+ WPM), "Book Worm" (10 passages completed)
- **Word Badges:** "Word Wizard" (50 words correct), "Perfect Round" (10/10 correct)
- **Streak Badges:** "3-Day Streak", "7-Day Streak"
- **Shop Badges:** "Big Spender" (unlock all items)

**Why High Priority:**
- Increases motivation and engagement
- Provides goals beyond coins
- Parents love seeing accomplishments

**Implementation:**
- Add `badges` array to Profile type
- Create badge definitions in `content.ts`
- Add badge unlock logic in activity completions
- Create badge display component
- Add "Badges" screen in navigation

**Dependencies:** Data persistence, progress tracking

---

## 🟢 Medium Priority (Nice to Have)

### 8. Parent Settings & Controls
**Impact:** MEDIUM | **Effort:** MEDIUM | **Time:** 4-6 hours

**Problem:** No way for parents to adjust app settings or manage profiles.

**Solution:** Add "Settings" screen (password-protected):
- Toggle text-to-speech on/off
- Reset profile progress
- Add/edit child profiles
- Export progress data (CSV/JSON)

**Why Medium Priority:**
- Important for parent control
- Not blocking core gameplay
- Can be simple v1 implementation

**Implementation:**
- New `Settings.tsx` screen
- Simple PIN code entry (4 digits)
- localStorage for settings

**Dependencies:** Data persistence

---

### 9. Memory Leak Fix & Error Handling
**Impact:** MEDIUM | **Effort:** SMALL | **Time:** 2-3 hours

**Problem:** Potential memory leak in ReadingRace timer, no error boundaries.

**Solution:**
- Fix `setInterval` cleanup in ReadingRace.tsx
- Add error boundary component
- Add try-catch to Web Speech API calls
- Add fallback UI for errors

**Why Medium Priority:**
- Improves stability
- Prevents crashes
- Quick wins

**Dependencies:** None

---

### 10. Basic Test Coverage
**Impact:** MEDIUM | **Effort:** MEDIUM | **Time:** 8-10 hours

**Problem:** Zero test coverage makes refactoring risky.

**Solution:** Add Vitest + React Testing Library:
- Test utilities (localStorage, scoring logic)
- Test critical components (Avatar, CoinDisplay)
- Test activity completion flows
- Target 40-50% coverage (critical paths only)

**Why Medium Priority:**
- Prevents regressions
- Enables confident refactoring
- Best practice for production apps

**Implementation:**
- Install Vitest and @testing-library/react
- Add test scripts to package.json
- Write 15-20 core tests

**Dependencies:** Dependencies installed

---

### 11. Sound Effects & Audio Feedback
**Impact:** MEDIUM | **Effort:** SMALL | **Time:** 3-4 hours

**Problem:** App feels flat without audio feedback.

**Solution:** Add sound effects:
- Coin collection sound (cha-ching!)
- Correct answer (positive chime)
- Wrong answer (gentle buzz)
- Item unlock (celebration sound)
- Optional background music toggle

**Why Medium Priority:**
- Increases engagement significantly
- Kids love audio feedback
- Easy to implement with HTML5 Audio

**Implementation:**
- Use royalty-free sound library (freesound.org)
- Add `useSound` custom hook
- Add volume controls in settings
- Mute button in header

**Dependencies:** Settings screen (for controls)

---

### 12. Difficulty Levels for Reading Race
**Impact:** MEDIUM | **Effort:** MEDIUM | **Time:** 5-6 hours

**Problem:** Fixed difficulty doesn't adapt to child's level.

**Solution:** Add 3 difficulty levels:
- **Easy:** 100-125 words, 2 questions, simpler vocabulary
- **Medium:** 150-175 words, 3 questions (current level)
- **Hard:** 200-250 words, 4 questions, complex vocabulary

**Why Medium Priority:**
- Supports skill progression
- Keeps advanced readers engaged
- Prevents frustration for struggling readers

**Implementation:**
- Add difficulty selector before activity starts
- Filter passages by difficulty tag
- Adjust scoring multiplier by difficulty

**Dependencies:** Expanded reading passage content

---

## 🔵 Low Priority (Future Versions)

### 13. Accessibility Improvements
**Impact:** LOW | **Effort:** MEDIUM | **Time:** 6-8 hours

**Features:**
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader testing
- High contrast mode
- Focus indicators

**Why Low Priority:**
- Target users are sighted children using touch
- Important but not blocking MVP
- Better suited for v1.6+

---

### 14. Mobile App (PWA)
**Impact:** LOW | **Effort:** SMALL | **Time:** 2-3 hours

**Features:**
- Add PWA manifest
- Add service worker for offline support
- "Add to Home Screen" capability
- App icon

**Why Low Priority:**
- Web app works fine on mobile browsers
- Nice polish but not critical
- Quick to add later

---

### 15. Multiplayer Competition
**Impact:** LOW | **Effort:** LARGE | **Time:** 15-20 hours

**Features:**
- Sibling head-to-head races
- Leaderboards
- Challenge sending

**Why Low Priority:**
- Requires backend infrastructure
- Complex feature
- Better for v2.0+

---

# 4-Week Sprint Plan

## Week 1: Foundation & Critical Fixes
**Goal:** Fix bugs, establish persistence, setup for growth

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Install dependencies & verify build | Critical | 0.5 | Week 1 |
| Fix type signature bug | Critical | 1 | Week 1 |
| Implement localStorage persistence | Critical | 6 | Week 1 |
| Fix memory leak & error handling | Medium | 3 | Week 1 |
| Begin reading passage content creation | High | 6 | Week 1 |

**Deliverables:**
- ✅ Clean TypeScript build
- ✅ Data persists between sessions
- ✅ No memory leaks or crashes
- ✅ 5+ new reading passages

**Total Hours:** 16.5 hours

---

## Week 2: Content Expansion
**Goal:** Add enough content for 2+ weeks of daily use

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Complete reading passages (10-15 total) | High | 6 | Week 2 |
| Expand sight word sets (52 words) | High | 5 | Week 2 |
| Add passage selection logic | High | 3 | Week 2 |
| Test content with target age groups | High | 2 | Week 2 |

**Deliverables:**
- ✅ 10-15 reading passages across age levels
- ✅ 52 sight words in 5 rotating sets
- ✅ Random/sequential passage selection
- ✅ Content variety supports daily use

**Total Hours:** 16 hours

---

## Week 3: Progress Tracking & Motivation
**Goal:** Add visibility and motivation systems

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Build Progress Dashboard screen | High | 7 | Week 3 |
| Implement achievement badges system | High | 7 | Week 3 |
| Add badge display UI | High | 2 | Week 3 |
| Create streak tracking logic | Medium | 3 | Week 3 |

**Deliverables:**
- ✅ Progress dashboard with charts
- ✅ 8-10 achievement badges
- ✅ Streak tracking (consecutive days)
- ✅ Activity history view

**Total Hours:** 19 hours

---

## Week 4: Polish & Production Readiness
**Goal:** Settings, testing, audio, final QA

| Task | Priority | Hours | Status |
|------|----------|-------|--------|
| Parent Settings screen | Medium | 5 | Week 4 |
| Add sound effects & audio | Medium | 4 | Week 4 |
| Write basic test suite (Vitest) | Medium | 8 | Week 4 |
| QA testing with children | High | 3 | Week 4 |
| Bug fixes from testing | High | 4 | Week 4 |

**Deliverables:**
- ✅ Parent settings with controls
- ✅ Audio feedback on actions
- ✅ 40%+ test coverage
- ✅ QA testing complete
- ✅ Production-ready v1.5

**Total Hours:** 24 hours

---

# Summary: Features Included in v1.5

## ✅ Committed Features (75.5 hours)

1. **Data Persistence** (6h) - localStorage implementation
2. **Type Signature Fix** (1h) - Fix activity callbacks
3. **Dependencies Setup** (0.5h) - npm install & build
4. **Reading Passage Expansion** (12h) - 10-15 passages
5. **Sight Word Expansion** (5h) - 52 Dolch words
6. **Progress Dashboard** (7h) - Charts and history
7. **Achievement Badges** (9h) - Badge system + UI
8. **Parent Settings** (5h) - Controls and management
9. **Memory Leak Fixes** (3h) - Cleanup and error handling
10. **Sound Effects** (4h) - Audio feedback
11. **Basic Test Coverage** (8h) - Vitest setup + tests
12. **QA & Bug Fixes** (7h) - Testing and refinement
13. **Streak Tracking** (3h) - Daily engagement tracking
14. **Content Testing** (2h) - Age-appropriate validation
15. **Passage Selection Logic** (3h) - Random/sequential

## ⏳ Deferred to v1.6+

- Difficulty levels (5-6h)
- Accessibility improvements (6-8h)
- PWA features (2-3h)
- Multiplayer competition (15-20h)

---

# Success Metrics

**v1.5 will be considered successful if:**

1. **Retention:** Children use app 3+ days per week for 2+ weeks
2. **Engagement:** Average session includes 2+ activities
3. **Content Variety:** Users experience different content each session
4. **Stability:** Zero critical bugs or data loss incidents
5. **Parent Satisfaction:** Parents report ability to track progress effectively

---

# Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Content creation takes longer than estimated | Medium | Medium | Start early (Week 1), use templates, AI assistance for generation |
| Testing reveals major UX issues | High | Low | Incremental testing with kids throughout sprints |
| localStorage limitations (storage size) | Low | Low | Monitor usage, implement cleanup for old data |
| Schedule slips due to scope creep | Medium | Medium | Strict prioritization, defer nice-to-haves to v1.6 |

---

# v1.6 Preview (Next 4 Weeks)

**Focus Areas:**
- Difficulty levels and adaptive learning
- Accessibility (WCAG 2.1 AA compliance)
- New activity type: Story Sequencing
- Enhanced parent dashboard with analytics
- PWA capabilities for offline use
- Performance optimizations

---

# Appendix: Effort Estimation Reference

**Small Effort (1-6 hours):**
- Bug fixes
- Content updates
- Minor UI adjustments
- Simple feature toggles

**Medium Effort (6-12 hours):**
- New screens/components
- Data structure changes
- Integration work
- Moderate testing

**Large Effort (12+ hours):**
- Complex features with multiple screens
- Backend integrations
- Comprehensive testing
- Major architectural changes

---

*Document Version: 1.0*
*Created: 2025-11-08*
*Target Release: v1.5 (4 weeks from start)*
*Next Review: End of Week 2*
