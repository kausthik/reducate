import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <div className="text-lg font-semibold">Leetcode-Ranking</div>

      <div className="flex gap-6">
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
    </nav>
  );
}