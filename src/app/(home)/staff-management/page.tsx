"use client";

import dynamic from "next/dynamic";

const StaffManagement = dynamic(
  () => import("@/features").then((mod) => mod.StaffManagement),
  { ssr: false }
);

export default function StaffManagementPage() {
  return <StaffManagement />;
}
