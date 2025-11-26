# Secure the Bag - Slot Machine RSVP App

## Cursor Prompt

Build a slot machine RSVP web app for a bachelor party. Theme is "Secure the Bag" - money bags, luxury vibes, Vegas energy.

## Tech Stack
- React 18 + Vite
- TypeScript
- Tailwind CSS
- EmailJS for sending RSVP data (no backend needed)
- Firebase Hosting for deployment (or Vercel/Netlify)
- Single page app, no routing needed

## Game Flow

1. **Landing screen**: Title "SECURE THE BAG 💰" with subtitle showing groom's name, date, and location. Sleek "PULL THE LEVER" button with glow effect.

2. **Slot machine**: 3 reels appear. Symbols: 💰 💎 🎰 ❄️ 💵 🃏 👑

3. **Gameplay**: Player gets 5 free spins. Spin button triggers animation (reels spin for 1.5s with easing).

4. **Win state**: If 3 matching symbols → "BAG SECURED" celebration with confetti, unlock RSVP form

5. **Lose state**: If spins run out without winning → "The bag slipped away... but you're still in" → unlock RSVP form anyway (everyone should be able to RSVP)

6. **RSVP form** collects:
   - Name (required)
   - Email (required) - they will be CC'd on confirmation
   - Phone
   - **Dates Attending** (checkboxes, select all that apply):
     - [ ] Thursday, April 30
     - [ ] Friday, May 1
     - [ ] Saturday, May 2
   - Dietary restrictions (text)
   - "How ready are you to party?" slider (1-10)

7. **Confirmation**: On submit → send email via EmailJS (to host + CC to guest) → show success screen with checkmark animation and message "You're locked in. The bag awaits. 💰" plus a summary of what they submitted

## Slot Machine Mechanics

- 3 reels side by side, each displays 1 symbol at a time
- Spin animation: symbols cycle rapidly then decelerate with easing (authentic slot feel)
- Staggered stop: each reel stops 0.3s after the previous (left → right) for suspense
- Win condition: 3 matching symbols (any symbol)
- Near-miss: if 2 match, flash "SO CLOSE" text briefly
- Subtle sound effects using Web Audio API: soft spin whoosh, satisfying win chime (keep it classy)

## Visual Design - THIS IS CRITICAL

**MOBILE FIRST**: This app will be used by people at a party on their phones. Design for iPhone/Android first, desktop second. Everything must be thumb-friendly and work perfectly on a 375px wide screen.

### Color Palette
- Background: Deep black (#09090b) with subtle gradient to dark purple (#1a0a2e)
- Primary accent: Gold (#FFD700)
- Secondary accent: Electric green (#00FF88)
- Text: White (#FAFAFA) and muted gray (#A1A1AA)

### Typography
- Headers: "Outfit" font, weight 800, uppercase, letter-spacing wide
- Body: "Inter" font, clean and readable
- Import from Google Fonts

### Slot Machine Design
- Large, centered slot machine frame (max-width 500px, width: 90vw on mobile)
- Frame has luxurious gradient border (gold → green → gold)
- Subtle inner shadow to create depth
- Reels have dark background (#18181b) with rounded corners
- Each reel has slight inset shadow for 3D depth
- Symbols are 80px on mobile, 72px minimum - must be clearly visible
- Reel containers should be tall enough for smooth scroll animation
- Thin separator lines between reels
- Spin button: full width below reels, large and easy to tap (56px height minimum)

### Animations & Polish
- Lever/button has magnetic hover effect (slight scale + glow intensifies)
- Button press has satisfying depression animation
- Reels have motion blur effect during spin (CSS filter or opacity layers)
- Winning symbols pulse with gold glow
- Background has subtle floating particles (small dots drifting upward, very subtle)
- Confetti on win: use canvas-confetti library, gold and green colors
- All transitions should be smooth (300ms ease-out default)

### Layout - MOBILE FIRST (CRITICAL)
This will primarily be used on phones. Design for mobile first, then scale up.

- **Viewport**: Full viewport height (100dvh), no scrolling during game
- **Touch targets**: All buttons minimum 48px height, easy to tap
- **Slot machine**: Takes up ~60% of screen height on mobile, centered
- **Reels**: Large enough to see clearly (min 80px symbol size on mobile)
- **Spacing**: Use safe-area-inset for notched phones
- **Form**: Single column, large inputs (min 48px height), comfortable thumb typing
- **No hover states required**: All interactions work with tap
- **Orientation**: Portrait optimized, but don't break on landscape
- **Test on**: iPhone SE (small), iPhone 14 Pro (notch), Android (various)

Desktop: content stays centered in max-width container (500px), generous padding

### RSVP Form Design
- Clean card with subtle border and background (#18181b)
- **Mobile-optimized inputs**:
  - Full width inputs
  - 48px minimum height for all form elements
  - 16px+ font size (prevents iOS zoom on focus)
  - Generous padding inside inputs (12px+)
- Floating labels or clean placeholder text
- Custom styled inputs with gold focus ring
- Slider should be custom styled (gold track, green thumb), easy to drag on touch
- Date checkboxes: large tap targets, custom styled with gold checkmarks
- Submit button: full width, 56px height, matches main CTA style
- Form appears with fade-up animation after game ends
- Keyboard handling: form should scroll into view when keyboard opens

## File Structure

```
/src
  /components
    LandingScreen.tsx
    SlotMachine.tsx
    Reel.tsx
    RSVPForm.tsx
    SuccessScreen.tsx
    ParticleBackground.tsx
  /hooks
    useSlotMachine.ts
    useEmailJS.ts
  /lib
    emailjs.ts
    sounds.ts
  /types
    index.ts
  App.tsx
  main.tsx
  index.css
/public
  favicon.ico
vite.config.ts
tailwind.config.js
postcss.config.js
package.json
README.md
.env.example
```

## EmailJS Configuration

EmailJS lets you send emails directly from the client - no backend needed. The host gets the RSVP details, and the guest gets CC'd as confirmation.

### Setup Steps (do this before deploying)
1. Go to https://www.emailjs.com/ and create free account
2. Add an email service (Gmail works great)
3. Create an email template with these variables:
   - `{{from_name}}` - guest's name
   - `{{from_email}}` - guest's email  
   - `{{phone}}` - guest's phone
   - `{{dates}}` - dates attending (formatted string)
   - `{{dietary}}` - dietary restrictions
   - `{{party_level}}` - party readiness 1-10
   - `{{won_game}}` - whether they won the slots
4. In template settings, set Reply To: `{{from_email}}`
5. In template settings, add CC: `{{from_email}}` (so guest gets copy)
6. Copy your Service ID, Template ID, and Public Key

### .env.example
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_HOST_EMAIL=your-email@example.com
```

### emailjs.ts
```typescript
import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

interface RSVPData {
  name: string;
  email: string;
  phone?: string;
  dates: string[];
  dietary?: string;
  partyLevel: number;
  wonGame: boolean;
}

export const sendRSVP = async (data: RSVPData) => {
  const templateParams = {
    to_email: import.meta.env.VITE_HOST_EMAIL,
    from_name: data.name,
    from_email: data.email,
    phone: data.phone || 'Not provided',
    dates: data.dates.join(', '),
    dietary: data.dietary || 'None',
    party_level: data.partyLevel,
    won_game: data.wonGame ? 'Yes 🎰' : 'No'
  };

  return emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    templateParams
  );
};
```

### Email Template Example (in EmailJS dashboard)
Subject: `🎰 RSVP: {{from_name}} is IN for the Bachelor Party`

Body:
```
BAG SECURED 💰

{{from_name}} has RSVP'd!

Dates Attending: {{dates}}
Email: {{from_email}}
Phone: {{phone}}
Dietary Restrictions: {{dietary}}
Party Readiness Level: {{party_level}}/10
Won the Slots: {{won_game}}

---
This RSVP was submitted via Secure The Bag
```

## Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx"
  }
}
```

## Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@emailjs/browser": "^4.1.0",
    "canvas-confetti": "^1.9.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/canvas-confetti": "^1.6.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  }
}
```

## README.md Content

Include these sections:

### Local Development
1. `npm install`
2. Copy `.env.example` to `.env`
3. Add your EmailJS credentials (see EmailJS Setup below)
4. `npm run dev`
5. Open http://localhost:5173

### EmailJS Setup (5 minutes)
1. Create account at https://www.emailjs.com (free tier = 200 emails/month)
2. Go to "Email Services" → Add New Service → Connect your Gmail
3. Go to "Email Templates" → Create New Template
4. Use this template:
   - To: `{{to_email}}`
   - CC: `{{from_email}}`
   - Subject: `🎰 RSVP: {{from_name}} is IN`
   - Body: (see template in code comments)
5. Go to "Account" → Copy your Public Key
6. Add Service ID, Template ID, and Public Key to your `.env` file

### Deployment Options

**Option A: Vercel (Easiest)**
1. Push code to GitHub
2. Go to vercel.com → Import project
3. Add environment variables in Vercel dashboard
4. Deploy (automatic)

**Option B: Firebase Hosting**
1. `npm install -g firebase-tools`
2. `firebase login`
3. `firebase init hosting` (use `dist` as public dir, configure as SPA)
4. `npm run build`
5. `firebase deploy`

**Option C: Netlify**
1. Push to GitHub
2. Connect repo at netlify.com
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add env vars in site settings

## Additional Polish

- **Success Screen**: After RSVP submits successfully, show a dedicated success screen with:
  - Animated checkmark (green, draws itself)
  - "You're locked in. The bag awaits. 💰" 
  - Summary card showing: their name, dates they selected, and "Confirmation sent to {email}"
  - "Spin Again" button for fun (doesn't resend RSVP)
- Easter egg: Getting 3 of the rare symbol (👑) shows "The king has arrived" message
- Subtle screen shake on big win
- Numbers in UI should use tabular-nums font feature for alignment
- Loading states for form submission (button shows spinner, disable form)
- Error handling: if email fails, show error toast with "Try again" button
- Form has client-side validation with helpful error messages
- Date checkboxes should have custom styling matching the theme (gold checkmarks)
- At least one date must be selected to submit

## Quality Checklist
- [ ] **MOBILE FIRST**: Test on real phone before desktop
- [ ] Works on iOS Safari (most common at parties)
- [ ] Works on Android Chrome
- [ ] Touch targets are 48px+ (easy to tap)
- [ ] No horizontal scroll on any screen size
- [ ] Form inputs don't zoom on focus (set font-size 16px+)
- [ ] Viewport uses 100dvh (not 100vh) for mobile browser chrome
- [ ] Safe area insets for notched phones
- [ ] Lighthouse score 90+ on performance
- [ ] No layout shift during animations
- [ ] Accessible: proper focus states, aria labels
- [ ] Smooth 60fps animations
- [ ] Works offline after initial load (service worker optional but nice)

Make this feel like a polished product, not a hackathon project. Every interaction should feel intentional and satisfying. Your drunk friends will be using this on their phones - it needs to just work.
