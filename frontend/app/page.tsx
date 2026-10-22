import Link from "next/link";
import AuthBackground from "@/components/AuthBackground";
import Logo from "@/components/Logo";

export default function Comenzar() {
  return (
    <AuthBackground>
      <div>
        <Logo />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <h1 className="text-4xl font-light md:text-6xl">Películas, Series y Mucho +</h1>
        <Link
          href="/inicio"
          className="rounded-lg bg-primary px-8 py-3 text-sm font-medium text-black transition hover:opacity-90">
          COMENZAR
        </Link>
      </div>
    </AuthBackground>
  );
}