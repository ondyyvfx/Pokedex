"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Header from "@/components/Header";
import { SparklesCore } from "@/components/ui/sparkles";

const questions = [
  {
    question: "Где ты чувствуешь себя комфортнее всего?",
    options: ["На природе", "В городе", "У воды", "В горах"],
  },
  {
    question: "Какой элемент тебе ближе?",
    options: ["Огонь", "Вода", "Электричество", "Земля"],
  },
  {
    question: "Как ты обычно общаешься с людьми?",
    options: ["Лидер в группе", "Интроверт", "Командный игрок", "Одиночка"],
  },
  {
    question: "Что описывает тебя лучше всего?",
    options: [
      "Умный и рассудительный",
      "Храбрый и решительный",
      "Весёлый и энергичный",
      "Тихий и загадочный",
    ],
  },
];

export default function WhoPokemonPage() {
  const [answers, setAnswers] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const router = useRouter();

  const handleSelect = (index: number, option: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.some((a) => !a)) {
      toast.warning("Ответь на все вопросы!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/test-poke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });

      const data = await res.json();
      if (data?.name) {
        setResult(data);
        toast.success(`Ты — ${data.name}!`);
      } else {
        toast.error("Ошибка при определении покемона");
      }
    } catch (err) {
      toast.error("Ошибка сервера 😢");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-black text-white pt-20 px-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <SparklesCore
            className="w-full h-full"
            background="transparent"
            minSize={0.5}
            maxSize={1.5}
            particleDensity={100}
          />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10 text-pink-400">
            Кто ты из покемонов?
          </h1>

          {!result ? (
            <div className="space-y-10">
              {questions.map((q, i) => (
                <div key={i}>
                  <h2 className="text-xl font-semibold mb-4">
                    {i + 1}. {q.question}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelect(i, opt)}
                        className={`px-4 py-3 rounded-xl border transition-all duration-200 ${
                          answers[i] === opt
                            ? "bg-pink-600 border-pink-400 text-white"
                            : "bg-zinc-900 border-zinc-700 hover:border-pink-500"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <div className="text-center mt-10">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 transition-all text-white text-lg"
                  disabled={loading}
                >
                  {loading ? "Определяем..." : "Узнать покемона"}
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-10 text-center bg-zinc-900/80 p-6 rounded-2xl shadow-xl backdrop-blur">
              <h2 className="text-2xl font-bold mb-4 text-green-400">
                Ты — {result.name}!
              </h2>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${result.id}.png`}
                alt={result.name}
                className="w-66 mx-auto mb-4"
              />

              <p className="text-gray-300">{result.reason}</p>

              <button
                onClick={() => {
                  setResult(null);
                  setAnswers(Array(questions.length).fill(""));
                }}
                className="mt-6 px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-xl text-white"
              >
                Пройти заново
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
