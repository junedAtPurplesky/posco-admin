"use client";

import dynamic from "next/dynamic";

const FormsList = dynamic(
  () => import("@/features").then((mod) => mod.FormsList),
  { ssr: false }
);

export default function FormsListPage() {
  return <FormsList />;
}
