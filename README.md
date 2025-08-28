# ALX Polly - Interactive Polling Application

ALX Polly is a modern, interactive polling application built with Next.js and Shadcn UI. It allows users to create, share, and vote on polls with a clean, responsive interface.

## Features

- **User Authentication**: Register, login, and manage user profiles
- **Poll Creation**: Create custom polls with multiple options and optional expiration dates
- **Poll Management**: View, edit, and delete your created polls
- **Voting System**: Vote on polls with real-time results
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **UI Components**: Shadcn UI (built on Radix UI)
- **Styling**: Tailwind CSS
- **Authentication**: Custom auth implementation (placeholder for future integration)
- **API**: Next.js API Routes (placeholders for future backend integration)

## Project Structure

```
alx-polly/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Authentication routes
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── (main)/             # Main application routes
│   │   ├── polls/          # Poll listing and details
│   │   └── my-polls/       # User's created polls
│   ├── api/                # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── polls/          # Poll management endpoints
│   │   └── user/           # User profile endpoints
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── auth/               # Authentication components
│   ├── layout/             # Layout components (navbar, footer)
│   ├── polls/              # Poll-related components
│   └── ui/                 # Shadcn UI components
├── contexts/               # React contexts
│   └── auth-context.tsx    # Authentication context
├── data/                   # Mock data (for development)
├── lib/                    # Utility functions
├── public/                 # Static assets
└── types/                  # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/alx-polly.git
   cd alx-polly
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Current State

This project is currently in development with placeholder implementations:

- Authentication uses client-side storage (localStorage) for demonstration
- Poll data is stored in memory using mock data
- API routes are implemented as placeholders for future backend integration

## Future Enhancements

- Database integration (MongoDB, PostgreSQL, etc.)
- Real authentication with JWT or OAuth
- Real-time updates with WebSockets
- Advanced poll features (multiple choice, image options, etc.)
- Analytics dashboard for poll creators

## License

This project is licensed under the MIT License - see the LICENSE file for details.
