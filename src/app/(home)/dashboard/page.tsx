"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/services";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const Dashboard = dynamic(
  () => import("@/features").then((mod) => mod.Dashboard),
  { ssr: false }
);

export default function DashboardPage() {
  const router = useRouter();
  const { activeSession } = useAuthStore();
  const accessToken = activeSession?.access_token;

  useEffect(() => {
    if (!accessToken) {
      // If no token, redirect to login
      router.replace("/login");
    } else {
      // If token exists, redirect
      router.replace("/dashboard");
    }
  }, [accessToken, router]);
  return <Dashboard />;
}
