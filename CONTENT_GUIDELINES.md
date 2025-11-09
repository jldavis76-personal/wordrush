# WordRush Content Guidelines

This document provides guidelines for creating and adding new reading passages to the WordRush application.

## Overview

Reading passages are the core content for the Reading Race activity, designed for 8-year-old children (Grade 2-3 reading level). Each passage should be engaging, educational, and age-appropriate.

## Current Content

As of Sprint 1, we have **6 reading passages**:

### Fiction (4 passages)
1. **The Tortoise and the Hare** - Classic fable about perseverance
2. **The Lost Puppy** - Story about kindness and helping others
3. **The Magic Paintbrush** - Fantasy story about creativity and imagination
4. **The Friendship Garden** - Story about cooperation and teamwork

### Non-Fiction (2 passages)
1. **How Bees Make Honey** - Educational content about nature and science
2. **Penguins of Antarctica** - Animal facts and habitat information

## Content Standards

### Reading Level Requirements

- **Target Age:** 8 years old
- **Grade Level:** 2-3
- **Flesch-Kincaid Score:** Grade 2-3
- **Word Count:** 150-200 words
- **Sentence Length:** 8-12 words average
- **Vocabulary:** Common words with occasional new words that can be understood from context

### Content Requirements

Each reading passage must include:

1. **Unique ID** - Kebab-case identifier (e.g., 'tortoise-hare')
2. **Title** - Clear, engaging title
3. **Text** - The passage content (150-200 words)
4. **Word Count** - Exact count for WPM calculation
5. **Category** - Either 'fiction' or 'non-fiction'
6. **Difficulty** - 'easy', 'medium', or 'hard'
7. **Questions** - 2-3 comprehension questions with answers

### Theme Guidelines

Stories should be:
- Age-appropriate and child-friendly
- Positive and uplifting
- Educational or entertaining (or both)
- Diverse in characters and settings
- Free from scary, violent, or inappropriate content

### Diversity Considerations

- Include characters of different backgrounds
- Feature both male and female protagonists
- Represent various cultures and traditions
- Include different family structures
- Show diverse abilities and perspectives

## Question Writing Guidelines

### Question Types

Each passage should have **2-3 questions** with a mix of:

1. **Literal Questions** - Facts directly stated in the text
   - Example: "Where did Maya find the puppy?"

2. **Inferential Questions** - Require reading between the lines
   - Example: "Why did the Hare lose the race?"

3. **Connection Questions** - Personal response or application
   - Example: "What would you paint if you had a magic paintbrush?"

### Question Format

Each question must have:
- A clear question stem
- Three answer options (multiple choice)
- One correct answer (indicated by correctIndex: 0, 1, or 2)
- Plausible but clearly incorrect distractors

### Question Quality Standards

- Questions must be answerable by reading the passage
- Avoid trick questions or overly difficult vocabulary
- Use clear, simple language
- Make distractors plausible but distinguishable from the correct answer
- Test comprehension, not memorization

## How to Add a New Passage

### Step 1: Write the Content

1. Choose a topic appropriate for 8-year-olds
2. Write 150-200 words at Grade 2-3 reading level
3. Use clear paragraphs and proper punctuation
4. Include a beginning, middle, and end (for fiction)
5. Include interesting facts (for non-fiction)

### Step 2: Check Readability

Use these free tools:
- [Hemingway Editor](http://hemingwayapp.com/) - Target Grade 3
- [Readable.com](https://readable.com/) - Check Flesch-Kincaid score
- Word processor - Get accurate word count

### Step 3: Write Comprehension Questions

1. Write 2-3 questions testing different comprehension skills
2. Create three answer options per question
3. Mark the correct answer index (0, 1, or 2)
4. Test that questions are answerable from the passage

### Step 4: Add to Code

Add your passage to `src/data/content.ts`:

```typescript
{
  id: 'your-passage-id',
  title: "Your Passage Title",
  text: `Your passage text here...`,
  wordCount: 165,  // Exact count
  category: 'fiction',  // or 'non-fiction'
  difficulty: 'medium',  // 'easy', 'medium', or 'hard'
  questions: [
    {
      question: "Your first question?",
      options: ["Option A", "Option B", "Option C"],
      correctIndex: 0,  // 0, 1, or 2
    },
    {
      question: "Your second question?",
      options: ["Option A", "Option B", "Option C"],
      correctIndex: 1,
    },
    {
      question: "Your third question?",
      options: ["Option A", "Option B", "Option C"],
      correctIndex: 2,
    },
  ]
},
```

### Step 5: Test Your Passage

1. Run `npm run dev` to start the development server
2. Navigate to the Reading Race activity
3. Refresh multiple times to eventually see your passage (random selection)
4. Read through the passage for typos or errors
5. Answer the questions to verify they work correctly
6. Verify the word count results in reasonable WPM calculations

## Content Review Process

Before adding content to production:

1. **Self-Review Checklist:**
   - [ ] Word count is 150-200 words
   - [ ] Reading level is Grade 2-3
   - [ ] Content is age-appropriate
   - [ ] No typos or grammatical errors
   - [ ] 2-3 comprehension questions included
   - [ ] Questions are answerable from text
   - [ ] All technical fields filled in correctly

2. **Test with Target Audience (if possible):**
   - Have an 8-year-old read the passage
   - Note any difficult words or concepts
   - Check comprehension question accuracy
   - Gather feedback on engagement level

3. **Final Technical Test:**
   - Verify passage displays correctly
   - Test all answer options
   - Confirm WPM calculation is reasonable
   - Check for console errors

## AI-Assisted Content Creation

You may use AI tools (Claude, ChatGPT, etc.) to help create passages:

### Recommended Prompt Template

```
Write a [fiction/non-fiction] reading passage for 8-year-old children about [topic].

Requirements:
- 170 words (exact)
- Grade 2-3 reading level (Flesch-Kincaid)
- Clear paragraphs with proper punctuation
- Engaging and age-appropriate
- [For fiction: Beginning, middle, end with a positive message]
- [For non-fiction: Interesting facts presented clearly]

Also create 3 comprehension questions:
- 1 literal (stated in text)
- 1 inferential (reading between the lines)
- 1 connection (personal response)

Each question should have 3 answer options with one correct answer.
```

**IMPORTANT:** Always review and edit AI-generated content for:
- Accuracy (especially for non-fiction)
- Age-appropriateness
- Reading level
- Cultural sensitivity
- Quality and engagement

## Expansion Plans

### Sprint 2 Goals (10-15 total passages)
- Add 4-9 more passages
- Include more diverse topics
- Add difficulty variety (some 'easy' and some 'hard')
- Consider seasonal or themed collections

### Future Enhancements
- Passage categories (animals, science, stories, history)
- User ability to choose passage or category
- Progress tracking per passage
- Favorite passages feature
- Parent/teacher ability to add custom passages

## Frequently Asked Questions

### Q: Can passages be longer than 200 words?
A: Try to stay within 150-200 words. Longer passages take too long for the target age group and may cause fatigue.

### Q: Can I adapt copyrighted stories?
A: Only use public domain content (70+ years old) or create original content. For classic stories, completely rewrite in your own words.

### Q: How do I test the readability level?
A: Use the Hemingway Editor (free online tool) and aim for Grade 3 or below. Most word processors also have readability statistics.

### Q: What if my question has two possible correct answers?
A: Rewrite the question or options to make only one clearly correct. Questions should be unambiguous.

### Q: Can I include illustrations or images?
A: Currently, the app only supports text. Images may be added in future versions.

### Q: How do I calculate the exact word count?
A: Use a word processor's word count feature, or paste into [WordCounter.net](https://wordcounter.net/). Count carefully as this affects WPM calculation.

## Resources

### Readability Tools
- [Hemingway Editor](http://hemingwayapp.com/) - Free readability checker
- [Readable.com](https://readable.com/) - Flesch-Kincaid scores
- [WordCounter.net](https://wordcounter.net/) - Word counting

### Content Inspiration
- [Aesop's Fables](https://www.gutenberg.org/ebooks/11339) - Public domain stories
- [National Geographic Kids](https://kids.nationalgeographic.com/) - Non-fiction topics
- [ReadWorks](https://www.readworks.org/) - Grade-level passages (for reference)

### Educational Standards
- [Common Core Reading Standards - Grade 2](http://www.corestandards.org/ELA-Literacy/RL/2/)
- [Common Core Reading Standards - Grade 3](http://www.corestandards.org/ELA-Literacy/RL/3/)

## Version History

- **Version 1.0** (2025-11-09): Initial content guidelines created for Sprint 1
- 6 passages created (4 fiction, 2 non-fiction)
- Reading level: Grade 2-3
- Word count range: 150-200 words

---

*For technical questions about implementing content, see the TypeScript interfaces in `src/types.ts` and examples in `src/data/content.ts`.*
