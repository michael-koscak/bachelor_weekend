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
    // Use Web Audio API for a simple win chime
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    
    // Play a simple ascending arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime)
      
      const startTime = audioContext.currentTime + i * 0.1
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + 0.3)
    })
  } catch (e) {
    // Audio not available, fail silently
  }
}
