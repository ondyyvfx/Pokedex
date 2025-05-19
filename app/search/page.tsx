"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { SparklesCore } from "@/components/ui/sparkles";
import { toast } from "sonner";

export default function SearchPokemon() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch(`/api/pokemon?name=${query}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setResult(data);
    } catch {
      setError("Покемон не найден");
    } finally {
      setLoading(false);
    }
  };

  const tamePokemon = () => {
    if (!result) return;

    const savedPokemons = JSON.parse(
      localStorage.getItem("savedPokemons") || "[]"
    );

    const alreadyExists = savedPokemons.some((p: any) => p.id === result.id);

    if (!alreadyExists) {
      savedPokemons.push(result);
      localStorage.setItem("savedPokemons", JSON.stringify(savedPokemons));

      toast.success(`${result.name.toUpperCase()} теперь твой спутник! 🐾`, {
        description: "Проверь список в разделе 'Приручённые'",
      });

      setTimeout(() => router.push("/saved"), 1000);
    } else {
      toast(`${result.name.toUpperCase()} уже приручён!`, {
        description: "Ты уже сохранил этого покемона",
      });
    }
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-black text-white flex flex-col items-center justify-start pt-20 px-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SparklesCore
            className="w-full h-full"
            background="transparent"
            minSize={0.5}
            maxSize={1.5}
            particleDensity={100}
          />
        </div>

        <div className="z-10 w-full max-w-xl mx-auto text-center">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Введите имя покемона..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-2 text-lg rounded-xl bg-zinc-900 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl text-white transition-all whitespace-nowrap"
            >
              Найти
            </button>
          </div>
          {loading && <p className="mt-4 text-pink-400">Загрузка...</p>}
          {error && <p className="mt-4 text-red-400">{error}</p>}

          {result && (
            <div className="mt-6 p-6 bg-zinc-800/80 backdrop-blur rounded-2xl shadow-xl">
              <img
                src={result.image}
                alt={result.name}
                className="w-40 mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold capitalize">{result.name}</h2>
              <p className="text-sm text-gray-400 mb-2">
                Типы: {result.types.join(", ")}
              </p>
              <p className="text-sm text-gray-400">
                Рост: {result.height / 10} м
              </p>
              <p className="text-sm text-gray-400 mb-2">
                Вес: {result.weight / 10} кг
              </p>
              <h3 className="mt-4 text-lg font-semibold">Статы:</h3>
              <ul className="text-sm text-gray-300">
                {result.stats.map((stat: any) => (
                  <li key={stat.name}>
                    {stat.name}: <strong>{stat.value}</strong>
                  </li>
                ))}
              </ul>

              <button
                onClick={tamePokemon}
                className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white transition-all"
              >
                🐾 Приручить покемона
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
