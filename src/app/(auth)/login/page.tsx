"use client";

import dynamic from "next/dynamic";

const Login = dynamic(
  () => import("@/features/auth/login").then((mod) => mod.Login),
  { ssr: false }
);
export default function LoginPage() {
  return <Login />;
}
