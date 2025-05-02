import { describe, expect, it } from 'vitest'
import loadingBarReducer, {
  loadingComplete,
  resetLoading,
  startLoading
} from '../../src/slices/loadingBarSlice'

/**
 * skenario tes loadingBarReducer
 *
 * - fungsi loadingBarReducers
 * - should return the initial state when given by unknown action
 * - should return the status equal loading when given by startLoading action
 * - should return the status equal complete when given by loadingComplete action
 * - should return the status equal idle when given by resetLoading action
 */
describe('loadingBarReducer', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = {
      status: 'idle'
    }
    const unknownAction = { type: 'UNKNOWN_ACTION' }

    const nextState = loadingBarReducer(initialState, unknownAction)
    expect(nextState).toEqual(initialState)
  })

  it('should return the status equal loading when given by startLoading action', () => {
    const initialState = {
      status: 'idle'
    }
    const action = startLoading()

    const nextState = loadingBarReducer(initialState, action)

    expect(nextState.status).toBe('loading')
  })

  it('should return the status equal complete when given by loadingComplete action', () => {
    const initialState = {
      status: 'idle'
    }
    const action = loadingComplete()

    const nextState = loadingBarReducer(initialState, action)

    expect(nextState.status).toBe('complete')
  })

  it('should return the status equal idle when given by resetLoading action', () => {
    const initialState = {
      status: 'idle'
    }
    const action = resetLoading()

    const nextState = loadingBarReducer(initialState, action)

    expect(nextState.status).toBe('idle')
  })
})
