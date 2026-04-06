"use client";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold">Leetcode-Ranking</div>


        <div className="hidden md:flex gap-6">
          <Link href="/dashboard" className="hover:text-blue-400 transition">
            Dashboard
          </Link>
          <Link href="/courses" className="hover:text-blue-400 transition">
            Courses
          </Link>
          <Link href="/leaderboard" className="hover:text-blue-400 transition">
            Leaderboard
          </Link>
        </div>

     
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="flex flex-col gap-4 px-6 pb-4 md:hidden">
          <Link href="/dashboard" className="hover:text-blue-400 transition">
            Dashboard
          </Link>
          <Link href="/courses" className="hover:text-blue-400 transition">
            Courses
          </Link>
          <Link href="/leaderboard" className="hover:text-blue-400 transition">
            Leaderboard
          </Link>
        </div>
      )}
    </nav>
  );
}