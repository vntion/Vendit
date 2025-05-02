import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { describe, expect, it, vi } from 'vitest'
import authReducer, { setIsAuthorized } from '../../src/slices/authSlice'
import userReducer, { logout } from '../../src/slices/userSlice'
import store from '../../src/store'
import LogoutButton from '../../src/ui/LogoutButton'

import { deleteSession } from '../../src/utils/session'

/**
 * Skenario testing
 *
 * - LogoutButton Component
 * - should render the button and logout logo
 * - should logout and return home when logout button is clicked
 */
const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

vi.mock('../../src/utils/session')

describe('LogoutButton Component', () => {
  it('should render the button, logout text, and logout logo', () => {
    // arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LogoutButton />
        </BrowserRouter>
      </Provider>
    )
    const logoutButton = screen.getByRole('button', { name: 'Logout' })
    const logoutIcon = screen.getByTestId('logout-icon')

    // assert
    expect(logoutButton).toBeInTheDocument()
    expect(logoutIcon).toBeInTheDocument()
  })

  it('should logout and return home when logout button is clicked', async () => {
    // arrange
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LogoutButton />
        </BrowserRouter>
      </Provider>
    )
    const initialStateAuth = {
      isAuthorized: true
    }
    const initialStateUser = {
      users: [],
      loggedUser: {
        id: 'user123',
        name: 'testuser',
        email: 'test@gmail.com',
        avatar: 'https://generated-image-url.jpg'
      },
      status: 'idle',
      error: ''
    }
    const authAction = setIsAuthorized(false)
    const userAction = logout()
    const logoutButton = screen.getByRole('button')

    // action
    await userEvent.click(logoutButton)
    const nextStateAuth = authReducer(initialStateAuth, authAction)
    const nextStateUser = userReducer(initialStateUser, userAction)

    // assert
    expect(nextStateAuth.isAuthorized).toBe(false)
    expect(nextStateUser.loggedUser).toBe(null)
    expect(deleteSession).toHaveBeenCalled()
    await waitFor(() => expect(mockNavigate).toBeCalledWith('/home'))

    vi.resetAllMocks()
  })
})
