import { useState } from 'react'
import LandingScreen from './components/LandingScreen'
import SlotMachine from './components/SlotMachine'
import RSVPForm from './components/RSVPForm'
import SuccessScreen from './components/SuccessScreen'
import ParticleBackground from './components/ParticleBackground'
import { GameScreen, RSVPData } from './types'

function App() {
  const [screen, setScreen] = useState<GameScreen>('landing')
  const [wonGame, setWonGame] = useState(false)
  const [submittedData, setSubmittedData] = useState<RSVPData | null>(null)

  const handleStartGame = () => {
    setScreen('game')
  }

  const handleGameEnd = (won: boolean) => {
    setWonGame(won)
    setScreen('rsvp')
  }

  const handleRSVPSubmit = (data: RSVPData) => {
    setSubmittedData(data)
    setScreen('success')
  }

  const handlePlayAgain = () => {
    setScreen('game')
  }

  return (
    <div className="min-h-[100dvh] relative overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 safe-area-top safe-area-bottom">
        {screen === 'landing' && (
          <LandingScreen onStart={handleStartGame} />
        )}
        
        {screen === 'game' && (
          <SlotMachine onGameEnd={handleGameEnd} />
        )}
        
        {screen === 'rsvp' && (
          <RSVPForm 
            wonGame={wonGame} 
            onSubmit={handleRSVPSubmit} 
          />
        )}
        
        {screen === 'success' && submittedData && (
          <SuccessScreen 
            data={submittedData} 
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  )
}

export default App

