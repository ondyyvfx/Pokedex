"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

type Pokemon = {
  id: string;
  name: string;
  image: string;
};

export default function PokemonsPage() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const limit = 20;

  const fetchPokemons = async (page: number) => {
    setLoading(true);
    setError("");
    try {
      const offset = page * limit;
      const res = await fetch(`/api/pokemons?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPokemons(data.pokemons);
    } catch {
      setError("Не удалось загрузить покемонов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white p-6">
        <h1 className="text-4xl mb-6 text-center font-bold">
          Список покемонов
        </h1>

        {loading && <p className="text-center text-pink-400">Загрузка...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6">
          {pokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-zinc-900 rounded-xl p-4 flex flex-col items-center cursor-pointer hover:bg-pink-600 transition"
              onClick={() => router.push(`/pokemons/${pokemon.name}`)}
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={96}
                height={96}
                className="mb-2"
              />
              <h2 className="capitalize font-semibold">{pokemon.name}</h2>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-700 disabled:bg-zinc-700"
          >
            Предыдущая
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-pink-600 hover:bg-pink-700"
          >
            Следующая
          </button>
        </div>
      </main>
    </>
  );
}
