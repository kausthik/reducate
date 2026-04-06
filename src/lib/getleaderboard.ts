import { getUserData } from "@/src/lib/graphql"

export async function getLeaderboard() {
  const users = [
    "kk_gangwar",
    "krotrn",
    "ujjwalsingh9939",
    "ROUSHAN_RAJ_17",
    "Harshit_Srivastava_25",
    "Harshal-03",
    "Arun_kumar7310",
    "AyushKumar98",
    "coder_bhumikaa",
    "ao55sdaK9Q",
    "Rishikesh2005"
  ]

  const result = await Promise.all(
    users.map((u) => getUserData(u))
  )

  const byTotal = [...result].sort((a, b) => b.total as number - a.total as number)
  const byEasy = [...result].sort((a, b) => b.easy as number - a.easy as number)
  const byMedium = [...result].sort((a, b) => b.medium as number - a.medium as number)
  const byHard = [...result].sort((a, b) => b.hard as number - a.hard as number)
  const byRating = [...result].sort((a, b) => b.rating as number - a.rating as number)
  const byDaily = [...result].sort((a, b) => (b.daily as number) - (a.daily as number))

  return {
    byTotal,
    byEasy,
    byMedium,
    byHard,
    byRating,
    byDaily
  }
}