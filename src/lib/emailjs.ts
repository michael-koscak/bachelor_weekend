import emailjs from '@emailjs/browser'
import { RSVPData } from '../types'

// Initialize EmailJS with public key
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
if (publicKey) {
  emailjs.init(publicKey)
}

export const sendRSVP = async (data: RSVPData): Promise<void> => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID

  // If EmailJS isn't configured, log and continue (for testing)
  if (!serviceId || !templateId || !publicKey) {
    console.log('EmailJS not configured. RSVP data:', data)
    console.log('To enable email sending, add your EmailJS credentials to .env')
    // Simulate network delay for testing
    await new Promise(resolve => setTimeout(resolve, 1000))
    return
  }

  const templateParams = {
    to_email: 'mkoscak23@gmail.com',
    from_name: data.name,
    from_email: data.email,
    reply_to: data.email,
    phone: data.phone || 'Not provided',
    dates: data.dates.join(', '),
    dietary: data.dietary || 'None',
    party_level: data.partyLevel,
    tshirt_size: data.tshirtSize,
    won_game: data.wonGame ? 'Yes 🎰' : 'No'
  }

  await emailjs.send(serviceId, templateId, templateParams)
}
