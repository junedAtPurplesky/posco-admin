"use client"
import { Loading } from "@/components";
import { useAuthStore } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const { activeSession } = useAuthStore()
  const accessToken = activeSession?.access_token

  useEffect(() => {
    if (!accessToken) {
      // If no token, redirect to login
      router.replace("/login");
    } else {
      // If token exists, redirect to dashboard
      router.replace("/dashboard");
    }
  }, [accessToken, router]);

  return <Loading />;}
