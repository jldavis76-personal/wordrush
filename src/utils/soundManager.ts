export type SoundType = 'coin' | 'correct' | 'wrong' | 'badge' | 'purchase' | 'start';

class SoundManager {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;
  private audioContext: AudioContext | null = null;
  private useFallbackBeeps: boolean = false;

  constructor() {
    // Preload all sounds
    const soundTypes: SoundType[] = ['coin', 'correct', 'wrong', 'badge', 'purchase', 'start'];

    soundTypes.forEach((type) => {
      try {
        const audio = new Audio(`/sounds/${type}.mp3`);
        audio.volume = this.volume;
        audio.preload = 'auto';

        // Listen for load errors to detect missing files
        audio.addEventListener('error', () => {
          console.warn(`Sound file /sounds/${type}.mp3 not found. Using fallback beeps.`);
          this.useFallbackBeeps = true;
        });

        audio.load();
        this.sounds.set(type, audio);
      } catch (error) {
        console.warn(`Failed to preload ${type} sound:`, error);
        this.useFallbackBeeps = true;
      }
    });

    // Initialize Web Audio API for fallback beeps
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not available:', error);
    }

    // Load sound preference from localStorage
    const stored = localStorage.getItem('wordrush_sound_enabled');
    this.enabled = stored !== null ? JSON.parse(stored) : true;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    localStorage.setItem('wordrush_sound_enabled', JSON.stringify(enabled));
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach((audio) => {
      audio.volume = this.volume;
    });
  }

  // Play fallback beep using Web Audio API
  private playFallbackBeep(type: SoundType) {
    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Different frequencies and durations for different sound types
      const soundConfig: Record<SoundType, { frequency: number; duration: number }> = {
        coin: { frequency: 800, duration: 0.1 },
        correct: { frequency: 600, duration: 0.15 },
        wrong: { frequency: 200, duration: 0.2 },
        badge: { frequency: 1000, duration: 0.3 },
        purchase: { frequency: 700, duration: 0.2 },
        start: { frequency: 500, duration: 0.1 },
      };

      const config = soundConfig[type];
      oscillator.frequency.value = config.frequency;
      oscillator.type = 'sine';

      // Fade out to avoid clicking
      gainNode.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + config.duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + config.duration);
    } catch (error) {
      console.warn(`Failed to play fallback beep for ${type}:`, error);
    }
  }

  play(type: SoundType) {
    if (!this.enabled) return;

    // Resume AudioContext if suspended (browser autoplay policy)
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch((error) => {
        console.warn('Failed to resume AudioContext:', error);
      });
    }

    const audio = this.sounds.get(type);
    if (!audio) {
      console.warn(`Sound ${type} not found in sound manager`);
      this.playFallbackBeep(type);
      return;
    }

    try {
      // Reset to start if already playing
      audio.currentTime = 0;

      // Play with error handling
      audio.play().catch((error) => {
        // If file is missing or can't play, use fallback beep
        if (this.useFallbackBeeps || error.name === 'NotSupportedError') {
          this.playFallbackBeep(type);
        } else if (error.name !== 'AbortError') {
          console.warn(`Failed to play ${type} sound:`, error.message);
          this.playFallbackBeep(type);
        }
      });
    } catch (error) {
      console.warn(`Error playing ${type} sound:`, error);
      this.playFallbackBeep(type);
    }
  }

  // For testing purposes
  getEnabled(): boolean {
    return this.enabled;
  }

  getVolume(): number {
    return this.volume;
  }
}

// Export singleton instance
export const soundManager = new SoundManager();
