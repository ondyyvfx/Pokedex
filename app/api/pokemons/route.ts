import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get('limit')) || 20;
  const offset = Number(searchParams.get('offset')) || 0;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    if (!res.ok) throw new Error('Ошибка при получении списка покемонов');

    const data = await res.json();

    const pokemons = data.results.map((pokemon: { name: string; url: string }) => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      return {
        id,
        name: pokemon.name,
        image,
      };
    });

    return NextResponse.json({
      count: data.count,
      next: data.next,
      previous: data.previous,
      pokemons,
    });
  } catch (err) {
    return NextResponse.json({ error: 'Не удалось получить список покемонов' }, { status: 500 });
  }
}
