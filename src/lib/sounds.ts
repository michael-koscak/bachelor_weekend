// Sound effects using audio files

export const playSpinSound = () => {
  try {
    const audio = new Audio('/spin.wav')
    audio.volume = 0.5
    audio.play().catch(() => {
      // Audio play failed - that's ok
    })
  } catch (e) {
    // Audio not available, fail silently
  }
}

export const playDangitSound = () => {
  try {
    const audio = new Audio('/dangit.wav')
    audio.volume = 0.5
    audio.play().catch(() => {
      // Audio play failed - that's ok
    })
  } catch (e) {
    // Audio not available, fail silently
  }
}

export const playWinSound = () => {
  try {
    const audio = new Audio('/jackpot.wav')
    audio.volume = 0.5
    audio.play().catch(() => {
      // Audio play failed - that's ok
    })
  } catch (e) {
    // Audio not available, fail silently
  }
}
