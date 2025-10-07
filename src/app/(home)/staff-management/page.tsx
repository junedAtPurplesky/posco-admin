"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/services";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const StaffManagement = dynamic(
  () => import("@/features").then((mod) => mod.StaffManagement),
  { ssr: false }
);

export default function StaffManagementPage() {
  const router = useRouter();
  const { activeSession } = useAuthStore();
  const accessToken = activeSession?.access_token;

  useEffect(() => {
    if (!accessToken) {
      // If no token, redirect to login
      router.replace("/login");
    } else {
      // If token exists, redirect 
      router.replace("/staff-management");
    }
  }, [accessToken, router]);
  return <StaffManagement />;
}
