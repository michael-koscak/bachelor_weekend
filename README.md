# Secure The Bag 💰

A slot machine RSVP web app for Kozy's Bachelor Party at Powers Lake, Illinois.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your `.env` file:
   ```bash
   cp .env.example .env
   ```

3. (Optional) Add your EmailJS credentials to `.env` for email functionality.
   Without them, the app still works - RSVP data just logs to console.

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5173

## EmailJS Setup (5 minutes)

To actually send RSVP emails to mkoscak23@gmail.com (with CC to the guest):

1. Create account at https://www.emailjs.com (free tier = 200 emails/month)
2. Go to "Email Services" → Add New Service → Connect your Gmail
3. Go to "Email Templates" → Create New Template with:
   - **To:** `{{to_email}}`
   - **CC:** `{{from_email}}`
   - **Reply-To:** `{{from_email}}`
   - **Subject:** `🎰 RSVP: {{from_name}} is IN for Kozy's Bachelor Party`
   - **Body:**
     ```
     BAG SECURED 💰

     {{from_name}} has RSVP'd!

     Dates Attending: {{dates}}
     Email: {{from_email}}
     Phone: {{phone}}
     T-Shirt Size: {{tshirt_size}}
     Dietary Restrictions: {{dietary}}
     Party Readiness Level: {{party_level}}/10
     Won the Slots: {{won_game}}
     ```
4. Copy your Service ID, Template ID, and Public Key to `.env`

## Spin Sequence

The slot machine has 5 predetermined spins:
1. 💀 🏖️ ☀️ - No match
2. 💨 💨 🍄 - Near miss! (2 match)
3. 😊 🎉 🍻 - No match  
4. ☀️ ☀️ 🥳 - Near miss! (2 match)
5. ❤️ ❤️ ❤️ - **WIN!** Epic celebration!

## Deployment

### Vercel (Easiest)
1. Push code to GitHub
2. Go to vercel.com → Import project
3. Add environment variables in Vercel dashboard
4. Deploy (automatic)

### Netlify
1. Push to GitHub
2. Connect repo at netlify.com
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add env vars in site settings

## Tech Stack

- React 18 + Vite
- TypeScript
- Tailwind CSS
- EmailJS (client-side email)
- canvas-confetti

## License

MIT
