import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface GPTResponse {
  name: string;
  reason: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    if (!body.answers || !Array.isArray(body.answers) || !body.answers.every((a: unknown) => typeof a === "string")) {
      return NextResponse.json({ error: "Некорректные данные" }, { status: 400 });
    }

    const answers: string[] = body.answers;

    const prompt = `
Ты — эксперт по покемонам. Пользователь ответил на следующие вопросы:
${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}

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

    const json: GPTResponse = JSON.parse(raw);

    const pokeName = json.name.toLowerCase();

    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);

    if (!pokeRes.ok) {
      return NextResponse.json({ error: "Покемон не найден в PokeAPI" }, { status: 404 });
    }

    const pokeData = await pokeRes.json();

    const response = {
      id: pokeData.id,
      name: json.name,
      reason: json.reason,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error("Ошибка в who-pokemon API:", error);
    return NextResponse.json({ error: "Что-то пошло не так." }, { status: 500 });
  }
}
