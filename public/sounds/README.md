# Sound Effects for WordRush

This directory should contain the following sound effect files:

## Required Sound Files

1. **coin.mp3** - Coin collection sound (short, 0.5s, cheerful cha-ching)
2. **correct.mp3** - Correct answer sound (positive, 0.8s, success chime)
3. **wrong.mp3** - Wrong answer sound (gentle, 0.6s, soft buzz - NOT scary)
4. **badge.mp3** - Badge unlock sound (celebration, 1.5s, fanfare)
5. **purchase.mp3** - Item purchase sound (success, 1s, level up sound)
6. **start.mp3** - Activity start sound (encouraging, 0.7s, ready-go sound)

## Where to Get Free Sound Effects

### Recommended Free Sound Libraries:

1. **Pixabay Sound Effects** - https://pixabay.com/sound-effects/
   - License: Free for commercial use
   - Quality: High
   - Variety: Excellent

2. **Freesound.org** - https://freesound.org/
   - License: Creative Commons (check individual licenses)
   - Quality: Variable
   - Variety: Huge library

3. **Mixkit** - https://mixkit.co/free-sound-effects/
   - License: Free
   - Quality: Professional
   - Variety: Good selection

### Specific Sound Suggestions:

- **Coin:** Search for "coin pickup", "cash register", or "cha-ching"
- **Correct:** Search for "success bell", "positive chime", or "victory sound"
- **Wrong:** Search for "gentle buzz", "soft error", or "oops sound" (make sure it's NOT scary)
- **Badge:** Search for "achievement unlock", "fanfare", or "celebration"
- **Purchase:** Search for "purchase success", "unlock sound", or "level up"
- **Start:** Search for "game start", "ready go", or "begin sound"

## Audio Optimization

After downloading, optimize the files using these settings:

- **Format:** MP3
- **Bitrate:** 128 kbps
- **Sample rate:** 44.1 kHz
- **Channels:** Mono (not stereo) to reduce size
- **Target size:** Under 100KB each

### Using FFmpeg to optimize (if available):

```bash
# Convert to MP3 and compress
ffmpeg -i input.wav -b:a 128k -ar 44100 -ac 1 output.mp3

# Trim silence from start/end
ffmpeg -i input.mp3 -af silenceremove=1:0:-50dB output.mp3

# Normalize volume (0.5 = 50% volume)
ffmpeg -i input.mp3 -af "volume=0.5" output.mp3
```

## Important Guidelines

- Sounds should be **kid-friendly** (not scary, harsh, or startling)
- Keep sounds **cheerful and encouraging**
- Test volume levels with children to ensure they're appropriate
- All sounds should be **short** to avoid overlap issues
- Sounds should **enhance** the experience, not distract from it

## Fallback Behavior

The app will work even if sound files are missing. The sound manager will:
- Gracefully handle missing files
- Log warnings in the console
- Continue to function normally
- Respect the mute setting in parent settings

## Testing

After adding the sound files:

1. Test each sound individually
2. Ensure no overlap or distortion
3. Check volume levels are consistent
4. Test mute toggle functionality
5. Verify sounds work across browsers (Chrome, Safari, Firefox)
