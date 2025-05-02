import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Logo from '../../src/ui/Logo'

/**
 * Skenario testing
 *
 * - Logo Component
 * - should render Logo correctly
 */

describe('Logo Component', () => {
  it('should render Logo correctly', () => {
    render(<Logo />)
    const logoElement = screen.getByText('Vendit')

    expect(logoElement).toBeInTheDocument()
    expect(logoElement.className).toContain('text-4xl')
  })
})
