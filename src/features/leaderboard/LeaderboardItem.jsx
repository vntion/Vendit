function LeaderboardItem ({ leaderboard, place }) {
  return (
    <>
      <div className=''>{place}</div>
      <div className='flex items-center gap-2'>
        <img
          src={leaderboard.user.avatar}
          alt={leaderboard.user.name}
          className='size-8 rounded-full'
        />
        <span>{leaderboard.user.name}</span>
      </div>
      <div className=''>{leaderboard.score}</div>
    </>
  )
}

export default LeaderboardItem
