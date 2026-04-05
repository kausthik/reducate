import Link from "next/link";

const categories = [
  {
    name: "Easy",
    slug: "easy",
    icon: "🟢",
    desc: "Basic problems",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Medium",
    slug: "medium",
    icon: "🟡",
    desc: "Intermediate problems",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    name: "Hard",
    slug: "hard",
    icon: "🔴",
    desc: "Advanced problems",
    color: "bg-red-100 text-red-700",
  },
  {
    name: "Contest",
    slug: "contest",
    icon: "🏆",
    desc: "Competitive rating",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Today's Problem",
    slug: "daily",
    icon: "📅",
    desc: "Daily streak",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Overall",
    slug: "overall",
    icon: "🔥",
    desc: "Total performance",
    color: "bg-gray-200 text-gray-800",
  },
];

export default function LeaderboardHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <h1 className="text-4xl font-bold text-center mb-2">
        🏆 Leaderboard Dashboard
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Track performance across different coding categories
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
