async function getUserData(username: string) {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 }, 
    body: JSON.stringify({
      query: `
        query {
          matchedUser(username: "${username}") {
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
            submissionCalendar
            contestBadge {
              name
            }
            userContestRanking {
              rating
            }
          }
        }
      `,
    }),
  })

  const { data } = await res.json()

  const stats = data.matchedUser.submitStats.acSubmissionNum

  const map: any = {}
  stats.forEach((item: any) => {
    map[item.difficulty] = item.count
  })

  const calendar = JSON.parse(data.matchedUser.submissionCalendar || "{}")
  const lastDay = Object.values(calendar).slice(-1)[0] || 0

  return {
    username,
    total: map.All || 0,
    easy: map.Easy || 0,
    medium: map.Medium || 0,
    hard: map.Hard || 0,
    daily: lastDay,
    rating: data.matchedUser.userContestRanking?.rating || 0
  }
}