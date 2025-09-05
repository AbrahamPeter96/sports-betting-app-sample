# Sports Betting Dashboard

A modern, responsive sports betting platform built with Next.js 14+, TypeScript, and Tailwind CSS. Features real-time odds, interactive betting slip, and seamless state management.

![Sports Betting Dashboard](https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## 🚀 Features

### Core Functionality

- **Real-time Sports Data**: Integration with TheSportsDB free API for live match information
- **Interactive Betting Slip**: Add/remove selections with real-time payout calculations
- **Persistent State Management**: Betting selections persist across navigation using React Context
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **SEO Optimized**: Complete meta tags, sitemap, and robots.txt configuration

### User Experience

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Live Odds Display**: Dynamic odds generation with realistic betting scenarios
- **Match Filtering**: Filter by league, status (live/upcoming), and sport type
- **Betting Calculations**: Automatic stake and payout calculations
- **Toast Notifications**: User feedback for all betting actions

### Technical Features

- **Next.js 14+**: Latest Next.js with App Router and TypeScript
- **API Routes**: RESTful API endpoint for bet submission
- **State Management**: React Context for global betting state
- **Component Architecture**: Modular, reusable components
- **Error Handling**: Graceful error handling with fallback data

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **API Integration**: TheSportsDB (Free Sports API)
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **Deployment**: Static export ready

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd sports-betting-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── submit-bet/           # Bet submission endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with providers
│   ├── page.tsx                  # Home page
│   ├── robots.ts                 # SEO robots configuration
│   └── sitemap.ts                # SEO sitemap generation
├── components/                   # React Components
│   ├── ui/                       # shadcn/ui components
│   ├── betting-slip.tsx          # Betting slip component
│   ├── header.tsx                # Navigation header
│   ├── hero-section.tsx          # Landing page hero
│   ├── match-card.tsx            # Individual match display
│   └── matches-section.tsx       # Matches grid container
├── lib/                          # Utilities and Context
│   ├── betting-context.tsx       # Global betting state
│   ├── sports-api.ts             # API integration layer
│   └── utils.ts                  # Utility functions
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎯 Key Components

### Betting Context (`lib/betting-context.tsx`)

Manages global betting state including:

- Selected matches and odds
- Stake amounts and calculations
- Betting slip visibility
- Total payouts and profits

### Sports API (`lib/sports-api.ts`)

Handles data fetching and transformation:

- TheSportsDB API integration
- Realistic odds generation
- Match status detection
- Fallback data system

### Match Card (`components/match-card.tsx`)

Interactive match display featuring:

- Team information and league details
- Clickable odds buttons
- Real-time selection feedback
- Match timing and status

### Betting Slip (`components/betting-slip.tsx`)

Comprehensive betting interface:

- Selected matches overview
- Stake input and validation
- Payout calculations
- Bet submission handling

## 🔌 API Integration

### TheSportsDB API

The application integrates with TheSportsDB's free API:

```typescript
// Fetch upcoming matches for a team
https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id={TEAM_ID}

// Fetch upcoming matches for a league
https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id={LEAGUE_ID}
```

### API Route: `/api/submit-bet`

POST endpoint for bet submission:

**Request Body:**

```json
{
  "selections": [
    {
      "matchId": "string",
      "match": { /* match object */ },
      "selection": "home" | "away" | "draw",
      "odds": number,
      "stake": number
    }
  ],
  "totalStake": number,
  "potentialPayout": number
}
```

**Response:**

```json
{
  "success": boolean,
  "betId": "string",
  "message": "string",
  "totalStake": number,
  "potentialPayout": number,
  "selections": [...],
  "timestamp": "string"
}
```
