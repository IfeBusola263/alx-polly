# ALX Polly - Interactive Polling Application

ALX Polly is a modern, interactive polling application built with Next.js and Shadcn UI. It allows users to create, share, and vote on polls with a clean, responsive interface.

## Features

- **User Authentication**: Register, login, and manage user profiles using Supabase authentication
- **Poll Creation**: Create custom polls with multiple options and optional expiration dates
- **Poll Management**: View, edit, and delete your created polls
- **Voting System**: Vote on polls with real-time results
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router, React, TypeScript
- **UI Components**: Shadcn UI (built on Radix UI)
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Authentication
- **Database**: Supabase PostgreSQL
- **API**: Next.js Server Actions for data mutations

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

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Development Configuration
PORT=3000                  # Default port for development server
NODE_ENV=development       # Application environment
```

To get your Supabase credentials:
1. Create a project at [Supabase](https://supabase.com)
2. Go to Project Settings > API
3. Copy the Project URL and anon/public key

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Supabase account

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

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Update the variables with your Supabase credentials

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Testing

The project uses Jest and React Testing Library for unit and integration tests. To run the tests:

```bash
# Run all tests
npm test

# Run tests in watch mode during development
npm test:watch

# Run tests with coverage report
npm test:coverage
```

### Writing Tests

Tests are located next to their corresponding components with the `.test.tsx` extension. Example:

```typescript
// components/polls/poll-card.test.tsx
import { render, screen } from '@testing-library/react'
import { PollCard } from './poll-card'

describe('PollCard', () => {
  it('renders poll title and options', () => {
    const mockPoll = {
      title: 'Test Poll',
      options: ['Option 1', 'Option 2']
    }
    render(<PollCard poll={mockPoll} />)
    expect(screen.getByText('Test Poll')).toBeInTheDocument()
  })
})
```

## Contributing

We welcome contributions to ALX Polly! Please follow these steps:

1. Check the [Issues](https://github.com/yourusername/alx-polly/issues) page for open tasks
2. Fork the repository
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Reference relevant issues in commits and PRs

### Need Help?

- Check our [Documentation](https://github.com/yourusername/alx-polly/wiki)
- Join our [Discord Community](https://discord.gg/alx-polly)
- Read our [Contributing Guide](https://github.com/yourusername/alx-polly/blob/main/CONTRIBUTING.md)

## Current State

This project is currently in development with placeholder implementations:
- API routes are implemented as placeholders for future backend integration

## Future Enhancements

- Database integration (MongoDB, PostgreSQL, etc.)
- Real authentication with JWT or OAuth
- Real-time updates with WebSockets
- Advanced poll features (multiple choice, image options, etc.)
- Analytics dashboard for poll creators

## Support

- 📝 [Documentation](https://github.com/yourusername/alx-polly/wiki)
- 🐛 [Issue Tracker](https://github.com/yourusername/alx-polly/issues)
- 💬 [Discord Community](https://discord.gg/alx-polly)
- 📊 [Project Roadmap](https://github.com/yourusername/alx-polly/projects)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
