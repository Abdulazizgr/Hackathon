"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient, useSession } from "@/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full">
            <CardHeader>
              <CardTitle>Welcome!</CardTitle>
              <CardDescription>You are successfully logged in</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={session.user?.image || ""}
                  alt={session.user?.name || "User"}
                />
                <AvatarFallback>
                  {session.user?.name ? getInitials(session.user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold">
                  {session.user?.name || "User"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {session.user?.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User ID</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-mono break-all">{session.user?.id}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {session.user?.emailVerified ? "Yes" : "No"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Created</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                {new Date(session.session?.createdAt || "").toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
