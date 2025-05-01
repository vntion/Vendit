import { useNavigate } from 'react-router'

function NotFound () {
  const navigate = useNavigate()

  return (
    <div className='row-span-full flex flex-col items-center justify-center'>
      <h1 className='-mt-10 text-[10rem]'>404</h1>
      <p className='-mt-12 mb-10 font-bold'>Anda tersesat kocak</p>
      <button
        onClick={() => navigate('/home', { replace: true })}
        className='rounded-md bg-purple-600 px-4 py-2 hover:cursor-pointer hover:bg-purple-800'
      >
        Kembali ke home
      </button>
    </div>
  )
}

export default NotFound
