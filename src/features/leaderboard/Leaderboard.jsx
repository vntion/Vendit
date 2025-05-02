import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboard } from '../../slices/leaderboardSlice'
import { resetLoading } from '../../slices/loadingBarSlice'
import Table from '../../ui/Table'
import LeaderboardItem from './LeaderboardItem'

function Leaderboard () {
  const dispatch = useDispatch()

  const { leaderboard } = useSelector((state) => state.leaderboard)

  useEffect(() => {
    dispatch(fetchLeaderboard()).finally(() => {
      dispatch(resetLoading())
    })
  }, [dispatch])

  return (
    <div className='col-span-2 flex flex-col px-8 py-2'>
      <h1 className='mb-10 text-center text-3xl'>Top user</h1>

      <Table cols='grid-cols-[4rem_1fr_6rem]' rows='auto-rows-min'>
        <Table.Header>
          <div className='' />
          <div className=''>Nama</div>
          <div className=''>Skor</div>
        </Table.Header>

        <Table.Body>
          {leaderboard.map((item, i) => (
            <LeaderboardItem
              leaderboard={item}
              place={i + 1}
              key={item.user.id}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default Leaderboard
