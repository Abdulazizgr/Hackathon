# Better-Auth Integration Setup

This project includes a complete authentication setup using better-auth with Google OAuth and MongoDB.

## Features

- ✅ Email/Password authentication
- ✅ Google OAuth integration
- ✅ MongoDB database integration
- ✅ Protected routes with middleware
- ✅ Session management
- ✅ Beautiful login and signup pages with shadcn/ui
- ✅ Dashboard with user profile

## Setup Instructions

### 1. MongoDB Setup

Make sure you have MongoDB running. You can either:

**Option A: Local MongoDB**

```bash
# Install MongoDB and start it
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - Add your production URL when deploying
7. Copy the Client ID and Client Secret to `.env`

### 3. Environment Variables

Your `.env` file should contain:

```env
BETTER_AUTH_SECRET=kVWUOXgD0hfEc55lyMvHf7v1oE7PzbBp
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=mongodb://localhost:27017/better_auth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/route.ts    # Auth API routes
│   ├── login/page.tsx                # Login page
│   ├── signup/page.tsx               # Signup page
│   ├── dashboard/page.tsx            # Protected dashboard
│   └── page.tsx                      # Home page
├── lib/
│   ├── auth.ts                       # Better-auth server config
│   └── auth-client.ts                # Better-auth client hooks
└── middleware.ts                      # Route protection middleware
```

## Routes

- `/` - Home page with links to login/signup
- `/login` - Login page (email/password or Google)
- `/signup` - Signup page (email/password or Google)
- `/dashboard` - Protected dashboard (requires authentication)

## Authentication Flow

### Sign Up

1. Users can sign up with email/password or Google
2. Email/password requires name, email, and password (min 8 chars)
3. Google OAuth redirects to Google for authentication
4. After successful signup, user is redirected to dashboard

### Sign In

1. Users can sign in with email/password or Google
2. Session is created and stored in cookies
3. After successful login, user is redirected to dashboard

### Protected Routes

- Middleware checks for session token in cookies
- Unauthenticated users are redirected to login
- Authenticated users accessing login/signup are redirected to dashboard

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Auth**: better-auth
- **Database**: MongoDB
- **UI**: shadcn/ui + Tailwind CSS
- **OAuth**: Google OAuth 2.0

## Troubleshooting

### MongoDB Connection Issues

- Make sure MongoDB is running: `sudo systemctl status mongodb`
- Check your connection string in `.env`
- For Atlas, ensure your IP is whitelisted

### Google OAuth Issues

- Verify redirect URIs match exactly in Google Cloud Console
- Check that credentials are correct in `.env`
- Clear browser cookies and try again

### Session Issues

- Make sure `BETTER_AUTH_SECRET` is set
- Check that cookies are being set (use browser dev tools)
- Verify `NEXT_PUBLIC_BETTER_AUTH_URL` matches your server URL

## Next Steps

- Add email verification
- Implement password reset
- Add more OAuth providers (GitHub, Facebook, etc.)
- Customize the UI to match your brand
- Add role-based access control
- Implement two-factor authentication

## Resources

- [better-auth Documentation](https://better-auth.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
