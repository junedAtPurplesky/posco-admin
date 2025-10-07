"use client";

import dynamic from "next/dynamic";

const SubmittedForms = dynamic(
  () => import("@/features").then((mod) => mod.SubmittedForms),
  { ssr: false }
);

export default function SubmittedFormsPage() {
  return <SubmittedForms />;
}
