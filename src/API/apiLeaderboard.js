/**
 * Get leaderboard
 */
export async function getLeaderboard () {
  const res = await fetch('https://forum-api.dicoding.dev/v1/leaderboards')

  if (!res.ok) throw Error()

  const {
    data: { leaderboards }
  } = await res.json()

  return leaderboards
}
