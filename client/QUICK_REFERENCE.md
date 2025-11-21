# 🚀 Quick Reference Guide - Better-Auth Integration

## 🔗 URLs

- **Home**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Signup**: http://localhost:3000/signup
- **Dashboard**: http://localhost:3000/dashboard (protected)

## 🎯 Key Files Reference

### Authentication Server (`src/lib/auth.ts`)

```typescript
import { auth } from "@/lib/auth";

// Use in API routes or server components
export { auth };
```

### Authentication Client (`src/lib/auth-client.ts`)

```typescript
import {
  authClient,
  signIn,
  signUp,
  signOut,
  useSession,
} from "@/lib/auth-client";

// In components:
const { data: session, isPending } = useSession();
```

## 💻 Code Examples

### Sign Up with Email

```typescript
await authClient.signUp.email({
  email: "user@example.com",
  password: "password123",
  name: "John Doe",
});
```

### Sign In with Email

```typescript
await authClient.signIn.email({
  email: "user@example.com",
  password: "password123",
});
```

### Sign In with Google

```typescript
await authClient.signIn.social({
  provider: "google",
  callbackURL: "/dashboard",
});
```

### Sign Out

```typescript
await authClient.signOut();
```

### Get Current User Session

```typescript
"use client";

import { useSession } from "@/lib/auth-client";

export function MyComponent() {
  const { data: session, isPending } = useSession();

  if (isPending) return <div>Loading...</div>;
  if (!session) return <div>Not logged in</div>;

  return <div>Hello {session.user?.name}!</div>;
}
```

### Protect a Route with Component

```typescript
import { ProtectedRoute } from "@/components/protected-route";

export default function MyPage() {
  return (
    <ProtectedRoute>
      <div>This content is protected</div>
    </ProtectedRoute>
  );
}
```

### Use Require Auth Hook

```typescript
"use client";

import { useRequireAuth } from "@/components/protected-route";

export default function MyPage() {
  const { session, isPending } = useRequireAuth();

  if (isPending) return <div>Loading...</div>;

  return <div>Welcome {session?.user?.name}</div>;
}
```

## 🗂️ Session Data Structure

```typescript
{
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
    emailVerified: boolean;
  },
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
  }
}
```

## 🎨 UI Components Available

```typescript
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// ... and many more from shadcn/ui
```

## 🔒 Middleware Configuration

Routes are automatically protected based on this config in `src/middleware.ts`:

```typescript
// Protected routes (requires auth)
const protectedRoutes = ["/dashboard"];

// Auth routes (redirects if already logged in)
const authRoutes = ["/login", "/signup"];
```

To add more protected routes:

```typescript
const protectedRoutes = ["/dashboard", "/profile", "/settings"];
```

## 🔧 Environment Variables

```env
# Required for auth
BETTER_AUTH_SECRET=        # Generate with: openssl rand -base64 32
BETTER_AUTH_URL=           # http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL= # http://localhost:3000

# Required for database
MONGODB_URI=               # mongodb://localhost:27017/better_auth

# Required for Google OAuth
GOOGLE_CLIENT_ID=          # From Google Cloud Console
GOOGLE_CLIENT_SECRET=      # From Google Cloud Console
```

## 📱 API Endpoints (Auto-generated)

Better-auth automatically creates these endpoints:

- `POST /api/auth/sign-up/email` - Email signup
- `POST /api/auth/sign-in/email` - Email login
- `GET /api/auth/sign-in/social` - OAuth login (redirects)
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/callback/google` - Google OAuth callback

## 🎯 Common Tasks

### Add a New OAuth Provider

1. Install provider if needed
2. Update `src/lib/auth.ts`:

```typescript
socialProviders: {
  google: { ... },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  }
}
```

3. Add to login/signup buttons:

```typescript
await authClient.signIn.social({
  provider: "github",
  callbackURL: "/dashboard",
});
```

### Check if User is Logged In (Server Side)

```typescript
// In Server Components or API Routes
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyServerComponent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div>Not logged in</div>;
  }

  return <div>Hello {session.user.name}</div>;
}
```

### Add Custom Fields to User

Update MongoDB schema by modifying `src/lib/auth.ts`:

```typescript
export const auth = betterAuth({
  // ... existing config
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },
});
```

## 🧪 Testing Checklist

- [ ] Sign up with email/password
- [ ] Sign in with email/password
- [ ] Sign in with Google OAuth
- [ ] Access protected route (dashboard)
- [ ] Try accessing dashboard without login (should redirect)
- [ ] Try accessing login while logged in (should redirect to dashboard)
- [ ] Sign out and verify redirect to login
- [ ] Check session persists on page refresh

## 📞 Getting Help

- Check `AUTH_SETUP.md` for detailed setup instructions
- Check `INTEGRATION_COMPLETE.md` for full feature list
- Visit [better-auth.com](https://better-auth.com) for documentation
- Check browser console for errors
- Check terminal output for server errors

## 🎉 You're All Set!

Your authentication system is fully configured and ready to use!

**Server running at**: http://localhost:3000

Try creating an account and exploring the dashboard! 🚀
