import { useSelector } from 'react-redux'

function Username () {
  const { loggedUser } = useSelector((state) => state.user)

  if (!loggedUser) return null

  return (
    <div
      className='mb-3 flex items-center gap-2'
      data-testid='username-component'
    >
      <img
        src={loggedUser.avatar}
        alt={loggedUser.name}
        className='size-8 rounded-full'
      />

      <span>{loggedUser.name}</span>
    </div>
  )
}

export default Username
