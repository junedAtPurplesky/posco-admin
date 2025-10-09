"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/services";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const FormsList = dynamic(
  () => import("@/features").then((mod) => mod.FormsList),
  { ssr: false }
);

export default function FormsListPage() {
  const router = useRouter();
  const { activeSession } = useAuthStore();
  const accessToken = activeSession?.access_token;

  useEffect(() => {
    if (!accessToken) {
      // If no token, redirect to login
      router.replace("/login");
    } else {
      // If token exists, redirect
      router.replace("/forms-list");
    }
  }, [accessToken, router]);
  return <FormsList />;
}
