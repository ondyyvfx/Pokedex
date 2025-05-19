import Link from "next/link";
import { SparklesCore } from "@/components/ui/sparkles";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-zinc-900 to-purple-900 text-white flex items-center justify-center flex-col px-4">
      {/* Неоновый фон со звездами */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <SparklesCore
          className="w-full h-full"
          background="transparent"
          minSize={0.5}
          maxSize={1.5}
          particleDensity={100}
        />
      </div>

      <div className="relative z-10 text-center max-w-2xl py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-6 animate-fade-in">
          Добро пожаловать в Pokédex
        </h1>

        <p className="text-lg text-zinc-300 mb-8 animate-fade-in delay-100">
          Исследуй мир Покемонов, узнай их способности, характеристики и найди
          своего любимого!
        </p>

        <Link
          href="/search"
          className="inline-block bg-pink-600 hover:bg-pink-700 transition px-6 py-3 rounded-full text-white text-lg font-medium shadow-lg animate-fade-in delay-200"
        >
          Начать поиск
        </Link>
      </div>
    </main>
  );
}
