import { useState, FormEvent } from 'react'
import { RSVPData, DATES, TSHIRT_SIZES } from '../types'
import { sendRSVP } from '../lib/emailjs'

interface RSVPFormProps {
  wonGame: boolean
  onSubmit: (data: RSVPData) => void
}

export default function RSVPForm({ wonGame, onSubmit }: RSVPFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedDates, setSelectedDates] = useState<string[]>([])
  const [dietary, setDietary] = useState('')
  const [partyLevel, setPartyLevel] = useState(7)
  const [tshirtSize, setTshirtSize] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const toggleDate = (date: string) => {
    setSelectedDates(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date]
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim() || !email.trim()) {
      setError('Please fill in your name and email')
      return
    }

    if (selectedDates.length === 0) {
      setError('Please select at least one date')
      return
    }

    if (!tshirtSize) {
      setError('Please select a t-shirt size')
      return
    }

    const data: RSVPData = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      dates: selectedDates,
      dietary: dietary.trim() || undefined,
      partyLevel,
      tshirtSize,
      wonGame
    }

    setIsSubmitting(true)

    try {
      await sendRSVP(data)
      onSubmit(data)
    } catch (err) {
      console.error('Failed to send RSVP:', err)
      setError('Failed to send RSVP. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-[500px] fade-up">
      <div className="text-center mb-6">
        <h2 className="font-outfit font-bold text-2xl md:text-3xl uppercase tracking-wide text-gold mb-2">
          {wonGame ? '🎉 Bag Secured!' : '💰 RSVP Time'}
        </h2>
        <p className="text-muted">
          {wonGame 
            ? "You're a winner! Lock in your spot."
            : "You're still invited to the party!"
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-card-bg border border-zinc-800 rounded-xl p-4 md:p-6 space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors min-h-[48px]"
            placeholder="Your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Email *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors min-h-[48px]"
            placeholder="you@email.com"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Phone (optional)
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors min-h-[48px]"
            placeholder="(555) 123-4567"
          />
        </div>

        {/* T-Shirt Size */}
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            T-Shirt Size *
          </label>
          <select
            value={tshirtSize}
            onChange={(e) => setTshirtSize(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors min-h-[48px] appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23A1A1AA'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '20px',
              paddingRight: '40px'
            }}
            required
          >
            <option value="" disabled>Select size</option>
            {TSHIRT_SIZES.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Dates Attending *
          </label>
          <div className="space-y-2">
            {DATES.map((date) => (
              <div
                key={date}
                onClick={() => toggleDate(date)}
                className={`custom-checkbox ${selectedDates.includes(date) ? 'checked' : ''}`}
              >
                <div className="checkbox-indicator">
                  {selectedDates.includes(date) && (
                    <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-white font-medium">{date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary */}
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            Dietary Restrictions
          </label>
          <input
            type="text"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base
                       focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                       transition-colors min-h-[48px]"
            placeholder="None, vegetarian, allergies, etc."
          />
        </div>

        {/* Party Level Slider */}
        <div>
          <label className="block text-sm font-medium text-muted mb-2">
            How ready are you to party? <span className="text-gold font-bold">{partyLevel}/10</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={partyLevel}
            onChange={(e) => setPartyLevel(Number(e.target.value))}
            className="w-full mt-2"
          />
          <div className="flex justify-between text-xs text-muted mt-1">
            <span>Chill</span>
            <span>Let's Go!</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg px-4 py-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            w-full py-4 rounded-xl font-outfit font-bold text-xl uppercase tracking-wide
            transition-all duration-200 min-h-[56px] mt-6
            ${isSubmitting
              ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-electric-green via-emerald-500 to-electric-green text-black hover:scale-[1.02] active:scale-[0.98] green-glow'
            }
          `}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Lock It In 💰"
          )}
        </button>
      </form>
    </div>
  )
}
