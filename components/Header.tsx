"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-zinc-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-pink-500 transition"
          onClick={closeMenu}
        >
          Pokémon App
        </Link>

        <button
          className="md:hidden text-pink-500 focus:outline-none text-2xl"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row md:items-center
             absolute md:static top-full left-0
             bg-zinc-900 md:bg-transparent
             w-full md:w-auto
             md:space-x-6
             transition-all`}
        >
          <HeaderLink
            href="/search"
            label="Поиск"
            current={pathname}
            onClick={closeMenu}
          />
          <HeaderLink
            href="/test"
            label="Тест"
            current={pathname}
            onClick={closeMenu}
          />
          <HeaderLink
            href="/pokemons"
            label="Список"
            current={pathname}
            onClick={closeMenu}
          />
          <HeaderLink
            href="/saved"
            label="Приручённые"
            current={pathname}
            onClick={closeMenu}
          />
        </div>
      </div>
    </nav>
  );
}

function HeaderLink({
  href,
  label,
  current,
  onClick,
}: {
  href: string;
  label: string;
  current: string;
  onClick: () => void;
}) {
  const isActive = current === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-4 py-2 transition ${
        isActive ? "text-pink-400" : "hover:text-pink-500"
      }`}
    >
      {label}
    </Link>
  );
}
