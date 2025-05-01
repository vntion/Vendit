import AppLayout from './ui/AppLayout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Home from './ui/Home'
import Leaderboard from './features/leaderboard/Leaderboard'
import NotFound from './ui/NotFound'
import Login from './features/user/Login'
import Register from './features/user/Register'
import ThreadDetail from './features/threads/ThreadDetail'
import Session from './features/user/Session'
import Loading from './features/loading bar/LoadingBar'

function App () {
  return (
    <Session>
      <Loading />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Navigate to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='threads/:id' element={<ThreadDetail />} />
            <Route path='leaderboard' element={<Leaderboard />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Session>
  )
}

export default App
