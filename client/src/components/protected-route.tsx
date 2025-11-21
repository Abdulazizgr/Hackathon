"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ProtectedRoute component
 * Wraps content that should only be visible to authenticated users
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute({
  children,
  fallback = <div>Loading...</div>,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <>{fallback}</>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}

/**
 * useRequireAuth hook
 * Redirects to login if user is not authenticated
 * Returns session data if authenticated
 */
export function useRequireAuth() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  return { session, isPending };
}
