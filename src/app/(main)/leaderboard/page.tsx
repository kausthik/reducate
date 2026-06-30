import Link from "next/link";
import { categories } from "@/src/config/category-data";
import { blackOps } from "../../layout";
import { caveat } from "../../layout";


export default function LeaderboardHome() {
  return (
    <div className="min-h-screen p-6">
      <h1 className={`text-4xl font-bold text-center mb-2 ${blackOps.className}`}>
        Leaderboard Dashboard
      </h1>

      <p className={`text-lg text-center text-gray-600 mb-10 ${caveat.className}`}>
        Track Performance and compete with your friends
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/leaderboard/${cat.slug}`}
            className={`p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 ${cat.color}`}
          >
            <div className="text-3xl mb-2">{cat.icon}</div>

            <h2 className="text-lg font-semibold">{cat.name}</h2>

            <p className="text-sm opacity-70">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
