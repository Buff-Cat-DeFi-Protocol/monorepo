"use client";
import { TokenSelector } from "@/features/dashboard/components/TokenSelector";

export default function Home() {
  return (
    <TokenSelector isOpen={true} onClose={() => {}} onSelectToken={() => {}} />
  );
}
