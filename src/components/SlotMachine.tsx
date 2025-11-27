import { useState, useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'
import Reel from './Reel'
import { Symbol, SPIN_SEQUENCE } from '../types'
import { playSpinSound, playWinSound, playDangitSound } from '../lib/sounds'

interface SlotMachineProps {
  onGameEnd: (won: boolean) => void
}

const MAX_SPINS = 5

export default function SlotMachine({ onGameEnd }: SlotMachineProps) {
  const [currentSpin, setCurrentSpin] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [reelResults, setReelResults] = useState<Symbol[]>(['💰', '💰', '💰'])
  const [message, setMessage] = useState<string | null>(null)
  const [hasWon, setHasWon] = useState(false)
  const [winningReels, setWinningReels] = useState<boolean[]>([false, false, false])
  const [showWinScreen, setShowWinScreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const stoppedReelsRef = useRef(0)

  const spinsLeft = MAX_SPINS - currentSpin

  const spin = useCallback(() => {
    if (isSpinning || currentSpin >= MAX_SPINS || hasWon) return

    setIsSpinning(true)
    stoppedReelsRef.current = 0
    setMessage(null)
    setWinningReels([false, false, false])
    
    playSpinSound()

    // Use predetermined spin sequence
    const results = SPIN_SEQUENCE[currentSpin]
    setReelResults(results)
    setCurrentSpin(prev => prev + 1)
  }, [isSpinning, currentSpin, hasWon])

  const handleReelStop = useCallback((_index: number) => {
    stoppedReelsRef.current += 1
    
    if (stoppedReelsRef.current === 3) {
      setTimeout(() => {
        setIsSpinning(false)
        checkResult()
      }, 100)
    }
  }, [currentSpin])

  const checkResult = () => {
    const results = SPIN_SEQUENCE[currentSpin - 1]
    const [r1, r2, r3] = results
    const isWin = r1 === r2 && r2 === r3

    if (isWin) {
      // WIN!
      setHasWon(true)
      setWinningReels([true, true, true])
      playWinSound()
      setMessage('❤️ BAG SECURED! ❤️')

      // Shake screen
      containerRef.current?.classList.add('shake')
      setTimeout(() => {
        containerRef.current?.classList.remove('shake')
      }, 500)

      // Epic confetti burst
      const duration = 3000
      const animationEnd = Date.now() + duration
      const colors = ['#FFD700', '#00FF88', '#FF69B4', '#FF0000', '#FFFFFF']

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        })
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        })

        if (Date.now() < animationEnd) {
          requestAnimationFrame(frame)
        }
      }
      frame()

      // Also burst from center
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: colors
      })

      // Show win screen after a moment
      setTimeout(() => {
        setShowWinScreen(true)
      }, 1500)

      // Proceed to RSVP after celebration
      setTimeout(() => {
        onGameEnd(true)
      }, 4000)
    } else {
      // Play dangit sound on non-winning spins (not the final spin)
      if (currentSpin < MAX_SPINS) {
        playDangitSound()
      }

      // Check for near miss (2 matching)
      if (r1 === r2 || r2 === r3 || r1 === r3) {
        setMessage('🔥 SO CLOSE! 🔥')
        setTimeout(() => setMessage(null), 1500)
      }

      // Check if out of spins (shouldn't happen with our sequence, but just in case)
      if (currentSpin >= MAX_SPINS) {
        setMessage("The bag slipped away... but you're still in!")
        setTimeout(() => {
          onGameEnd(false)
        }, 2500)
      }
    }
  }

  return (
    <div ref={containerRef} className="w-full max-w-[500px] fade-up relative">
      {/* Win overlay */}
      {showWinScreen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 rounded-2xl animate-pulse">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🎉🏆🎉</div>
            <h2 className="font-outfit font-extrabold text-4xl text-gold uppercase tracking-wide animate-pulse">
              WINNER!
            </h2>
            <p className="text-2xl text-electric-green mt-2">You secured the bag!</p>
            <div className="text-4xl mt-4">❤️❤️❤️</div>
          </div>
        </div>
      )}

      <h2 className="font-outfit font-bold text-2xl md:text-3xl text-center uppercase tracking-wide text-gold mb-6">
        Secure The Bag 💰
      </h2>

      {/* Slot Machine Frame */}
      <div 
        className="relative p-1 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #FFD700 0%, #00FF88 50%, #FFD700 100%)'
        }}
      >
        <div className="bg-background rounded-xl p-4 md:p-6">
          {/* Reels Container */}
          <div className="flex gap-2 md:gap-3 mb-4">
            {[0, 1, 2].map((index) => (
              <Reel
                key={index}
                targetSymbol={reelResults[index]}
                isSpinning={isSpinning}
                stopDelay={2000 + index * 300}
                onStop={() => handleReelStop(index)}
                isWinning={winningReels[index]}
              />
            ))}
          </div>

          {/* Message Display */}
          <div className="h-8 flex items-center justify-center mb-4">
            {message && (
              <p className={`font-outfit font-bold text-lg uppercase tracking-wide ${
                message.includes('BAG SECURED') 
                  ? 'text-electric-green animate-pulse' 
                  : message.includes('CLOSE') 
                    ? 'text-gold' 
                    : 'text-muted'
              }`}>
                {message}
              </p>
            )}
          </div>

          {/* Spin Button */}
          <button
            onClick={spin}
            disabled={isSpinning || hasWon || spinsLeft <= 0}
            className={`
              w-full py-4 rounded-xl font-outfit font-bold text-xl uppercase tracking-wide
              transition-all duration-200 min-h-[56px]
              ${isSpinning || hasWon || spinsLeft <= 0
                ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-gold via-yellow-500 to-gold text-black hover:scale-[1.02] active:scale-[0.98] gold-glow'
              }
            `}
          >
            {isSpinning ? 'Spinning...' : hasWon ? '🎉 You Won!' : 'SPIN'}
          </button>

          {/* Spins Counter */}
          <div className="mt-4 text-center">
            <p className="text-muted font-medium tabular-nums">
              Spins Left: <span className={spinsLeft <= 1 ? 'text-red-400' : 'text-gold'}>{spinsLeft}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
