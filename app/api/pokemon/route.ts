import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Имя покемона не указано' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error('Покемон не найден');

    const details = await res.json();

    const pokemon = {
      id: details.id,
      name: details.name,
      image: details.sprites.other['official-artwork'].front_default,
      types: details.types.map((t: any) => t.type.name),
      height: details.height,
      weight: details.weight,
      stats: details.stats.map((s: any) => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };

    return NextResponse.json(pokemon);
  } catch (err) {
    return NextResponse.json({ error: 'Покемон не найден' }, { status: 404 });
  }
}
