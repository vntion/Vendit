import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboard } from '../../slices/leaderboardSlice'
import { resetLoading } from '../../slices/loadingBarSlice'
import { fetchGetThreads, getThreadByCategory } from '../../slices/threadSlice'
import { fetchGetAllUsers } from '../../slices/userSlice'
import AddThreadButton from '../../ui/AddThreadButton'
import ThreadsItem from './ThreadsItem'

function Threads () {
  const dispatch = useDispatch()
  const { error: errorThread } = useSelector((state) => state.thread)
  const { users, error: errorUser } = useSelector((state) => state.user)
  const threads = useSelector(getThreadByCategory)

  useEffect(() => {
    dispatch(fetchGetThreads()).finally(() => {
      dispatch(resetLoading())
    })
    dispatch(fetchGetAllUsers())
    dispatch(fetchLeaderboard()).finally(() => {
      dispatch(resetLoading())
    })
  }, [dispatch])

  return (
    <div className='space-y-6 px-8 py-2' data-testid='threads-component'>
      {errorThread || errorUser
        ? (
          <p className='text-center text-red-500'>{errorThread || errorUser}</p>
          )
        : (
          <>
            <AddThreadButton />

            {threads.map((thread) => (
              <ThreadsItem
                thread={thread}
                owner={users.filter((user) => user.id === thread.ownerId)[0]}
                key={thread.id}
              />
            ))}
          </>
          )}
    </div>
  )
}

export default Threads
