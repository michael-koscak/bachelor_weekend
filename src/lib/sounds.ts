// Sound effects with preloading for mobile

// Preloaded audio elements (used as templates for cloning)
const audioCache: { [key: string]: HTMLAudioElement } = {}
let initialized = false

// Initialize and preload all audio
const initAudio = () => {
  if (initialized || typeof window === 'undefined') return
  
  const files = ['/load.wav', '/loser.wav', '/jackpot.wav']
  files.forEach(src => {
    const audio = new Audio(src)
    audio.preload = 'auto'
    audio.load()
    audioCache[src] = audio
  })
  
  initialized = true
}

// Initialize on module load
initAudio()

// Unlock audio on mobile - creates silent audio context
export const unlockAudio = () => {
  try {
    // Create and play a silent audio context to unlock mobile audio
    const AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext
    if (AudioContext) {
      const ctx = new AudioContext()
      const buffer = ctx.createBuffer(1, 1, 22050)
      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.connect(ctx.destination)
      source.start(0)
    }
  } catch (e) {
    // Ignore
  }
}

// Play a sound by cloning the preloaded audio
const playSound = (src: string, volume = 0.5) => {
  try {
    initAudio() // Ensure initialized
    
    const cached = audioCache[src]
    if (cached) {
      // Clone to allow overlapping plays and avoid state issues
      const audio = cached.cloneNode() as HTMLAudioElement
      audio.volume = volume
      audio.play().catch(() => {})
    } else {
      // Fallback: create new audio if not cached
      const audio = new Audio(src)
      audio.volume = volume
      audio.play().catch(() => {})
    }
  } catch (e) {
    // Audio not available
  }
}

export const playLoadSound = () => playSound('/load.wav')
export const playLoserSound = () => playSound('/loser.wav')
export const playWinSound = () => playSound('/jackpot.wav')
