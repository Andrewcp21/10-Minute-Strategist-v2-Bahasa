# 10-Minute Strategist

A simulation game that trains users to think like a Social Media Strategist by creating strategic content pillar ideas and transforming them into a 5-day Instagram content calendar using real-time AI guidance.

## Features

- **Client Selection:** Choose from 3 fictional brands
- **Brand Brief:** Instagram-focused brand overview
- **Content Pillar Selection:** Choose 3-4 pillars with short descriptions
- **Idea Input:** Users provide strategic ideas per pillar (main idea + post format)
- **AI Suggestion Support:** Users can ask AI for help in idea generation
- **AI Calendar Generation:** AI creates a 5-day calendar from the input
- **Calendar Review:** Users view and optionally edit the proposed plan
- **Client Feedback:** AI-generated feedback from the client
- **10-minute Timer:** Countdown visible throughout the experience

## Tech Stack

- **Frontend:** React (Next.js), TailwindCSS
- **Backend:** Node.js with Next.js API routes
- **AI API:** OpenAI GPT-4
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```
3. Create a `.env.local` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

### Development

Run the development server:

```
npm run dev
```
or
```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production

```
npm run build
```
or
```
yarn build
```

## How to Play

1. Select a client from the three options
2. Review the brand brief
3. Click "Start Planning" to begin the 10-minute timer
4. Select 3-4 content pillars for the brand
5. For each pillar, provide a main idea and post format (use AI suggestions if needed)
6. Generate the content calendar
7. Review the 5-day calendar and make any edits if desired
8. Receive client feedback

## License

MIT
