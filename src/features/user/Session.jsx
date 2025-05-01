import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSession } from '../../slices/userSlice'

function Session ({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSession())
  }, [dispatch])

  return children
}

export default Session
