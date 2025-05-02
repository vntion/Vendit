import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router'
import { fetchLogin, setError } from '../../slices/userSlice'
import Spinner from '../../ui/Spinner'

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const { status, error } = useSelector((state) => state.user)
  const { isAuthorized } = useSelector((state) => state.auth)

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(fetchLogin({ email, password }))
  }

  useEffect(() => {
    return () => dispatch(setError(''))
  }, [dispatch])

  if (isAuthorized) {
    return <Navigate to='/home' replace />
  }

  return (
    <div className='px-8 py-2'>
      <h1 className='mb-5 text-3xl font-bold'>Login</h1>

      <form
        onSubmit={handleSubmit}
        className='grid auto-rows-auto grid-cols-1 gap-3 rounded-md border border-purple-600 px-5 py-2 [&_input]:-mt-2 [&_input]:rounded-xs [&_input]:bg-gray-300 [&_input]:px-2 [&_input]:py-2 [&_input]:text-black [&_input]:outline-none'
      >
        {error && (
          <p className='text-center text-red-500' data-testid='errorMsg'>
            {error}
          </p>
        )}
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          minLength='6'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type='submit'
          disabled={status === 'loading'}
          className='mt-10 rounded-xs bg-purple-600 py-1.5 text-lg hover:cursor-pointer hover:bg-purple-800 disabled:cursor-default disabled:bg-purple-800'
        >
          {status === 'loading' ? <Spinner size='mini' /> : 'Login'}
        </button>

        <p className='text-center text-xs'>
          Belum punya akun?
          <Link
            className='text-blue-600 underline hover:text-blue-500'
            to='/register'
          >
            Daftar disini
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login
