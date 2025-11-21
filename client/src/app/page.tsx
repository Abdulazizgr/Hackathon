import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="flex flex-col items-center justify-center gap-8 text-center px-4">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Welcome to Your App
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started by signing in or creating a new account. Experience
            seamless authentication with email or Google.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto min-w-[150px]">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-w-[150px]"
            >
              Create Account
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl mb-2">🔐</div>
            <h3 className="font-semibold text-lg mb-2">
              Secure Authentication
            </h3>
            <p className="text-gray-600 text-sm">
              Built with better-auth for robust security
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl mb-2">🚀</div>
            <h3 className="font-semibold text-lg mb-2">Easy Integration</h3>
            <p className="text-gray-600 text-sm">
              Sign in with email or Google OAuth
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-3xl mb-2">💾</div>
            <h3 className="font-semibold text-lg mb-2">MongoDB Backend</h3>
            <p className="text-gray-600 text-sm">
              Reliable data storage with MongoDB
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
