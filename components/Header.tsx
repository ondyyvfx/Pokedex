"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  return (
    <nav className="bg-zinc-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-pink-500 transition"
        >
          Pokémon App
        </Link>

        <button
          className="md:hidden text-pink-500 focus:outline-none"
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className="flex-col md:flex-row md:flex gap-6 md:items-center absolute md:static bg-zinc-900 md:bg-transparent w-full md:w-auto left-0 md:left-auto top-full md:top-auto transition-transform duration-300">
          <Link
            href="/search"
            className="block px-4 py-2 hover:text-pink-500 transition"
          >
            Поиск
          </Link>
          <Link
            href="/test"
            className="block px-4 py-2 hover:text-pink-500 transition"
          >
            Тест
          </Link>
          <Link
            href="/pokemons"
            className="block px-4 py-2 hover:text-pink-500 transition"
          >
            Список
          </Link>
          <Link
            href="/saved"
            className="block px-4 py-2 hover:text-pink-500 transition"
          >
            Приручённые
          </Link>
        </div>
      </div>
    </nav>
  );
}
