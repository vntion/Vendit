import { formatString } from '../../utils/helpers'

function SideLeaderboardList ({ leaderboard }) {
  const placement = leaderboard
    .map((item) => ({
      user: item.user,
      score: item.score
    }))
    .slice(0, 5)

  return (
    <div className='flex'>
      <ol className='ml-6 flex-[2] list-decimal text-base'>
        <h3 className='-ml-6 text-sm'>User</h3>
        {placement.map((item) => (
          <li key={item.user.id}>{formatString(item.user.name, 8)}</li>
        ))}
      </ol>

      <div className='flex-1'>
        <h3 className='text-sm'>Skor</h3>
        <ul className=''>
          {placement.map((item) => (
            <li key={item.user.id}>{item.score}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SideLeaderboardList
