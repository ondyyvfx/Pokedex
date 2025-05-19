import { NextRequest, NextResponse } from 'next/server';

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
  height: number;
  weight: number;
  stats: PokemonStat[];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Имя покемона не указано' }, { status: 400 });
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) throw new Error('Покемон не найден');

    const details: PokemonDetails = await res.json();

    const pokemon = {
      id: details.id,
      name: details.name,
      image: details.sprites.other['official-artwork'].front_default,
      types: details.types.map(t => t.type.name),
      height: details.height,
      weight: details.weight,
      stats: details.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };

    return NextResponse.json(pokemon);
  } catch (_err) {
    return NextResponse.json({ error: 'Покемон не найден' }, { status: 404 });
  }
}
