import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json();

    if (!answers || !Array.isArray(answers)) {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
    }

    const prompt = `
Ты — эксперт по покемонам. Пользователь ответил на следующие вопросы:
${answers.map((a: string, i: number) => `${i + 1}. ${a}`).join("\n")}

На основе этих ответов скажи, на какого покемона он больше всего похож. Ответ верни строго в JSON:
{
  "name": "Имя покемона",
  "reason": "Объяснение, почему именно этот покемон"
}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const raw = completion.choices[0].message.content;

    if (!raw) {
      return NextResponse.json({ error: "Пустой ответ от OpenAI" }, { status: 500 });
    }

    // Парсим ответ GPT
    const json = JSON.parse(raw);

    // Получаем имя покемона в нижнем регистре для запроса к PokeAPI
    const pokeName = json.name.toLowerCase();

    // Запрос к PokeAPI для получения ID и других данных
    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

    if (!pokeRes.ok) {
      return NextResponse.json({ error: "Покемон не найден в PokeAPI" }, { status: 404 });
    }

    const pokeData = await pokeRes.json();

    // Формируем объект с нужными данными: id, name, reason
    const response = {
      id: pokeData.id,          // числовой ID
      name: json.name,          // имя от GPT (с заглавной)
      reason: json.reason,      // объяснение от GPT
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error("Ошибка в who-pokemon API:", error);
    return NextResponse.json({ error: "Что-то пошло не так." }, { status: 500 });
  }
}
