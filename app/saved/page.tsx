"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { toast } from "sonner";

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default function SavedPokemons() {
  const [savedPokemons, setSavedPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedPokemons") || "[]");
    setSavedPokemons(saved);
  }, []);

  const removePokemon = (id: number) => {
    const filtered = savedPokemons.filter((p) => p.id !== id);
    setSavedPokemons(filtered);
    localStorage.setItem("savedPokemons", JSON.stringify(filtered));
    toast.success("Покемон удален");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black text-white pt-20 px-4 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mt-6 mb-6 text-center">
          Мои приручённые покемоны
        </h1>

        {savedPokemons.length === 0 && (
          <p className="text-center text-gray-400">
            У тебя пока нет приручённых покемонов(
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {savedPokemons.map((pokemon) => (
            <div
              key={pokemon.id}
              className="bg-zinc-800 rounded-2xl p-6 text-center shadow-xl"
            >
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={128} // примерно соответствует w-32 (32*4)
                height={128}
                className="mx-auto mb-4"
              />
              <h2 className="text-xl font-semibold capitalize">
                {pokemon.name}
              </h2>
              <p className="text-sm text-gray-400 mb-2">
                Типы: {pokemon.types.join(", ")}
              </p>
              <button
                onClick={() => removePokemon(pokemon.id)}
                className="mt-2 px-4 py-1 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
