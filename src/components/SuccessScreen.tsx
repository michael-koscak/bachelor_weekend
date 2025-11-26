import { RSVPData } from '../types'

interface SuccessScreenProps {
  data: RSVPData
  onPlayAgain: () => void
}

export default function SuccessScreen({ data, onPlayAgain }: SuccessScreenProps) {
  return (
    <div className="w-full max-w-[500px] text-center fade-up">
      {/* Animated Checkmark */}
      <div className="mb-6">
        <svg 
          className="w-24 h-24 mx-auto text-electric-green"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.3"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeDasharray="283"
            strokeDashoffset="283"
            style={{
              animation: 'drawCheck 0.6s ease-out forwards'
            }}
          />
          <path
            d="M30 50 L45 65 L70 35"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="draw-check"
          />
        </svg>
      </div>

      <h2 className="font-outfit font-bold text-3xl md:text-4xl uppercase tracking-wide text-gold mb-2">
        You're Locked In
      </h2>
      <p className="text-xl text-white mb-8">
        The bag awaits. 💰
      </p>

      {/* Summary Card */}
      <div className="bg-card-bg border border-zinc-800 rounded-xl p-4 md:p-6 text-left mb-6">
        <h3 className="font-outfit font-bold text-lg text-gold uppercase tracking-wide mb-4">
          Your RSVP
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-muted">Name</span>
            <span className="text-white font-medium">{data.name}</span>
          </div>
          
          <div className="flex justify-between items-start py-2 border-b border-zinc-800">
            <span className="text-muted">Dates</span>
            <span className="text-white font-medium text-right max-w-[200px]">
              {data.dates.map(d => d.replace(/, /g, '\n')).join('\n')}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-muted">T-Shirt Size</span>
            <span className="text-white font-medium">{data.tshirtSize}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-zinc-800">
            <span className="text-muted">Party Level</span>
            <span className="text-electric-green font-bold">{data.partyLevel}/10</span>
          </div>

          {data.wonGame && (
            <div className="flex justify-between items-center py-2 border-b border-zinc-800">
              <span className="text-muted">Slots Winner</span>
              <span className="text-gold">🎰 Yes!</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-800">
          <p className="text-muted text-sm">
            Confirmation sent to <span className="text-white">{data.email}</span>
          </p>
        </div>
      </div>

      {/* Play Again Button */}
      <button
        onClick={onPlayAgain}
        className="text-gold hover:text-yellow-300 font-medium transition-colors underline underline-offset-4"
      >
        Spin Again (just for fun)
      </button>
    </div>
  )
}
