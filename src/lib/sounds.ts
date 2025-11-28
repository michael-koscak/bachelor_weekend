// Sound effects with preloading for better mobile performance

// Preload audio files
const audioCache: { [key: string]: HTMLAudioElement } = {}

const preloadAudio = (src: string): HTMLAudioElement => {
  if (!audioCache[src]) {
    const audio = new Audio(src)
    audio.preload = 'auto'
    // Load the audio
    audio.load()
    audioCache[src] = audio
  }
  return audioCache[src]
}

// Preload all sounds on module load
if (typeof window !== 'undefined') {
  preloadAudio('/load.wav')
  preloadAudio('/loser.wav')
  preloadAudio('/spin.wav')
  preloadAudio('/jackpot.wav')
}

const playSound = (src: string, volume = 0.5) => {
  try {
    // Clone the cached audio to allow overlapping plays
    const cached = preloadAudio(src)
    const audio = cached.cloneNode() as HTMLAudioElement
    audio.volume = volume
    audio.play().catch(() => {
      // Audio play failed - that's ok
    })
  } catch (e) {
    // Audio not available, fail silently
  }
}

export const playLoadSound = () => {
  playSound('/load.wav')
}

export const playLoserSound = () => {
  playSound('/loser.wav')
}

export const playSpinSound = () => {
  playSound('/spin.wav')
}

export const playWinSound = () => {
  playSound('/jackpot.wav')
}
