"use client";

import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import { toast } from "sonner";

interface Params {
  params: Promise<{ name: string }>;
}

export default function PokemonDetail({ params }: Params) {
  const { name } = use(params);
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(setData)
      .catch(() => notFound())
      .finally(() => setLoading(false));
  }, [name]);

  const tamePokemon = () => {
    if (!data) return;

    const saved = JSON.parse(localStorage.getItem("savedPokemons") || "[]");

    if (!saved.some((p: any) => p.id === data.id)) {
      const newPokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
        height: data.height,
        weight: data.weight,
        stats: data.stats.map((s: any) => ({
          name: s.stat.name,
          value: s.base_stat,
        })),
      };

      localStorage.setItem(
        "savedPokemons",
        JSON.stringify([...saved, newPokemon])
      );

      toast.success(`Вы приручили ${data.name}! 🎉`);
    } else {
      toast("Этот покемон уже приручён 🐾", { icon: "⚠️" });
    }
  };

  if (loading || !data) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Загрузка...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <button
        onClick={() => router.back()}
        className="mb-4 text-pink-500 hover:underline"
      >
        ← Назад к списку
      </button>

      <div className="max-w-xl mx-auto bg-zinc-800 p-6 rounded-2xl shadow-xl">
        <Image
          src={data.sprites.front_default}
          alt={data.name}
          width={160}
          height={160}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold capitalize">{data.name}</h1>
        <p className="text-gray-400 mt-2">
          Типы: {data.types.map((t: any) => t.type.name).join(", ")}
        </p>
        <p className="text-gray-400">
          Рост: {data.height / 10} м, Вес: {data.weight / 10} кг
        </p>
        <h2 className="text-lg mt-4 font-semibold">Статы:</h2>
        <ul className="text-sm text-gray-300">
          {data.stats.map((stat: any) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: <strong>{stat.base_stat}</strong>
            </li>
          ))}
        </ul>

        <button
          onClick={tamePokemon}
          className="mt-6 w-full px-6 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white transition-all"
        >
          🐾 Приручить покемона
        </button>
      </div>
    </main>
  );
}
