import { User } from "@/src/lib/user-type"

type Props = {
  category: string
  data: User[]
}

export function Leaderboard({ category, data }: Props) {
  
  const getScore = (user: User) => {
    if (category === "easy") return user.easy
    if (category === "medium") return user.medium
    if (category === "hard") return user.hard
    if (category === "daily") return user.daily
    if (category === "rating") return user.rating
    return user.total
  }

  const sortedData = [...data].sort((a, b) => getScore(b) - getScore(a))

  const topThree = sortedData.slice(0, 3)
  const others = sortedData.slice(3)


  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        🏆 Leaderboard
      </h1>

      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {topThree.map((user, index) => (
          <div
            key={user.username}
            className="flex flex-col items-center justify-center border rounded-xl p-4 shadow-md bg-white relative"
          >
            <div className="text-2xl font-bold">
              {index === 0 && "🥇"}
              {index === 1 && "🥈"}
              {index === 2 && "🥉"}
            </div>

            <p className="font-semibold mt-2">{user.username}</p>

            <p className="text-lg font-bold text-blue-600">
              {getScore(user)}
            </p>
            {
              (index!=0)? <p className="text-sm absolute top-1 right-2 font-bold"> - {getScore(topThree[index-1]) - getScore(topThree[index])}</p>: <></>
            }
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {others.map((user, index) => (
          <div
            key={user.username}
            className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-100 transition relative"
          >
            <div className="font-semibold">
              #{index + 4} {user.username}
            </div>

            <div className="text-blue-600 font-bold">
              {getScore(user)} / {
              (index==0)? <span className="text-sm font-bold text-taupe-900">-{getScore(topThree[2]) - getScore(others[index])}</span>  : <span className="text-sm font-bold text-taupe-900">-{getScore(others[index-1]) - getScore(others[index])}</span>
            }
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}