# CodeSentinel Waitlist

> **Ship Secure. Scan Smarter.**

A modern, gamified waitlist landing page for CodeSentinel—an automated security scanning platform designed to help developers detect vulnerabilities, enforce policies, and ship secure code with confidence.

## 🎯 Overview

CodeSentinel Waitlist is a production-ready Next.js application that serves as the public-facing landing page for CodeSentinel's beta launch. The application features a sophisticated gamification system that incentivizes user referrals through a tiered rewards program, real-time position tracking, and seamless social sharing capabilities.

### Key Features

- **🎮 Gamified Waitlist System**: Referral-based positioning with tiered rewards
- **📊 Real-time Analytics**: Live waitlist count and position tracking
- **🔗 Social Sharing**: One-click sharing to Twitter, LinkedIn, Email, and native share APIs
- **🎨 Modern UI/UX**: Beautiful, responsive design with dark mode support
- **⚡ Performance Optimized**: Built with Next.js 16 and React 19 for optimal performance
- **🔒 Secure Backend**: Supabase-powered database with robust validation
- **📱 Mobile-First**: Fully responsive design optimized for all devices

## 🏗️ Architecture

### Tech Stack

- **Framework**: [Next.js 16.0.3](https://nextjs.org/) (App Router)
- **UI Library**: [React 19.2.0](https://react.dev/)
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives
- **Animations**: [Framer Motion 12.23.25](https://www.framer.com/motion/)
- **Backend**: [Supabase](https://supabase.com/) (PostgreSQL + Real-time)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)
- **Font**: [Geist](https://vercel.com/font) (Google Fonts)

### Project Structure

```
code-sentinel-waitlist/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with metadata & SEO
│   ├── page.tsx           # Main landing page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI primitives (Radix UI)
│   ├── hero-section.tsx   # Hero section with CTA
│   ├── features-section.tsx
│   ├── gamified-waitlist.tsx  # Main waitlist component
│   ├── waitlist-section.tsx   # Alternative waitlist UI
│   ├── dashboard-preview.tsx
│   ├── integrations-section.tsx
│   ├── market-reality-section.tsx
│   ├── testimonials-section.tsx
│   ├── navigation.tsx
│   ├── footer.tsx
│   └── ...
├── lib/                  # Utility functions & clients
│   ├── supabase-client.ts  # Supabase client configuration
│   └── utils.ts           # Shared utilities
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── styles/               # Additional stylesheets
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Supabase** account (for backend services)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-org/code-sentinel-waitlist.git
   cd code-sentinel-waitlist
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**

   Create a `waitlist_entries` table with the following schema:

   ```sql
   CREATE TABLE waitlist_entries (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email VARCHAR(255) UNIQUE NOT NULL,
     referral_code VARCHAR(20) UNIQUE NOT NULL,
     referred_by VARCHAR(20),
     referral_count INTEGER DEFAULT 0,
     position INTEGER NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create index for faster lookups
   CREATE INDEX idx_waitlist_email ON waitlist_entries(email);
   CREATE INDEX idx_waitlist_referral_code ON waitlist_entries(referral_code);
   CREATE INDEX idx_waitlist_position ON waitlist_entries(position);

   -- Enable Row Level Security (RLS)
   ALTER TABLE waitlist_entries ENABLE ROW LEVEL SECURITY;

   -- Create policy for public read access (for count queries)
   CREATE POLICY "Allow public read access" ON waitlist_entries
     FOR SELECT USING (true);

   -- Create policy for public insert access
   CREATE POLICY "Allow public insert" ON waitlist_entries
     FOR INSERT WITH CHECK (true);

   -- Create policy for public update (for referral counts)
   CREATE POLICY "Allow public update" ON waitlist_entries
     FOR UPDATE USING (true);
   ```

5. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Features Documentation

### Gamified Waitlist System

The core waitlist functionality (`components/gamified-waitlist.tsx`) implements:

- **Email Validation**: Client-side validation with duplicate detection
- **Referral Code Generation**: Unique codes generated on signup
- **Position Tracking**: Real-time position calculation based on signup order
- **Referral Rewards**: Three-tier reward system:
  - 1 referral: Skip 50 spots
  - 5 referrals: Early Beta Access
  - 10 referrals: 1 Month Pro Free
- **Social Sharing**: Native share API + platform-specific sharing (Twitter, LinkedIn, Email)

### Component Architecture

#### `GamifiedWaitlist`

Main waitlist component handling:

- Form submission and validation
- Supabase integration
- Referral tracking
- Position calculation
- Social sharing

#### `HeroSection`

Landing page hero with:

- Animated code preview
- Primary CTA buttons
- Feature highlights
- Demo modal integration

#### `FeaturesSection`

Product features showcase:

- Real-time Security
- CI/CD Integration
- Policy Enforcement
- Detailed Analytics

#### `IntegrationsSection`

Visual integration showcase with:

- Animated workflow visualization
- Category filtering
- Hover effects and interactions

### Database Schema

The `waitlist_entries` table stores:

- `id`: Unique identifier (UUID)
- `email`: User email (unique, indexed)
- `referral_code`: Unique referral code (indexed)
- `referred_by`: Referrer's code (nullable)
- `referral_count`: Number of successful referrals
- `position`: Waitlist position (calculated on insert)
- `created_at`: Timestamp

## 🔧 Configuration

### Environment Variables

| Variable                        | Description                   | Required |
| ------------------------------- | ----------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL     | Yes      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | Yes      |

### Next.js Configuration

The project uses Next.js 16 with:

- TypeScript support (with build error tolerance for development)
- Image optimization disabled (for static exports if needed)
- App Router architecture

### Tailwind Configuration

Custom theme configuration in `app/globals.css`:

- Custom color scheme with accent colors
- Dark mode support via `next-themes`
- Custom animations and transitions

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

The application will automatically deploy on every push to the main branch.

### Other Platforms

The application can be deployed to any platform supporting Next.js:

- **Netlify**: Use the Next.js build preset
- **AWS Amplify**: Configure for Next.js SSR
- **Docker**: Use the included Dockerfile (if provided)

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript strict mode enabled
- ESLint configured for Next.js
- Prettier recommended (not enforced)

### Component Guidelines

- Use TypeScript for all components
- Follow the existing component structure
- Use Radix UI primitives for accessibility
- Implement proper loading and error states
- Add proper TypeScript types for all props

## 🔐 Security Considerations

- **Email Validation**: Both client and server-side validation
- **Rate Limiting**: Consider implementing rate limiting on Supabase
- **SQL Injection**: Supabase client handles parameterized queries
- **XSS Protection**: React's built-in XSS protection
- **CORS**: Configured via Supabase RLS policies

## 📊 Analytics & Monitoring

- **Vercel Analytics**: Integrated for performance monitoring
- **Supabase Logs**: Monitor database queries and errors
- **Error Tracking**: Consider adding Sentry or similar service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. Create an issue describing the feature/bug
2. Get approval from maintainers
3. Implement changes following code style guidelines
4. Test thoroughly (manual + automated if applicable)
5. Submit PR with clear description

## 📝 License

This project is proprietary software. All rights reserved.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) team for the amazing framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

For issues, questions, or contributions:

- Open an issue on GitHub
- Contact the CodeSentinel team

---

**Built with ❤️ by the CodeSentinel Team**

_Last updated: 2024_
