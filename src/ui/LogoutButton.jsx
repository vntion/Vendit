import { AiOutlineLogout } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { setIsAuthorized } from '../slices/authSlice'
import { logout } from '../slices/userSlice'
import { deleteSession } from '../utils/session'
import { useNavigate } from 'react-router'

function LogoutButton () {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(logout())
    dispatch(setIsAuthorized(false))
    deleteSession()
    navigate('/home')
  }

  return (
    <button
      onClick={handleClick}
      className='flex w-full items-center justify-start gap-1 rounded-md px-1 py-3 text-2xl hover:cursor-pointer'
    >
      <AiOutlineLogout data-testid='logout-icon' />
      <span className='text-base'>Logout</span>
    </button>
  )
}

export default LogoutButton
