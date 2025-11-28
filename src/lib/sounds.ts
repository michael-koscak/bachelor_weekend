// Sound effects with preloading for better mobile performance

// Audio elements cache
const audioElements: { [key: string]: HTMLAudioElement } = {}
let audioUnlocked = false

// Create and preload audio element
const createAudio = (src: string): HTMLAudioElement => {
  const audio = new Audio(src)
  audio.preload = 'auto'
  audio.load()
  return audio
}

// Initialize audio elements
if (typeof window !== 'undefined') {
  audioElements.load = createAudio('/load.wav')
  audioElements.loser = createAudio('/loser.wav')
  audioElements.spin = createAudio('/spin.wav')
  audioElements.jackpot = createAudio('/jackpot.wav')
}

// Unlock audio on mobile - call this on first user interaction
export const unlockAudio = () => {
  if (audioUnlocked) return
  
  // Play and immediately pause all audio to unlock them on mobile
  Object.values(audioElements).forEach(audio => {
    audio.volume = 0
    audio.play().then(() => {
      audio.pause()
      audio.currentTime = 0
      audio.volume = 0.5
    }).catch(() => {
      // Ignore errors
    })
  })
  
  audioUnlocked = true
}

const playSound = (key: string) => {
  try {
    const audio = audioElements[key]
    if (audio) {
      // Reset and play
      audio.currentTime = 0
      audio.volume = 0.5
      audio.play().catch(() => {
        // Audio play failed - that's ok
      })
    }
  } catch (e) {
    // Audio not available, fail silently
  }
}

export const playLoadSound = () => {
  playSound('load')
}

export const playLoserSound = () => {
  playSound('loser')
}

export const playSpinSound = () => {
  playSound('spin')
}

export const playWinSound = () => {
  playSound('jackpot')
}
