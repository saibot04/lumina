"use client";

import { useRouter } from "next/navigation";

export default function BotonVolver() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-8 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group w-max"
    >
      <span className="text-lg group-hover:-translate-x-1 transition-transform">←</span>
      Volver
    </button>
  );
}