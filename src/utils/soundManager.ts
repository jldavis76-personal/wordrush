export type SoundType = 'coin' | 'correct' | 'wrong' | 'badge' | 'purchase' | 'start';

class SoundManager {
  private sounds: Map<SoundType, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.5;

  constructor() {
    // Preload all sounds
    const soundTypes: SoundType[] = ['coin', 'correct', 'wrong', 'badge', 'purchase', 'start'];

    soundTypes.forEach((type) => {
      try {
        const audio = new Audio(`/sounds/${type}.mp3`);
        audio.volume = this.volume;
        audio.preload = 'auto';
        audio.load();
        this.sounds.set(type, audio);
      } catch (error) {
        console.warn(`Failed to preload ${type} sound:`, error);
      }
    });

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

  play(type: SoundType) {
    if (!this.enabled) return;

    const audio = this.sounds.get(type);
    if (!audio) {
      console.warn(`Sound ${type} not found in sound manager`);
      return;
    }

    try {
      // Reset to start if already playing
      audio.currentTime = 0;

      // Play with error handling
      audio.play().catch((error) => {
        // Don't log errors for missing files in production
        if (error.name !== 'NotSupportedError' && error.name !== 'AbortError') {
          console.warn(`Failed to play ${type} sound:`, error.message);
        }
      });
    } catch (error) {
      console.warn(`Error playing ${type} sound:`, error);
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
