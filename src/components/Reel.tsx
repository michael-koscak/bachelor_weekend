import { useEffect, useRef, useState } from 'react'
import { SYMBOLS, Symbol } from '../types'

interface ReelProps {
  targetSymbol: Symbol | null
  isSpinning: boolean
  stopDelay: number
  onStop: () => void
  isWinning: boolean
}

export default function Reel({ 
  targetSymbol, 
  isSpinning, 
  stopDelay, 
  onStop,
  isWinning 
}: ReelProps) {
  const [displaySymbol, setDisplaySymbol] = useState<Symbol>('💰')
  const [isStopping, setIsStopping] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (isSpinning) {
      setIsStopping(false)
      // Rapid symbol cycling during spin
      intervalRef.current = window.setInterval(() => {
        setDisplaySymbol(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)])
      }, 50)

      // Schedule stop
      timeoutRef.current = window.setTimeout(() => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setIsStopping(true)
        if (targetSymbol) {
          setDisplaySymbol(targetSymbol)
        }
        setTimeout(onStop, 300)
      }, stopDelay)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isSpinning, stopDelay, targetSymbol, onStop])

  return (
    <div className="flex-1 min-w-0">
      <div 
        className={`
          bg-card-bg rounded-lg h-[100px] md:h-[120px] flex items-center justify-center
          shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]
          transition-all duration-300
          ${isWinning ? 'win-pulse' : ''}
        `}
      >
        <span 
          className={`
            text-6xl md:text-7xl select-none
            ${isSpinning && !isStopping ? 'blur-[2px]' : ''}
            transition-all duration-200
          `}
        >
          {displaySymbol}
        </span>
      </div>
    </div>
  )
}

