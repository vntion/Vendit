import { render, screen } from '@testing-library/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import AppLayout from '../../src/ui/AppLayout'
import Home from '../../src/ui/Home'
import { Provider } from 'react-redux'
import store from '../../src/store'

/**
 * Skenario testing
 *
 * - AppLayout Component
 * - should render the main, Header, Spacing,SideNav, Footer,and Outlet component
 */

describe('AppLayout Component', () => {
  it('should render the main, Header, Spacing,SideNav, Footer,and Outlet component', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<AppLayout />}>
              <Route index element={<Navigate to='home' />} />
              <Route path='home' element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    )

    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(screen.getByTestId('spacing-container')).toBeInTheDocument()
    expect(screen.getByTestId('sidenav')).toBeInTheDocument()
    expect(screen.getByRole('main')).toContainHTML('<div')
  })
})
