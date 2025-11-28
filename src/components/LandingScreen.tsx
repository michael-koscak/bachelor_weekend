import { playLoadSound } from '../lib/sounds'

interface LandingScreenProps {
  onStart: () => void
}

export default function LandingScreen({ onStart }: LandingScreenProps) {
  const handleStart = () => {
    // Play load sound on button click (works because it's user-initiated)
    playLoadSound()
    
    // Start the game
    onStart()
  }

  return (
    <div className="text-center fade-up max-w-[500px] w-full">
      <h1 className="font-outfit font-extrabold text-5xl md:text-7xl uppercase tracking-wider text-gold mb-4 drop-shadow-lg">
        Secure The Bag
      </h1>
      <p className="text-3xl mb-2">💰</p>
      
      <div className="mt-8 mb-12 space-y-2">
        <p className="text-xl md:text-2xl font-outfit font-semibold text-white">
          Kozy Bachelor Party
        </p>
        <p className="text-muted text-lg">
          April 30 - May 2, 2025
        </p>
        <p className="text-electric-green font-medium text-lg">
          Powers Lake, Illinois
        </p>
      </div>

      <button
        onClick={handleStart}
        className="w-full max-w-[320px] mx-auto block bg-gradient-to-r from-gold via-yellow-500 to-gold text-black font-outfit font-bold text-xl uppercase tracking-wide py-4 px-8 rounded-xl gold-glow hover:scale-105 active:scale-95 transition-all duration-200"
      >
        Pull The Lever 🎰
      </button>
      
      <p className="mt-6 text-muted text-sm">
        Spin to unlock your RSVP
      </p>
    </div>
  )
}
