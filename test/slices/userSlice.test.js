import userReducer, { logout } from '../../src/slices/userSlice'
import { describe, expect, it } from 'vitest'

/**
 * skenario tes userReducer
 *
 * - fungsi userReducer
 * - should return the initial state when given by unknown action
 * - should return the loggedUser to null when given by logout action
 */

describe('userReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = {
      users: [],
      loggedUser: null,
      status: 'idle',
      error: ''
    }
    const unknownAction = { type: 'UNKNOWN_ACTION' }

    const nextState = userReducer(initialState, unknownAction)

    expect(nextState).toEqual(initialState)
  })

  it('should return the loggedUser to null when given by logout action', () => {
    const initialState = {
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
    const action = logout()

    const nextState = userReducer(initialState, action)
    expect(nextState.loggedUser).toBe(null)
  })
})
