"use client";

import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("@/features").then((mod) => mod.Dashboard),
  { ssr: false }
);

export default function DashboardPage() {
  return <Dashboard />;
}
